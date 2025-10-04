<template>
    <div class="bg-white border-4 border-black rounded-lg p-3 shadow-lg">
        <div class="mb-2">
            <h3 class="font-bold text-gray-800 flex items-center gap-2 mb-2">
                🔑 API key settings
                <span v-if="modelValue" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Saved</span>
            </h3>
            <p class="text-sm text-gray-600">An OpenRouter API key is required to generate images</p>
        </div>

        <div class="space-y-2">
            <div class="flex gap-2">
                <input
                    type="password"
                    :value="modelValue"
                    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                    placeholder="Enter your OpenRouter API key..."
                    class="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <button
                    v-if="modelValue"
                    @click="clearApiKey"
                    class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    title="Clear the cached API key"
                >
                    🗑️
                </button>
            </div>

            <div class="flex items-center justify-between">
                <p class="text-xs text-gray-500">
                    Get your API key from <a href="https://openrouter.ai/" target="_blank" class="text-orange-500 hover:underline font-medium">OpenRouter.ai</a>
                </p>
                <p v-if="modelValue" class="text-xs text-green-600 flex items-center gap-1">💾 Automatically saved locally</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LocalStorage } from '../utils/storage'

defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const clearApiKey = () => {
    LocalStorage.clearApiKey()
    emit('update:modelValue', '')
}
</script>
