<template>
    <div class="bg-white border-4 border-black border-t-0 rounded-b-lg p-6 shadow-lg">
        <div class="mb-4">
            <p class="font-bold mb-2 flex items-center gap-2">🍌 Describe your creative idea:</p>
            <div class="text-center text-2xl font-bold mb-4">or</div>
        </div>

        <textarea
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            placeholder="For example: transform the image into a surreal style with floating bananas and vibrant colors..."
            rows="4"
            class="w-full px-4 py-3 border-2 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        <p class="text-sm text-gray-600 mt-2 font-medium flex items-center gap-1">💡 The more specific the description, the better the results!</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>
