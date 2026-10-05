<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getRememberedTheme, rememberTheme } from '@/services/storagePreferences'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

const isDark = computed(() => theme.value === 'dark')

const applyTheme = (newTheme: Theme) => {
    theme.value = newTheme
    document.documentElement.dataset.theme = newTheme
}

const getDefaultTheme = (): Theme => {
    const savedTheme = getRememberedTheme()

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
}

const toggleTheme = () => {
    const newTheme: Theme = isDark.value ? 'light' : 'dark'

    applyTheme(newTheme)
    rememberTheme(newTheme)
}

onMounted(() => {
    applyTheme(getDefaultTheme())
})
</script>

<template>
    <button class="theme-toggle" type="button" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="isDark ? 'Light mode' : 'Dark mode'" @click="toggleTheme">
        <Transition name="theme-icon" mode="out-in">
            <!-- Moon - go dark mode -->
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M12 1.992a10 10 0 1 0 9.236 13.838c.341-.82-.476-1.644-1.298-1.31a6.5 6.5 0 0 1-6.864-10.787l.077-.08c.551-.63.113-1.653-.758-1.653h-.266l-.068-.006l-.06-.002z" />
            </svg>
            <!-- Sun - go light mode -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 19a1 1 0 0 1 .993.883l.007.117v1a1 1 0 0 1-1.993.117l-.007-.117v-1a1 1 0 0 1 1-1z" />
                <path
                    d="M18.313 16.91l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 1.218-1.567l.102.07z" />
                <path
                    d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0z" />
                <path d="M4 11a1 1 0 0 1 .117 1.993l-.117.007h-1a1 1 0 0 1-.117-1.993l.117-.007h1z" />
                <path d="M21 11a1 1 0 0 1 .117 1.993l-.117.007h-1a1 1 0 0 1-.117-1.993l.117-.007h1z" />
                <path
                    d="M6.213 4.81l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 1.217-1.567l.102.07z" />
                <path
                    d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0z" />
                <path d="M12 2a1 1 0 0 1 .993.883l.007.117v1a1 1 0 0 1-1.993.117l-.007-.117v-1a1 1 0 0 1 1-1z" />
                <path d="M12 7a5 5 0 1 1-4.995 5.217l-.005-.217l.005-.217a5 5 0 0 1 4.995-4.783z" />
            </svg>
        </Transition>
    </button>
</template>

<style scoped>
.theme-toggle {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    transition: transform 0.15s ease;
}

.theme-toggle svg {
    width: 30px;
    height: 30px;
    display: block;
}

.theme-toggle:hover {
    background: transparent;
}

.theme-toggle:active {
    transform: scale(.97);
}

.theme-toggle:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
}

.theme-icon-enter-active,
.theme-icon-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.25s ease;
}

.theme-icon-enter-from {
    opacity: 0;
    transform: rotate(-45deg) scale(0.8);
}

.theme-icon-leave-to {
    opacity: 0;
    transform: rotate(45deg) scale(0.8);
}
</style>