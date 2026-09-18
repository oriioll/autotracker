<script setup lang="ts">
import { computed } from 'vue'
import RecentOrderCard from './RecentOrderCard.vue';
import type { AppOrder } from '@/types/AppOrder.ts'

const props = defineProps<{
    orders: AppOrder[]
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
            <h2>Upcoming deliveries</h2>
            <span>Next 7 days</span>
        </article>
        <section class="table" v-if="recentOrders.length > 0">
            <RecentOrderCard v-for="order in recentOrders" :key="order.id" :order="order" />
        </section>
        <section v-else>
            <p>You don't have any orders expected in the next 7 days.</p>
        </section>
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
    padding: 1rem 0;
    overflow-x: auto;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
}
</style>