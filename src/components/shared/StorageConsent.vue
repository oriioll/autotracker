<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    getOptionalStorageChoice,
    setOptionalStorageChoice,
    type OptionalStorageChoice,
} from '@/services/storagePreferences'

const isOpen = ref(false)

onMounted(() => {
    isOpen.value = getOptionalStorageChoice() === null
})

const choose = (choice: OptionalStorageChoice) => {
    setOptionalStorageChoice(choice)
    isOpen.value = false
}
</script>

<template>
    <aside class="storage-consent" aria-label="Privacy settings">
        <section v-if="isOpen" class="storage-consent__card" aria-labelledby="storage-consent-title"
            aria-describedby="storage-consent-description">
            <button type="button" class="storage-consent__close" aria-label="Dismiss privacy choices"
                @click="isOpen = false">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
                </svg>
            </button>
            <h2 id="storage-consent-title">Privacy preferences</h2>
            <p id="storage-consent-description" class="storage-consent__description">
                Essential storage keeps you signed in. Allow optional storage to remember your theme on this device.
                <router-link to="/cookies">Details</router-link>
            </p>
            <div class="storage-consent__actions">
                <button type="button" class="storage-consent__button storage-consent__button--secondary"
                    @click="choose('rejected')">
                    Not now
                </button>
                <button type="button" class="storage-consent__button storage-consent__button--primary"
                    @click="choose('accepted')">
                    Remember theme
                </button>
            </div>
        </section>
        <button v-else type="button" class="storage-consent__launcher" @click="isOpen = true">
            Privacy settings
        </button>
    </aside>
</template>

<style scoped>
.storage-consent {
    position: fixed;
    right: max(12px, env(safe-area-inset-right));
    left: max(12px, env(safe-area-inset-left));
    bottom: max(12px, env(safe-area-inset-bottom));
    z-index: 1100;
    color: var(--color-text);
}

.storage-consent__card {
    position: relative;
    width: min(22.5rem, calc(100dvw - 1.5rem));
    max-height: min(300px, calc(100dvh - 24px));
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: 0 8px 28px rgb(0 0 0 / 18%);
    animation: consent-enter 200ms var(--ease-out) both;
}

.storage-consent__card h2 {
    padding-right: 2.25rem;
    font-size: var(--fs-md);
    line-height: var(--lh-heading);
}

.storage-consent__close {
    position: absolute;
    top: .65rem;
    right: .65rem;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    transition: border-color .18s ease, background-color .18s ease;
}

.storage-consent__close svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    transition: transform 180ms ease-in-out;
}

.storage-consent__description {
    margin-top: .5rem;
    color: var(--color-text-2);
    font-size: var(--fs-xs);
    line-height: 1.5;
}

.storage-consent__description a {
    margin-left: .25rem;
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.storage-consent__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
    margin-top: .85rem;
}

.storage-consent__button {
    min-width: 0;
    min-height: 44px;
    padding: .5rem .65rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: 600;
    cursor: pointer;
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease,
        background-color .18s ease, color .18s ease;
}

.storage-consent__button--secondary {
    background: var(--color-surface);
    color: var(--color-text);
}

.storage-consent__button--primary {
    border-color: var(--color-accent);
    background: var(--color-accent);
    color: var(--color-accent-contrast);
}

.storage-consent__button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgb(0 0 0 / 12%);
}

.storage-consent__button--secondary:hover {
    border-color: var(--color-accent);
    background: var(--color-surface-2);
}

.storage-consent__button--primary:hover {
    border-color: var(--color-text);
    filter: brightness(1.06);
}

.storage-consent__button:active {
    transform: scale(.97);
    box-shadow: none;
    transition: transform 120ms var(--ease-out);
}

.storage-consent__button:focus-visible,
.storage-consent__launcher:focus-visible,
.storage-consent__close:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
}

.storage-consent__launcher {
    min-height: 44px;
    padding: .45rem .7rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: 600;
    cursor: pointer;
    transition: transform .18s ease, border-color .18s ease, background-color .18s ease;
}

.storage-consent__launcher:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent);
    background: var(--color-surface-2);
}

.storage-consent__launcher:active {
    transform: scale(.97);
    transition: transform 120ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .storage-consent__close:hover {
        border-color: var(--color-accent);
        background: var(--color-accent-soft);
    }

    .storage-consent__close:hover svg {
        transform: rotate(90deg);
    }

    .storage-consent__button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgb(0 0 0 / 12%);
    }

    .storage-consent__button--secondary:hover {
        border-color: var(--color-accent);
        background: var(--color-surface-2);
    }

    .storage-consent__button--primary:hover {
        border-color: var(--color-text);
    }

    .storage-consent__launcher:hover {
        transform: translateY(-2px);
        border-color: var(--color-accent);
        background: var(--color-surface-2);
    }
}

@media (max-width: 520px) {
    .storage-consent__actions {
        gap: .4rem;
    }

    .storage-consent__button {
        padding-inline: .4rem;
        font-size: var(--fs-xs);
    }
}

@media (prefers-reduced-motion: reduce) {
    .storage-consent__card {
        animation-name: consent-fade;
        animation-duration: 120ms;
    }

    .storage-consent__button,
    .storage-consent__launcher,
    .storage-consent__close {
        transition-property: background-color, border-color, color;
        transition-duration: 120ms;
    }

    .storage-consent__button:active,
    .storage-consent__launcher:active {
        transform: none;
    }

    .storage-consent__close:hover svg {
        transform: none;
    }
}

@keyframes consent-enter {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes consent-fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>