<template>
    <div class="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-200 text-gray-900 relative overflow-hidden">
        <!-- Banana decoration elements -->
        <div class="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🍌</div>
        <div class="absolute top-32 right-20 text-4xl opacity-30 animate-pulse">🍌</div>
        <div class="absolute bottom-20 left-32 text-5xl opacity-25 animate-bounce delay-1000">🍌</div>
        <div class="absolute bottom-40 right-10 text-3xl opacity-20 animate-pulse delay-500">🍌</div>

        <div class="container mx-auto px-3 py-4 relative z-10">
            <!-- Header -->
            <div class="relative mb-6">
                <div class="bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg p-6 border-4 border-black shadow-lg">
                    <div class="text-center">
                        <h1 class="text-4xl font-black text-white mb-1 flex items-center justify-center gap-2">
                            🍌 Nano<br />
                            <span class="text-yellow-100 text-5xl">Banana</span>
                        </h1>
                        <p class="text-white text-base font-medium">Upload your images and I'll create art!</p>
                    </div>
                </div>
            </div>

            <!-- API settings -->
            <div class="mb-6">
                <div class="flex justify-center">
                    <button
                        @click="showApiSettings = !showApiSettings"
                        :class="[
                            'px-6 py-3 rounded-lg border-4 border-black font-bold text-sm transition-all flex items-center gap-2 shadow-lg',
                            apiKey ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-red-400 text-white hover:bg-red-500 animate-pulse'
                        ]"
                    >
                        <span>🔑</span>
                        <span v-if="!apiKey">API key required</span>
                        <span v-else>API key configured</span>
                        <svg :class="['w-4 h-4 transition-transform', showApiSettings ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                <!-- API settings accordion -->
                <div v-if="showApiSettings" class="mt-4 max-w-2xl mx-auto">
                    <ApiKeyInput v-model="apiKey" />
                </div>
            </div>

            <!-- Main content: two-column layout -->
            <div class="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:items-stretch min-h-[400px]">
                <!-- Left column: image upload -->
                <div class="flex flex-col h-full">
                    <div class="bg-pink-400 text-white font-bold px-4 py-2 rounded-t-lg border-4 border-black border-b-0 flex items-center gap-2">🍌 1. Upload images</div>
                    <div class="flex-1">
                        <ImageUpload v-model="selectedImages" />
                    </div>
                </div>

                <!-- Right column: select style or custom prompt -->
                <div class="flex flex-col h-full">
                    <div class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-4 py-2 rounded-t-lg border-4 border-black border-b-0 flex items-center gap-2">
                        🎨 2. Choose a style or write your own prompt
                    </div>
                    <div class="flex-1">
                        <StylePromptSelector v-model:selectedStyle="selectedStyle" v-model:customPrompt="customPrompt" :templates="styleTemplates" />
                    </div>
                </div>
            </div>

            <!-- Generate button -->
            <div class="mb-6">
                <GenerateButton :loading="isLoading" :disabled="!canGenerate" @click="handleGenerate" />
            </div>

            <!-- Generation results: full width -->
            <div class="w-full">
                <div class="bg-black text-white font-bold px-4 py-2 rounded-t-lg border-4 border-black border-b-0 flex items-center gap-2">✨ 3. Results</div>
                <ResultDisplay :result="result" :loading="isLoading" :error="error" />
            </div>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ApiKeyInput from './components/ApiKeyInput.vue'
import ImageUpload from './components/ImageUpload.vue'
import StylePromptSelector from './components/StylePromptSelector.vue'
import GenerateButton from './components/GenerateButton.vue'
import ResultDisplay from './components/ResultDisplay.vue'
import Footer from './components/Footer.vue'
import { generateImage } from './services/api'
import { styleTemplates } from './data/templates'
import { LocalStorage } from './utils/storage'
import type { GenerateRequest } from './types'

const apiKey = ref('')
const selectedImages = ref<string[]>([])
const selectedStyle = ref('')
const customPrompt = ref('')
const isLoading = ref(false)
const result = ref<string | null>(null)
const error = ref<string | null>(null)
const showApiSettings = ref(false)

// Read the API key from local storage when the component mounts
onMounted(() => {
    const savedApiKey = LocalStorage.getApiKey()
    if (savedApiKey) {
        apiKey.value = savedApiKey
        showApiSettings.value = false
    } else {
        // If there's no API key, open the settings panel automatically
        showApiSettings.value = true
    }
})

// Persist API key changes to local storage
watch(
    apiKey,
    (newApiKey: string) => {
        if (newApiKey.trim()) {
            LocalStorage.saveApiKey(newApiKey)
            // After the API key is saved, close the settings panel after a short delay
            setTimeout(() => {
                showApiSettings.value = false
            }, 1500)
        }
    },
    { immediate: false }
)

// Reset previous generation results when the style or prompt changes
watch([selectedStyle, customPrompt], () => {
    // Clear prior results and errors whenever the user changes the style or prompt
    if (result.value || error.value) {
        result.value = null
        error.value = null
    }
})

const canGenerate = computed(() => apiKey.value.trim() && selectedImages.value.length > 0 && (selectedStyle.value || customPrompt.value.trim()) && !isLoading.value)

const handleGenerate = async () => {
    if (!canGenerate.value) return

    isLoading.value = true
    error.value = null
    // Clear the previous result immediately so the user sees the new generation process
    result.value = null

    try {
        // Use the selected style template or the custom prompt
        const prompt = selectedStyle.value ? styleTemplates.find(t => t.id === selectedStyle.value)?.prompt || customPrompt.value : customPrompt.value

        const request: GenerateRequest = {
            prompt,
            images: selectedImages.value,
            apikey: apiKey.value
        }

        const response = await generateImage(request)
        result.value = response.imageUrl
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Generation failed'
        // Also clear the result when generation fails
        result.value = null
    } finally {
        isLoading.value = false
    }
}

const handleReset = () => {
    selectedImages.value = []
    selectedStyle.value = ''
    customPrompt.value = ''
    result.value = null
    error.value = null
}
</script>
