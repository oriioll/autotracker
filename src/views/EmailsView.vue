<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { AuthService } from '@/services/auth.service'
import { OrderService } from '@/services/order.service'
import type { AppOrder } from '@/types/AppOrder'

const authService = new AuthService()
const orderService = new OrderService()

const orders = ref<AppOrder[]>([])
const loading = ref(false)

const logout = async () => {
    await authService.logout()
    window.location.href = '/login'
}

const loadOrders = async () => {
    loading.value = true

    try {
        await orderService.syncGmail()
        orders.value = await orderService.loadUserOrders()
    } finally {
        loading.value = false
    }
}

onMounted(loadOrders)
</script>

<template>
    <div>
        <button @click="logout">
            Logout
        </button>

        <button @click="loadOrders" :disabled="loading">
            Sync Gmail
        </button>

        <p v-if="loading">
            Cargando...
        </p>

        <div v-else>
            <h1>Orders</h1>

            <div v-for="order in orders" :key="order.id">
                <p>{{ order.merchant }}</p>
                <p>{{ order.orderNumber }}</p>
                <p>{{ order.total }} {{ order.currency }}</p>
                <p>{{ order.status }}</p>
                <p>{{ order.trackingNumber }}</p>
            </div>
        </div>
    </div>
</template>