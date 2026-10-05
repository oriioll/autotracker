<script setup lang="ts">
import type { AppOrder } from '@/types/AppOrder.ts';
import DashboardOrderRow from './DashboardOrderRow.vue';
import { computed, ref, type Ref, watch } from 'vue';
const props = defineProps<{
    orders: AppOrder[],
    lastSync: string,
    syncError: boolean
}>()
type SortKey = 'company' | 'merchant' | 'trackingNumber' | 'carrier' | 'status' | 'estimatedDelivery' | 'total'
const sortKey: Ref<SortKey | null> = ref(null)
const sortDirection: Ref<'asc' | 'desc'> = ref('desc')
const currentPage: Ref<number> = ref(1)
const PAGE_SIZE = 10

const sortedOrders = computed(() => {
    if (!sortKey.value) return props.orders
    const activeSortKey = sortKey.value
    return [...props.orders].sort((firstOrder, secondOrder) => {
        let comparison = 0
        if (activeSortKey === 'estimatedDelivery') {
            comparison = (firstOrder.estimatedDelivery?.getTime() || 0) - (secondOrder.estimatedDelivery?.getTime() || 0)
        } else if (activeSortKey === 'total') {
            comparison = (firstOrder.total || 0) - (secondOrder.total || 0)
        } else {
            const firstValue = firstOrder[activeSortKey]
            const secondValue = secondOrder[activeSortKey]
            comparison = String(firstValue || '').localeCompare(String(secondValue || ''), 'en', {
                sensitivity: 'base',
            })
        }
        return sortDirection.value === 'asc' ? comparison : -comparison
    })
})

const pageCount = computed(() => Math.ceil(sortedOrders.value.length / PAGE_SIZE))
const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return sortedOrders.value.slice(start, start + PAGE_SIZE)
})

watch(pageCount, (totalPages) => {
    currentPage.value = Math.min(currentPage.value, Math.max(totalPages, 1))
})

const sortOrders = (key: SortKey) => {
    if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
        return
    }
    sortKey.value = key
    sortDirection.value = 'asc'
}

const isSortedBy = (key: SortKey) => sortKey.value === key



</script>
<template>
    <main>
        <article class="text">
            <h2>Orders</h2>
            <p v-if="!syncError">Last Synced: <span class="accent">{{ lastSync }}</span></p>
        </article>

        <section v-if="sortedOrders.length > 0" class="table">
            <article class="table__header">
                <button class="column--company" type="button" @click="sortOrders('company')"
                    :aria-label="'Sort by company'">
                    Company
                    <svg v-if="isSortedBy('company')" :class="{ 'sort-icon--descending': sortDirection === 'desc' }"
                        viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </button>
                <button class="column--merchant" type="button" @click="sortOrders('merchant')"
                    :aria-label="'Sort by merchant'">
                    Merchant
                    <svg v-if="isSortedBy('merchant')" :class="{ 'sort-icon--descending': sortDirection === 'desc' }"
                        viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </button>
                <button class="column--tracking" type="button" @click="sortOrders('trackingNumber')"
                    :aria-label="'Sort by tracking number'">
                    Tracking number
                    <svg v-if="isSortedBy('trackingNumber')"
                        :class="{ 'sort-icon--descending': sortDirection === 'desc' }" viewBox="0 0 16 16"
                        aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </button>
                <button class="column--carrier" type="button" @click="sortOrders('carrier')"
                    :aria-label="'Sort by carrier'">
                    Carrier
                    <svg v-if="isSortedBy('carrier')" :class="{ 'sort-icon--descending': sortDirection === 'desc' }"
                        viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </button>
                <button class="column--status" type="button" @click="sortOrders('status')"
                    :aria-label="'Sort by status'">
                    Status
                    <svg v-if="isSortedBy('status')" :class="{ 'sort-icon--descending': sortDirection === 'desc' }"
                        viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </button>
                <button class="column--delivery" type="button" @click="sortOrders('estimatedDelivery')"
                    :aria-label="'Sort by estimated delivery'">
                    Estimated delivery
                    <svg v-if="isSortedBy('estimatedDelivery')"
                        :class="{ 'sort-icon--descending': sortDirection === 'desc' }" viewBox="0 0 16 16"
                        aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </button>
                <button class="table__header--total column--total" type="button" @click="sortOrders('total')"
                    :aria-label="'Sort by total'">
                    Total
                    <svg v-if="isSortedBy('total')" :class="{ 'sort-icon--descending': sortDirection === 'desc' }"
                        viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </button>
            </article>
            <DashboardOrderRow v-for="order in paginatedOrders" :key="order.id" :order="order" />
        </section>
        <section v-else class="table empty">
            <h4>No orders yet</h4>
            <p>Your tracked orders will appear here once they’re synced from Gmail.</p>
        </section>
        <nav v-if="pageCount > 1" class="pagination" aria-label="Orders pages">
            <button type="button" class="pagination__button" :disabled="currentPage === 1" @click="currentPage--">
                Previous
            </button>
            <span class="pagination__status" aria-live="polite">
                Page {{ currentPage }} of {{ pageCount }}
            </span>
            <button type="button" class="pagination__button" :disabled="currentPage === pageCount"
                @click="currentPage++">
                Next
            </button>
        </nav>
    </main>
</template>
<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2rem;
    width: 100%;
    padding: 2rem 5%;
}

.accent {
    color: var(--color-accent);
}

.text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: .5rem;
}

.table {
    width: 100%;
    overflow-x: auto;
    border-radius: 4px;
    border: solid 2px var(--color-border);
    background: var(--color-surface);
}

.empty {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    padding: 4rem;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
}

.pagination__status {
    min-width: 90px;
    color: var(--color-text-2);
    font-size: var(--fs-sm);
    text-align: center;
    font-variant-numeric: tabular-nums;
}

.pagination__button {
    min-width: 88px;
    min-height: 40px;
    padding: .5rem .75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: 600;
    cursor: pointer;
    transition: background-color .18s ease, border-color .18s ease, color .18s ease,
        transform 120ms var(--ease-out);
}

.pagination__button:active:not(:disabled) {
    transform: scale(.97);
}

.pagination__button:disabled {
    color: var(--color-text-2);
    cursor: not-allowed;
    opacity: .55;
}

.pagination__button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

@media (hover: hover) and (pointer: fine) {
    .pagination__button:hover:not(:disabled) {
        border-color: var(--color-accent);
        background: var(--color-surface-2);
    }
}

@media (prefers-reduced-motion: reduce) {
    .pagination__button {
        transition: background-color .18s ease, border-color .18s ease, color .18s ease;
    }

    .pagination__button:active:not(:disabled) {
        transform: none;
    }
}

.table__header {
    min-width: 980px;
    min-height: 42px;
    padding: .75rem 1rem;
    display: grid;
    grid-template-columns: minmax(175px, 1.4fr) minmax(160px, 1.2fr) minmax(145px, 1.15fr) minmax(145px, 1.1fr) minmax(105px, .8fr) minmax(125px, 1fr) minmax(85px, .7fr);
    align-items: center;
    gap: 1rem;
    background: var(--color-surface-2);
    color: var(--color-text-2);
    font-size: var(--fs-xs);
    font-weight: 600;
    letter-spacing: var(--ls-small);
    text-transform: uppercase;
}

.table__header button {
    min-width: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font: inherit;
    text-align: left;
    text-transform: inherit;
}

.table__header button:hover {
    color: var(--color-accent);
}

.table__header svg {
    width: 14px;
    height: 14px;
    flex: 0 0 14px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.75;
    transition: transform .2s ease;
}

.table__header .sort-icon--descending {
    transform: rotate(180deg);
}

.table__header--total {
    text-align: right;
}

.table__header button.table__header--total {
    justify-content: flex-end;
}

@media (max-width: 1100px) {
    .table__header {
        min-width: 0;
        grid-template-columns: minmax(165px, 1.5fr) minmax(150px, 1.25fr) minmax(140px, 1.1fr) minmax(100px, .8fr) minmax(85px, .7fr);
    }

    .table__header .column--delivery,
    .table__header .column--carrier {
        display: none;
    }
}

@media (max-width: 760px) {
    .table__header {
        min-height: 40px;
        padding: .65rem .75rem;
        grid-template-columns: minmax(145px, 1.5fr) minmax(125px, 1.3fr) minmax(90px, .8fr) minmax(75px, .6fr);
        gap: .75rem;
    }

    .table__header .column--tracking {
        display: none;
    }
}

@media (max-width: 480px) {
    .table__header {
        grid-template-columns: minmax(125px, 1.5fr) minmax(100px, 1.2fr) minmax(72px, .7fr);
    }

    .table__header .column--merchant {
        display: none;
    }

    .table__header button {
        font-size: var(--fs-xs);
    }

    .pagination {
        justify-content: space-between;
        gap: .5rem;
    }

    .pagination__button {
        min-width: 76px;
    }
}
</style>