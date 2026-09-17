<script setup lang="ts">
import { computed } from 'vue'
import type { AppOrder } from '@/types/AppOrder.ts'

const props = defineProps<{
    orders: AppOrder[]
    lastSync: string
    syncError: boolean
}>()

const recentOrders = computed(() => {
    const now = new Date()
    const nextWeek = new Date(now)
    nextWeek.setDate(now.getDate() + 7)
    return props.orders
        .filter(order => {
            if (!order.estimatedDelivery) return false
            return (
                order.estimatedDelivery >= now &&
                order.estimatedDelivery <= nextWeek
            )
        })
        .sort(
            (firstOrder, secondOrder) =>
                firstOrder.estimatedDelivery!.getTime() -
                secondOrder.estimatedDelivery!.getTime()
        )
})
</script>
<template>
    <main>
        <article class="text">
            <h1>Upcoming deliveries</h1>
        </article>
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
</style>