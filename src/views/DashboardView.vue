<script setup lang="ts">
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import DashboardOrders from '@/components/dashboard/DashboardOrders.vue';
import RecentOrders from '@/components/dashboard/RecentOrders.vue';
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
const needsReconnect: Ref<boolean> = ref(false)
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
        await orderService.syncGmail()
        ORDERS.value = await orderService.loadUserOrders();
    } catch (e: any) {
        ordersError.value = true;
        needsReconnect.value = e.message === 'MISSING_GMAIL_SCOPE'
        ordersErrorMsg.value = e.message || 'Unable to get your orders, try again later'
    } finally {
        ordersLoading.value = false
    }
}
/**
 * Tries to reconnect the user Gmail account by using auth service 
 * @author Oriol Plazas León
 * @since 05/10/2026
 */
const reconnectGmail = async () => {
    try {
        await authService.loginWithGoogle()
    } catch (e: any) {
        needsReconnect.value = false
        ordersErrorMsg.value = e.message
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
    <main v-if="ordersError" class="error-state" role="alert">
        <template v-if="needsReconnect">
            <h1>Gmail access is missing</h1>
            <p>Google didn't grant permission to read your emails. When you reconnect,
                make sure the Gmail checkbox is ticked.</p>
            <button type="button" class="retry-button" @click="reconnectGmail">
                Reconnect Gmail
            </button>
        </template>
        <template v-else>
            <h1>We couldn't load your orders</h1>
            <p>{{ ordersErrorMsg }}</p>
            <button type="button" class="retry-button" :disabled="ordersLoading" @click="getUserOrders">
                Try again
            </button>
        </template>
    </main>
    <RecentOrders v-if="!ordersLoading && !ordersError" :orders="ORDERS" />
    <DashboardOrders v-if="!ordersLoading && !ordersError" :orders="ORDERS" :sync-error="syncError"
        :last-sync="lastSync" />
</template>

<style scoped>
.error-state {
    width: min(560px, calc(100% - 2rem));
    min-height: 50vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    color: var(--color-text);
}

.error-state p {
    color: var(--color-text-2);
}

.retry-button {
    min-height: 44px;
    padding: .65rem 1rem;
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--color-accent);
    color: var(--color-accent-contrast);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
}

.retry-button:disabled {
    cursor: wait;
    opacity: .65;
}
</style>
