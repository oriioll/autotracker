<script setup lang="ts">
const emit = defineEmits(['handleGoogleLogin'])
const props = defineProps<{ loginLoading: boolean }>()
</script>

<template>
    <button v-if="!props.loginLoading" @click="emit('handleGoogleLogin')" class="google-login-btn" type="button"
        :disabled="props.loginLoading">
        <svg class="google-login-btn__icon" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4" />
            <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853" />
            <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05" />
            <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335" />
        </svg>
        <span>Continue with Google</span>
    </button>
    <button v-else class="google-login-btn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
            viewBox="0 0 24 24">
            <g fill="none" stroke="var(--color-accent)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="18" d="M12 3c4.97 0 9 4.03 9 9">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="18;0" />
                    <animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="rotate"
                        values="0 12 12;360 12 12" />
                </path>
                <path stroke-dasharray="60"
                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                    opacity=".3">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="1s" values="60;0" />
                </path>
            </g>
        </svg></button>
</template>
<style scoped>
.google-login-btn {
    width: min(25rem, 100%);
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-3);
    padding: 0 var(--sp-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: var(--fs-sm);
    font-weight: 600;
    letter-spacing: var(--ls-normal);
    cursor: pointer;
    transition:
        background-color 0.18s ease,
        border-color 0.18s ease,
        box-shadow 0.18s ease,
        transform 0.18s ease;
}

.google-login-btn__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

.google-login-btn:hover {
    background: var(--color-bg);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
}

.google-login-btn:active {
    transform: translateY(1px);
}

.google-login-btn:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

.google-login-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>