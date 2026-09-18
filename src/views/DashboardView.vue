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
        ORDERS.value.push(
            {
                id: 'ORD-001',
                merchant: 'Apple Store',
                orderNumber: 'APL92384NS',
                total: 1299,
                currency: 'EUR',
                trackingNumber: 'APL92384NS',
                carrier: 'UPS',
                company: 'Apple',
                status: 'Out for Delivery',
                estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dies
                createdAt: new Date()
            },
            {
                id: 'ORD-002',
                merchant: 'Zara',
                orderNumber: 'ZR2039NSD',
                total: 59,
                currency: 'EUR',
                trackingNumber: 'ZR2039NSD',
                carrier: 'Correos Express',
                company: 'Zara',
                status: 'Processing',
                estimatedDelivery: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 dies
                createdAt: new Date()
            },
            {
                id: 'ORD-003',
                merchant: 'Adidas Originals',
                orderNumber: 'AD88HSK22',
                total: 110,
                currency: 'EUR',
                trackingNumber: 'AD88HSK22',
                carrier: 'DHL',
                company: 'Adidas',
                status: 'Shipped',
                estimatedDelivery: new Date('2026-09-25T00:00:00'), // 1 setmana
                createdAt: new Date()
            },
            {
                id: 'ORD-004',
                merchant: 'IKEA',
                orderNumber: 'IK2938HSS',
                total: 249,
                currency: 'EUR',
                trackingNumber: 'IK2938HSS',
                carrier: 'SEUR',
                company: 'IKEA',
                status: 'Delivered',
                estimatedDelivery: new Date('2026-09-15T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-005',
                merchant: 'Decathlon',
                orderNumber: 'DCN9283HS',
                total: 45,
                currency: 'EUR',
                trackingNumber: 'DCN9283HS',
                carrier: 'GLS',
                company: 'Decathlon',
                status: 'Shipped',
                estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-006',
                merchant: 'Shein',
                orderNumber: 'SHN9238LS',
                total: 23,
                currency: 'EUR',
                trackingNumber: 'SHN9238LS',
                carrier: 'Yanwen',
                company: 'Shein',
                status: 'In Transit',
                estimatedDelivery: new Date('2026-10-02T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-007',
                merchant: 'AliExpress',
                orderNumber: 'ALX9238HS',
                total: 12,
                currency: 'EUR',
                trackingNumber: 'ALX9238HS',
                carrier: 'Cainiao',
                company: 'AliExpress',
                status: 'Processing',
                estimatedDelivery: new Date('2026-10-10T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-008',
                merchant: 'JD Sports',
                orderNumber: 'JD9238HSK',
                total: 89,
                currency: 'EUR',
                trackingNumber: 'JD9238HSK',
                carrier: 'DHL',
                company: 'JD Sports',
                status: 'Shipped',
                estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-009',
                merchant: 'MediaMarkt',
                orderNumber: 'MMK9238LS',
                total: 499,
                currency: 'EUR',
                trackingNumber: 'MMK9238LS',
                carrier: 'UPS',
                company: 'MediaMarkt',
                status: 'Delivered',
                estimatedDelivery: new Date('2026-09-17T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-010',
                merchant: 'Fnac',
                orderNumber: 'FNC9238HS',
                total: 39,
                currency: 'EUR',
                trackingNumber: 'FNC9238HS',
                carrier: 'Correos',
                company: 'Fnac',
                status: 'Out for Delivery',
                estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-011',
                merchant: 'Pull&Bear',
                orderNumber: 'PB9238HS',
                total: 29,
                currency: 'EUR',
                trackingNumber: 'PB9238HS',
                carrier: 'Correos Express',
                company: 'Pull&Bear',
                status: 'Processing',
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-012',
                merchant: 'Nike',
                orderNumber: 'NK9238HS',
                total: 150,
                currency: 'EUR',
                trackingNumber: 'NK9238HS',
                carrier: 'FedEx',
                company: 'Nike',
                status: 'Shipped',
                estimatedDelivery: new Date('2026-09-23T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-013',
                merchant: 'Samsung Store',
                orderNumber: 'SMS9238HS',
                total: 899,
                currency: 'EUR',
                trackingNumber: 'SMS9238HS',
                carrier: 'UPS',
                company: 'Samsung',
                status: 'Processing',
                estimatedDelivery: new Date('2026-09-28T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-014',
                merchant: 'Bershka',
                orderNumber: 'BRK9238HS',
                total: 19,
                currency: 'EUR',
                trackingNumber: 'BRK9238HS',
                carrier: 'Correos',
                company: 'Bershka',
                status: 'Delivered',
                estimatedDelivery: new Date('2026-09-16T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-015',
                merchant: 'Amazon',
                orderNumber: 'AMZ9238HS',
                total: 72,
                currency: 'EUR',
                trackingNumber: 'AMZ9238HS',
                carrier: 'Amazon Logistics',
                company: 'Amazon',
                status: 'Out for Delivery',
                estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-016',
                merchant: 'Sephora',
                orderNumber: 'SPF9238HS',
                total: 54,
                currency: 'EUR',
                trackingNumber: 'SPF9238HS',
                carrier: 'GLS',
                company: 'Sephora',
                status: 'Shipped',
                estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-017',
                merchant: 'Foot Locker',
                orderNumber: 'FLK9238HS',
                total: 120,
                currency: 'EUR',
                trackingNumber: 'FLK9238HS',
                carrier: 'DHL',
                company: 'Foot Locker',
                status: 'In Transit',
                estimatedDelivery: new Date('2026-09-27T00:00:00'),
                createdAt: new Date()
            },
            {
                id: 'ORD-018',
                merchant: 'H&M',
                orderNumber: 'HM9238HS',
                total: 33,
                currency: 'EUR',
                trackingNumber: 'HM9238HS',
                carrier: 'Correos Express',
                company: 'H&M',
                status: 'Processing',
                estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-019',
                merchant: 'PCComponentes',
                orderNumber: 'PCC9238HS',
                total: 650,
                currency: 'EUR',
                trackingNumber: 'PCC9238HS',
                carrier: 'SEUR',
                company: 'PCComponentes',
                status: 'Shipped',
                estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                createdAt: new Date()
            },
            {
                id: 'ORD-020',
                merchant: 'Carhartt WIP',
                orderNumber: 'CHT9238HS',
                total: 89,
                currency: 'EUR',
                trackingNumber: 'CHT9238HS',
                carrier: 'FedEx',
                company: 'Carhartt',
                status: 'In Transit',
                estimatedDelivery: new Date('2026-10-01T00:00:00'),
                createdAt: new Date()
            }
        );

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
    <RecentOrders v-if="!ordersLoading && !ordersError" :orders="ORDERS" />
    <DashboardOrders v-if="!ordersLoading && !ordersError" :orders="ORDERS" :sync-error="syncError"
        :last-sync="lastSync" />
</template>
