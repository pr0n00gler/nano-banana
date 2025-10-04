<template>
    <div class="bg-white border-4 border-black border-t-0 rounded-b-lg p-4 shadow-lg min-h-[400px] flex flex-col">
        <div class="flex-1 bg-gray-50 border-2 border-black rounded-lg p-6 flex items-center justify-center">
            <!-- Loading State -->
            <div v-if="loading" class="text-center">
                <div class="w-12 h-12 border-4 border-yellow-300 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                <p class="font-bold text-base flex items-center justify-center gap-2">🍌 Creating magic...</p>
                <p class="text-gray-600">Please hold on a moment</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center">
                <div class="text-red-500 text-6xl mb-4">🍌💥</div>
                <p class="text-red-600 font-bold text-base mb-2">Oops! Something went wrong</p>
                <p class="text-gray-600 text-sm">{{ error }}</p>
            </div>

            <!-- Result Image -->
            <div v-else-if="result" class="w-full h-full flex items-center justify-center">
                <img :src="result" alt="Generated artwork" class="max-w-full max-h-[600px] rounded-lg border-2 border-black shadow-lg object-contain" />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center">
                <div class="w-12 h-12 border-4 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span class="text-2xl">🍌</span>
                </div>
                <h3 class="font-bold text-base mb-2 flex items-center justify-center gap-2">🍌 Waiting for the magic to start...</h3>
                <p class="text-gray-600">Upload images and choose a style to begin</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    result: string | null
    loading: boolean
    error: string | null
}>()
</script>
