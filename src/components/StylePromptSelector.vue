<template>
    <div class="bg-white border-4 border-black border-t-0 rounded-b-lg p-4 shadow-lg h-full flex flex-col">
        <!-- Tabs for selection modes -->
        <div class="flex mb-4 bg-gray-100 rounded-lg p-1 border-2 border-black">
            <button
                @click="activeTab = 'style'"
                :class="[
                    'flex-1 py-2 px-3 rounded-md font-bold transition-all flex items-center justify-center gap-2',
                    activeTab === 'style' ? 'bg-yellow-300 text-black' : 'text-gray-600 hover:text-black'
                ]"
            >
                🎨 Preset styles
            </button>
            <button
                @click="activeTab = 'custom'"
                :class="[
                    'flex-1 py-2 px-3 rounded-md font-bold transition-all flex items-center justify-center gap-2',
                    activeTab === 'custom' ? 'bg-yellow-300 text-black' : 'text-gray-600 hover:text-black'
                ]"
            >
                ✏️ Custom prompt
            </button>
        </div>

        <!-- Preset style selection -->
        <div v-if="activeTab === 'style'" class="space-y-2 flex-1 overflow-y-auto">
            <div
                v-for="template in templates"
                :key="template.id"
                @click="selectStyle(template.id)"
                :class="[
                    'p-4 rounded-lg border-2 border-black cursor-pointer transition-all',
                    selectedStyle === template.id ? 'bg-yellow-300 border-orange-500' : 'bg-yellow-50 hover:bg-yellow-100'
                ]"
            >
                <div class="flex items-start gap-3">
                    <!-- Thumbnail -->
                    <img v-if="template.image" :src="template.image" :alt="template.title" class="w-20 h-20 rounded border-2 border-black object-cover flex-shrink-0" />

                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                        <div class="text-base font-bold mb-1">{{ template.title }}</div>
                        <p class="text-sm text-gray-600 mb-2">{{ template.description }}</p>

                        <!-- Expandable prompt preview -->
                        <details class="group">
                            <summary class="cursor-pointer text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                                <span>View full prompt</span>
                                <svg class="w-3 h-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div class="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-700 border">
                                {{ template.prompt }}
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>

        <!-- Custom prompt -->
        <div v-else class="space-y-4 flex-1 flex flex-col">
            <div class="mb-4">
                <p class="font-bold mb-2 flex items-center gap-2">🍌 Describe your creative idea:</p>
            </div>

            <textarea
                :value="customPrompt"
                @input="updateCustomPrompt(($event.target as HTMLTextAreaElement).value)"
                placeholder="For example: transform the image into a surreal style with floating bananas and vibrant colors..."
                class="w-full px-4 py-3 border-2 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent flex-1 min-h-[200px]"
            />

            <p class="text-sm text-gray-600 font-medium flex items-center gap-1">💡 The more specific the description, the better the results!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { StyleTemplate } from '../types'

const props = defineProps<{
    selectedStyle: string
    customPrompt: string
    templates: StyleTemplate[]
}>()

const emit = defineEmits<{
    'update:selectedStyle': [value: string]
    'update:customPrompt': [value: string]
}>()

const activeTab = ref<'style' | 'custom'>('style')

// Watch selection state and switch tabs automatically
watch(
    () => props.selectedStyle,
    newValue => {
        if (newValue && activeTab.value !== 'style') {
            activeTab.value = 'style'
        }
    }
)

watch(
    () => props.customPrompt,
    newValue => {
        if (newValue && activeTab.value !== 'custom') {
            activeTab.value = 'custom'
        }
    }
)

const selectStyle = (styleId: string) => {
    // Clear the custom prompt when a style is chosen
    emit('update:customPrompt', '')
    emit('update:selectedStyle', props.selectedStyle === styleId ? '' : styleId)
}

const updateCustomPrompt = (value: string) => {
    // Clear the style selection when the custom prompt is entered
    if (value) {
        emit('update:selectedStyle', '')
    }
    emit('update:customPrompt', value)
}
</script>
