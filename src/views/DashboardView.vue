<script setup lang="ts">
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import DashboardOrders from '@/components/dashboard/DashboardOrders.vue'
import DashboardLoading from '@/components/dashboard/DashboardLoading.vue';
import { AuthService } from '@/services/auth.service';
import { OrderService } from '@/services/order.service';
import type { AppOrder } from '@/types/AppOrder';
import { formatLastSync } from '@/util/helper';
import { onMounted, ref, type Ref } from 'vue';
const authService: AuthService = new AuthService();
const orderService: OrderService = new OrderService();
const lastSync: Ref<string> = ref('')
const syncError: Ref<boolean> = ref(false)
const ORDERS: Ref<AppOrder[]> = ref([])
const ordersLoading: Ref<boolean> = ref(false)
const ordersError: Ref<boolean> = ref(false)
const ordersErrorMsg: Ref<string> = ref('')
/**
 * Handles the user last sync using auth service
 * @author Oriol Plazas León
 * @since 17/09/2026
 */
const handleUserLastSync = async () => {
    try {
        syncError.value = false
        const date: string = await authService.getLastSyncTime();
        lastSync.value = formatLastSync(date)
    } catch {
        syncError.value = true
    }
}

/**
 * Gets user orders
 * @author Oriol Plazas León
 * @since 17/09/2026
 */
const getUserOrders = async () => {
    try {
        ordersLoading.value = true
        ordersError.value = false
        ordersErrorMsg.value = ''
        //await orderService.syncGmail()
        ORDERS.value = await orderService.loadUserOrders();
        ORDERS.value.push({
            id: '123jnsjkn',
            merchant: 'Nike Jordan Retro IV',
            orderNumber: '234ND9038LS3',
            total: 173,
            currency: 'EUR',
            trackingNumber: '234ND9038LS3',
            carrier: 'DHL',
            company: 'Nike',
            status: 'Shipped',
            estimatedDelivery: new Date(),
            createdAt: new Date()
        }, {
            id: '123jnfsjkn',
            merchant: 'Amazon Basics Book Shelves',
            orderNumber: 'SH23N9285ND2',
            total: 34,
            currency: 'EUR',
            trackingNumber: 'SH23N9285ND2',
            carrier: 'FedEx',
            company: 'Amazon',
            status: 'Processing',
            estimatedDelivery: new Date(),
            createdAt: new Date()
        })

    } catch (e: any) {
        ordersError.value = true;
        ordersErrorMsg.value = e.message || 'Unable to get your orders, try again later'
    } finally {
        ordersLoading.value = false
    }
}
onMounted(() => {
    handleUserLastSync()
    getUserOrders()
})
</script>

<template>
    <DashboardLoading v-if="ordersLoading" />
    <DashboardHeader />
    <DashboardOrders :orders="ORDERS" :sync-error="syncError" :last-sync="lastSync" />
</template>
