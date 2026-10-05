<script setup lang="ts">
import type { Company } from '@/types/Company'
import type { AppOrder } from '../../types/AppOrder'
import { formatCurrency } from '@/types/Currency'
import { formatDate } from '@/util/helper'

const props = defineProps<{
    order: AppOrder
    carrier: Company | null
    company: Company | null
}>()
const emit = defineEmits(['close'])
</script>

<template>
    <div class="dialog-backdrop" @click.self="emit('close')">
        <dialog open class="dialog" aria-labelledby="order-dialog-title">
            <button class="dialog__close" type="button" aria-label="Close order details" @click="emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
                </svg>
            </button>

            <header class="dialog__header">
                <div class="dialog__eyebrow">Order details</div>
                <h2 id="order-dialog-title">{{ props.order.merchant || 'Order' }}</h2>
                <span class="status">{{ props.order.status || 'Status unavailable' }}</span>
            </header>

            <section class="parties" aria-label="Order company and carrier">
                <a v-if="company?.website" class="party" :href="company.website" target="_blank" rel="noreferrer"
                    @click.stop>
                    <span class="party__logo">
                        <img v-if="company.svg" :src="company.svg" :alt="`${company.name} logo`">
                        <span v-else>{{ company.name[0]?.toUpperCase() || '-' }}</span>
                    </span>
                    <span>
                        <small>Company</small>
                        <strong>{{ company.name }}</strong>
                    </span>
                </a>
                <div v-else class="party">
                    <span class="party__logo">{{ props.order.company[0]?.toUpperCase() || '-' }}</span>
                    <span>
                        <small>Company</small>
                        <strong>{{ props.order.company || '-' }}</strong>
                    </span>
                </div>

                <a v-if="carrier?.website" class="party" :href="carrier.website" target="_blank" rel="noreferrer"
                    @click.stop>
                    <span class="party__logo">
                        <img v-if="carrier.svg" :src="carrier.svg" :alt="`${carrier.name} logo`">
                        <span v-else>{{ carrier.name[0]?.toUpperCase() || '-' }}</span>
                    </span>
                    <span>
                        <small>Carrier</small>
                        <strong>{{ carrier.name }}</strong>
                    </span>
                </a>
                <div v-else class="party">
                    <span class="party__logo">{{ props.order.carrier?.[0]?.toUpperCase() || '-' }}</span>
                    <span>
                        <small>Carrier</small>
                        <strong>{{ props.order.carrier || 'Not assigned' }}</strong>
                    </span>
                </div>
            </section>

            <section class="details" aria-label="Order information">
                <div class="detail">
                    <small>Tracking number</small>
                    <strong>{{ props.order.trackingNumber || 'Not available' }}</strong>
                </div>
                <div class="detail">
                    <small>Order number</small>
                    <strong>{{ props.order.orderNumber || 'Not available' }}</strong>
                </div>
                <div class="detail">
                    <small>Estimated delivery</small>
                    <strong>{{ formatDate(props.order.estimatedDelivery) }}</strong>
                </div>
                <div class="detail">
                    <small>Created</small>
                    <strong>{{ formatDate(props.order.createdAt) }}</strong>
                </div>
            </section>

            <footer class="dialog__footer">
                <span>Total</span>
                <strong>{{ props.order.total !== null && props.order.currency ? formatCurrency(props.order.total,
                    props.order.currency) : '-' }}</strong>
            </footer>
        </dialog>
    </div>
</template>

<style scoped>
.dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background: rgba(26, 23, 18, 0.932);
}

:global(.order-dialog-enter-active),
:global(.order-dialog-leave-active) {
    transition: opacity 220ms var(--ease-out);
}

:global(.order-dialog-enter-active) .dialog,
:global(.order-dialog-leave-active) .dialog {
    transition: opacity 220ms var(--ease-out), transform 220ms var(--ease-out);
}

:global(.order-dialog-enter-from),
:global(.order-dialog-leave-to) {
    opacity: 0;
}

:global(.order-dialog-enter-from) .dialog,
:global(.order-dialog-leave-to) .dialog {
    opacity: 0;
    transform: translateY(8px) scale(.97);
}

.dialog {
    position: relative;
    width: min(560px, 100%);
    max-height: min(720px, calc(100dvh - 3rem));
    overflow-y: auto;
    padding: 2rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
}

@media (prefers-reduced-motion: reduce) {
    :global(.order-dialog-enter-active),
    :global(.order-dialog-leave-active),
    :global(.order-dialog-enter-active) .dialog,
    :global(.order-dialog-leave-active) .dialog {
        transition-duration: 120ms;
    }

    :global(.order-dialog-enter-from) .dialog,
    :global(.order-dialog-leave-to) .dialog {
        transform: none;
    }
}

.dialog__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
}

.dialog__close:hover {
    border-color: var(--color-accent);
    background: var(--color-accent-soft);
}

.dialog__close svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
    transition: transform .2s ease;
}

.dialog__close:hover svg {
    transform: rotate(90deg);
}

.dialog__header {
    padding-right: 3rem;
}

.dialog__eyebrow,
small {
    color: var(--color-text-2);
    font-size: var(--fs-xs);
    letter-spacing: var(--ls-small);
    text-transform: uppercase;
}

.dialog h2 {
    margin: .35rem 0 .75rem;
    font-size: var(--fs-xl);
    line-height: var(--lh-tight);
}

.status {
    width: fit-content;
    display: inline-flex;
    padding: .3rem .65rem;
    border-radius: 999px;
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-size: var(--fs-xs);
    font-weight: 600;
}

.parties {
    margin: 2rem 0 1.5rem;
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
}

.party {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: .75rem;
    color: inherit;
    text-decoration: none;
}

a.party:hover strong {
    color: var(--color-accent);
}

.party__logo {
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-bg);
    color: var(--color-text-2);
    font-weight: 700;
}

.party__logo img {
    width: 100%;
    height: 100%;
    padding: 6px;
    object-fit: contain;
}

.party small,
.party strong {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.party strong {
    margin-top: .2rem;
    font-size: var(--fs-sm);
}

.details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.detail {
    min-width: 0;
    padding: .8rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
}

.detail small,
.detail strong {
    display: block;
}

.detail strong {
    margin-top: .3rem;
    overflow: hidden;
    font-size: var(--fs-sm);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dialog__footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-2);
}

.dialog__footer strong {
    color: var(--color-text);
    font-size: var(--fs-lg);
}

@media (max-width: 560px) {
    .dialog-backdrop {
        padding: .5rem;
    }

    .dialog {
        max-height: calc(100dvh - 1rem);
        padding: 1rem;
    }

    .parties {
        grid-template-columns: 1fr 1fr;
        gap: .5rem;
        margin: 1rem 0 .75rem;
        padding: .65rem 0;
    }

    .party {
        gap: .5rem;
    }

    .party__logo {
        width: 34px;
        height: 34px;
        flex-basis: 34px;
    }

    .details {
        gap: .5rem;
    }

    .detail {
        padding: .55rem;
    }

    .dialog__footer {
        margin-top: .85rem;
        padding-top: .65rem;
    }
}
</style>
