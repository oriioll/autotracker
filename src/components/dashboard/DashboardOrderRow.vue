<script setup lang="ts">
import type { AppOrder } from '@/types/AppOrder';
import { findCompany } from '../../util/companies';
import { findCarrier } from '../../util/carriers';
import { onBeforeMount, type Ref, ref } from 'vue';
import type { Company } from '@/types/Company';
import { formatCurrency } from '@/types/Currency';
import { formatDate } from '@/util/helper';
import OrderDialog from './OrderDialog.vue';
const showDialog: Ref<boolean> = ref(false);
const props = defineProps<{
    order: AppOrder
}>()
const company: Ref<Company | null> = ref(null)
const carrier: Ref<Company | null> = ref(null)
onBeforeMount(() => {
    company.value = findCompany(props.order.company)
    carrier.value = props.order.carrier ? findCarrier(props.order.carrier) : null
})
</script>
<template>
    <Transition name="order-dialog">
        <OrderDialog v-if="showDialog" :order="props.order" :company="company" :carrier="carrier"
            @close="showDialog = false" />
    </Transition>
    <article @click="showDialog = true" class="row">
        <div class="company column--company">
            <a v-if="company" class="company__logo" :href="company.website" target="_blank" rel="noopener noreferrer">
                <img v-if="company.svg" :src="company.svg" :alt="`${company.name} logo`">
                <span v-else>{{ company.name[0]?.toUpperCase() || '-' }}</span>
            </a>
            <span v-else class="company__logo companyUppercase">{{ props.order.company[0]?.toUpperCase() || '-'
            }}</span>
            <span class="company__name">{{ props.order.company || '-' }}</span>
        </div>
        <span class="cell column--merchant">{{ props.order.merchant || '-' }}</span>
        <span class="cell cell--tracking column--tracking">{{ props.order.trackingNumber || '-' }}</span>
        <div class="company column--carrier">
            <a v-if="carrier" class="company__logo" :href="carrier.website" target="_blank" rel="noopener noreferrer">
                <img v-if="carrier.svg" :src="carrier.svg" :alt="`${carrier.name} logo`">
                <span v-else>{{ carrier.name[0]?.toUpperCase() || '-' }}</span>
            </a>
            <span v-else class="company__logo companyUppercase">{{ props.order.carrier?.[0]?.toUpperCase() || '-'
            }}</span>
            <span class="company__name">{{ props.order.carrier || '-' }}</span>
        </div>
        <span class="cell status column--status">{{ props.order.status || '-' }}</span>
        <span class="cell column--delivery">{{ formatDate(props.order.estimatedDelivery) }}</span>
        <span class="cell cell--total column--total">{{ props.order.total && props.order.currency ?
            formatCurrency(props.order.total, props.order.currency) : '-' }}</span>
    </article>
</template>
<style scoped>
.row {
    cursor: pointer;
    width: 100%;
    min-width: 980px;
    min-height: 64px;
    padding: .75rem 1rem;
    display: grid;
    grid-template-columns: minmax(175px, 1.4fr) minmax(160px, 1.2fr) minmax(145px, 1.15fr) minmax(145px, 1.1fr) minmax(105px, .8fr) minmax(125px, 1fr) minmax(85px, .7fr);
    align-items: center;
    gap: 1rem;
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
    transition: background-color 180ms ease;
}

@media (hover: hover) and (pointer: fine) {
    .row:hover {
        background: var(--color-surface-2);
    }
}

.company {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: .75rem;
}

.company__logo {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text-2);
    font-size: var(--fs-sm);
    font-weight: 700;
    text-decoration: none;
}

.company__logo img {
    width: 100%;
    height: 100%;
    padding: 5px;
    display: block;
    object-fit: contain;
}

.company__name,
.cell {
    min-width: 0;
    overflow: hidden;
    color: var(--color-text);
    font-size: var(--fs-sm);
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.cell--tracking {
    color: var(--color-text-2);
    font-variant-numeric: tabular-nums;
}

.cell--total {
    font-weight: 600;
    text-align: right;
}

.status {
    width: fit-content;
    padding: .25rem .5rem;
    border-radius: 999px;
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-size: var(--fs-xs);
    font-weight: 600;
}

.companyUppercase {
    border-radius: 50%;
}

@media (max-width: 1100px) {
    .row {
        min-width: 0;
        grid-template-columns: minmax(165px, 1.5fr) minmax(150px, 1.25fr) minmax(140px, 1.1fr) minmax(100px, .8fr) minmax(85px, .7fr);
    }

    .column--delivery,
    .column--carrier {
        display: none;
    }
}

@media (max-width: 760px) {
    .row {
        min-height: 58px;
        padding: .65rem .75rem;
        grid-template-columns: minmax(145px, 1.5fr) minmax(125px, 1.3fr) minmax(90px, .8fr) minmax(75px, .6fr);
        gap: .75rem;
    }

    .column--tracking {
        display: none;
    }

    .company__logo {
        width: 44px;
        height: 44px;
        flex-basis: 44px;
    }
}

@media (max-width: 480px) {
    .row {
        grid-template-columns: minmax(125px, 1.5fr) minmax(100px, 1.2fr) minmax(72px, .7fr);
    }

    .column--merchant {
        display: none;
    }

    .company__name {
        font-size: var(--fs-xs);
    }

    .cell--total {
        font-size: var(--fs-xs);
    }
}
</style>