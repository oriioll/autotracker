<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const messages = [
    'Connecting to Gmail',
    'Scanning your inbox',
    'Finding order emails',
    'Extracting order details',
]

const currentMessage = ref(messages[0])

let interval: ReturnType<typeof setInterval>

onMounted(() => {
    let index = 0

    interval = setInterval(() => {
        index = (index + 1) % messages.length
        currentMessage.value = messages[index]
    }, 2500)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<template>
    <div class="loading-screen">
        <div class="loading-content">

            <div class="brand">
                <img src="/logo-autotracker.webp" alt="AutoTracker logo">
                <h3 class="brand-name">Auto<span class="accent">Tracker</span></h3>
            </div>

            <div class="loading-main">
                <div class="loading-indicator">
                    <span></span>
                </div>

                <h1>Getting your orders</h1>

                <p class="loading-message">
                    {{ currentMessage }}
                </p>

                <p class="loading-hint">
                    First sync can take a little longer while we find your orders.
                </p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.loading-screen {
    position: fixed;
    inset: 0;
    min-height: 100dvh;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    color: var(--color-text);
    overflow-y: auto;
    padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
}

.loading-content {
    width: min(26.25rem, 100%);
    text-align: center;
}

.brand {
    position: absolute;
    top: max(1rem, env(safe-area-inset-top));
    left: max(1rem, env(safe-area-inset-left));
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    letter-spacing: -0.02em;
}

.brand-mark {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: var(--fs-xs);
    font-weight: 700;
    background: var(--color-surface);
}



.accent {
    color: var(--color-accent);
}

.loading-main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading-indicator {
    width: 180px;
    height: 2px;
    margin-bottom: 32px;
    overflow: hidden;
    border-radius: 999px;
    background: var(--color-border);
}

.loading-indicator span {
    display: block;
    width: 45%;
    height: 100%;
    border-radius: inherit;
    background: var(--color-accent);
    animation: loading 1.4s ease-in-out infinite;
}

h1 {
    margin: 0;
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 600;
    letter-spacing: -0.04em;
}

.loading-message {
    min-height: 24px;
    margin: .75rem 0 0;
    color: var(--color-text-2);
    font-size: var(--fs-sm);
}

.loading-hint {
    max-width: 22.5rem;
    margin: 1.75rem auto 0;
    color: var(--color-text-2);
    font-size: var(--fs-xs);
    line-height: 1.6;
}

img {
    height: 3.125rem;
    width: 3.125rem;
    max-width: 100%;
    object-fit: contain;
}

@keyframes loading {
    0% {
        transform: translateX(-120%);
    }

    50% {
        transform: translateX(110%);
    }

    100% {
        transform: translateX(300%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .loading-indicator span {
        animation: none;
        transform: translateX(60%);
    }
}

@media (max-width: 600px) {
    .brand {
        top: max(1rem, env(safe-area-inset-top));
        left: max(1rem, env(safe-area-inset-left));
    }

    .loading-content {
        width: min(22.5rem, 100%);
    }

    h1 {
        font-size: clamp(1.75rem, 8vw, 2.375rem);
    }
}
</style>