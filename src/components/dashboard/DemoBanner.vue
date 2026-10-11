<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
    router.push('/login')
}
</script>

<template>
    <aside class="demo-banner" role="status">
        <span>You're viewing demo data</span>
        <button type="button" @click="goToLogin">Sign in</button>
    </aside>
</template>

<style scoped>
.demo-banner {
    position: sticky;
    top: 0;
    z-index: 901;
    min-height: 3.25rem;
    padding: .25rem var(--page-gutter);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .75rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-2);
    font-size: var(--fs-sm);
}

.demo-banner button {
    min-height: 44px;
    padding: .4rem .9rem;
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--color-accent);
    color: var(--color-accent-contrast);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
}

.demo-banner button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}
</style>
