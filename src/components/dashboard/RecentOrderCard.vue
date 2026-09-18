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
    <OrderDialog v-if="showDialog" :order="props.order" :company="company" :carrier="carrier"
        @close="showDialog = false" />
    <article @click="showDialog = true" class="card">
        <div class="card__identity">
            <a v-if="company" class="company__logo" :href="company.website" target="_blank" rel="noreferrer"
                @click.stop>
                <img v-if="company.svg" :src="company.svg" :alt="company.name">
                <span v-else>{{ company.name[0]?.toUpperCase() || '-' }}</span>
            </a>
            <span v-else class="company__logo companyUppercase">{{ props.order.company[0]?.toUpperCase() || '-'
            }}</span>
            <div class="card__labels">
                <strong class="merchant">{{ props.order.merchant || '-' }}</strong>
                <span class="company__name">{{ props.order.company || '-' }}</span>
            </div>
        </div>
        <div class="card__summary">
            <div class="card__delivery">
                <span class="card__label">Arrives</span>
                <span class="cell">{{ formatDate(props.order.estimatedDelivery) }}</span>
            </div>
            <span class="cell cell--total">{{ props.order.total !== null && props.order.currency ?
                formatCurrency(props.order.total, props.order.currency) : '-' }}</span>
        </div>
    </article>
</template>
<style scoped>
.card {
    cursor: pointer;
    width: min(100%, 360px);
    min-height: 156px;
    padding: 1.25rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    transition: border-color .2s ease, background-color .2s ease, transform .2s ease;
}

.card:hover {
    border-color: var(--color-accent);
    background: var(--color-surface-2);
    transform: translateY(-1px);
}

.card__identity,
.card__summary {
    min-width: 0;
    display: flex;
}

.card__identity {
    align-items: flex-start;
    gap: .75rem;
}

.card__labels,
.card__delivery {
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.card__labels {
    gap: .2rem;
}

.card__summary {
    flex: 0 0 auto;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    text-align: right;
}

.card__delivery {
    align-items: flex-end;
    gap: .15rem;
}

.card__label {
    color: var(--color-text-2);
    font-size: var(--fs-xs);
}

.merchant {
    overflow: hidden;
    color: var(--color-text);
    font-size: var(--fs-sm);
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.company__logo {
    width: 35px;
    height: 35px;
    flex: 0 0 35px;
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

.companyUppercase {
    border-radius: 50%;
}

@media (max-width: 760px) {
    .card {
        min-height: 144px;
        padding: .75rem;
        gap: .75rem;
    }

    .card__summary {
        gap: .75rem;
    }

    .company__logo {
        width: 32px;
        height: 32px;
        flex-basis: 32px;
    }
}

@media (max-width: 480px) {
    .card {
        min-height: 132px;
    }

    .card__summary {
        gap: .5rem;
    }

    .card__delivery {
        align-items: flex-end;
    }

    .company__name {
        font-size: var(--fs-xs);
    }

    .cell--total {
        font-size: var(--fs-xs);
    }
}
</style>