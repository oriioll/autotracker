<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import { AuthService } from '@/services/auth.service'
import type { AppUser } from '@/types/AppUser'

const router = useRouter()
const authService: AuthService = new AuthService()

const userAvatar: Ref<string> = ref('')
const isLoggedIn: Ref<boolean> = ref(false)
const isLoading: Ref<boolean> = ref(true)

onMounted(async () => {
    try {
        const user: AppUser = await authService.getMe()
        userAvatar.value = user.avatar
        isLoggedIn.value = true
    } catch (e: any) {
        // Not logged in — expected on a public landing page, nothing to log
        isLoggedIn.value = false
    } finally {
        isLoading.value = false
    }
})

function goToLogin() {
    router.push('/login')
}

/**
 * Handles user logout by using auth service
 * @author Oriol Plazas León
 * @since 16/09/2026
 */
const handleLogout = async () => {
    try {
        await authService.logout()
        window.location.href = '/'
    } catch (e: any) {
        console.log(e)
    }
}
</script>

<template>
    <div class="landing">
        <!-- Nav -->
        <header class="nav">
            <router-link to="/" class="brand">
                <h3>Auto<span class="accent">Tracker</span></h3>
            </router-link>
            <aside class="nav-actions">
                <ThemeToggle />

                <img v-if="isLoading" class="avatar-skeleton"
                    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="Loading user avatar">

                <el-dropdown v-else-if="isLoggedIn" trigger="click" @command="handleLogout">
                    <img class="avatar" :src="userAvatar" alt="User avatar">
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="logout">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="var(--color-text)"
                                        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" />
                                </svg> Log Out
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <button v-else class="btn-ghost" @click="goToLogin">Sign in</button>
            </aside>
        </header>

        <!-- Hero: mockup left, copy right (stacks on mobile) -->
        <section class="hero">
            <div class="hero-preview">
                <div class="preview-card">
                    <!-- Upcoming deliveries -->
                    <div class="preview-section">
                        <div class="preview-heading">
                            <span class="preview-title">Upcoming deliveries</span>
                            <span class="preview-subtitle">Next 7 days</span>
                        </div>
                        <div class="preview-cards">
                            <div class="mini-card">
                                <span class="mini-logo">A</span>
                                <div class="mini-card-labels">
                                    <strong class="mini-merchant">Wireless Charger</strong>
                                    <span class="mini-company">Amazon.es</span>
                                </div>
                                <div class="mini-card-summary">
                                    <span class="mini-label">Arrives</span>
                                    <span class="mini-value">Today</span>
                                </div>
                            </div>
                            <div class="mini-card">
                                <span class="mini-logo">Z</span>
                                <div class="mini-card-labels">
                                    <strong class="mini-merchant">Table Lamp</strong>
                                    <span class="mini-company">Zara Home</span>
                                </div>
                                <div class="mini-card-summary">
                                    <span class="mini-label">Arrives</span>
                                    <span class="mini-value">Fri</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Orders table -->
                    <div class="preview-section">
                        <div class="preview-heading">
                            <span class="preview-title">Orders</span>
                            <span class="preview-subtitle accent">Last synced: 2 min ago</span>
                        </div>
                        <div class="mini-table">
                            <div class="mini-table-header">
                                <span>Company</span>
                                <span>Status</span>
                                <span class="align-right">Total</span>
                            </div>
                            <div class="mini-table-row">
                                <div class="mini-row-company">
                                    <span class="mini-logo mini-logo--sm">A</span>
                                    <span>Amazon.es</span>
                                </div>
                                <span class="mini-status">Shipped</span>
                                <span class="align-right">€24.99</span>
                            </div>
                            <div class="mini-table-row">
                                <div class="mini-row-company">
                                    <span class="mini-logo mini-logo--sm">D</span>
                                    <span>Decathlon</span>
                                </div>
                                <span class="mini-status mini-status--pending">Preparing</span>
                                <span class="align-right">€59.00</span>
                            </div>
                            <div class="mini-table-row">
                                <div class="mini-row-company">
                                    <span class="mini-logo mini-logo--sm">Z</span>
                                    <span>Zara Home</span>
                                </div>
                                <span class="mini-status mini-status--delivered">Delivered</span>
                                <span class="align-right">€18.50</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hero-copy">
                <h1>Every order,<br />found automatically.</h1>
                <p class="hero-sub">
                    AutoTracker connects to your Gmail and uses AI to find your
                    purchases and shipments automatically, so you never have to dig
                    through your inbox to know where a package is.
                </p>
                <button class="btn-primary" @click="goToLogin">
                    Connect with Google
                </button>
                <p class="hero-note">Read-only access. Revoke it anytime.</p>
            </div>
        </section>

        <!-- How it works -->
        <section class="how">
            <h2>How it works</h2>
            <div class="steps">
                <div class="step">
                    <span class="step-number">1</span>
                    <h3>Connect your Gmail</h3>
                    <p>Sign in with Google, granting read-only access to your inbox — we never send or modify anything.
                    </p>
                </div>
                <div class="step">
                    <span class="step-number">2</span>
                    <h3>AI finds your orders</h3>
                    <p>We scan your recent emails for order confirmations and shipping updates, and our AI pulls out the
                        merchant, tracking number, and estimated delivery.</p>
                </div>
                <div class="step">
                    <span class="step-number">3</span>
                    <h3>See it all in one place</h3>
                    <p>Upcoming deliveries and your full order history, kept in sync automatically, no more searching
                        store by
                        store.</p>
                </div>
            </div>
        </section>

        <!-- CTA final -->
        <section class="cta-final">
            <h2>Stop searching your inbox for orders.</h2>
            <button class="btn-primary" @click="goToLogin">
                Connect with Google
            </button>
        </section>
    </div>
</template>

<style scoped>
.landing {
    min-height: 100vh;
    background: var(--color-bg);
    color: var(--color-text);
}

.accent {
    color: var(--color-accent);
}

/* ---------- Nav ---------- */
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 5%;
    gap: 1rem;
}

.brand {
    text-decoration: none;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-actions img {
    border-radius: 50%;
    height: 35px;
    width: 35px;
    aspect-ratio: 1/1;
    object-fit: cover;
}

.avatar {
    cursor: pointer;
}

.avatar-skeleton {
    background: linear-gradient(100deg,
            var(--color-surface-2) 35%,
            var(--color-border) 50%,
            var(--color-surface-2) 65%);
    background-size: 300% 100%;
    animation: avatar-skeleton-shimmer 1.8s ease-in-out infinite;
}

@keyframes avatar-skeleton-shimmer {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}

.btn-ghost {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 8px 16px;
    font-family: var(--font-sans);
    font-size: var(--fs-sm);
    font-weight: 500;
    color: var(--color-text);
    cursor: pointer;
    transition: all .3s ease;
}

.btn-ghost:hover {
    background: var(--color-surface-2);
    border-color: var(--color-accent);
}

.btn-primary {
    background: var(--color-accent);
    color: var(--color-accent-contrast);
    border: none;
    border-radius: var(--radius-sm);
    padding: 12px 28px;
    font-family: var(--font-sans);
    font-size: var(--fs-base);
    font-weight: 600;
    cursor: pointer;
    transition: all .3s ease;
}

.btn-primary:hover {
    opacity: 0.88;
    transform: translateY(-1px);
}

/* ---------- Hero ---------- */
.hero {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 5% 4rem;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 3rem;
}

.hero-preview {
    flex: 1;
    min-width: 0;
}

.hero-copy {
    flex: 1;
    min-width: 0;
}

.hero-copy h1 {
    font-size: var(--fs-2xl);
    letter-spacing: var(--ls-tight);
    line-height: var(--lh-tight);
}

.hero-sub {
    margin-top: 1rem;
    font-size: var(--fs-md);
    color: var(--color-text-2);
    line-height: var(--lh-body);
}

.hero-copy .btn-primary {
    margin-top: 1.5rem;
}

.hero-note {
    margin-top: .75rem;
    font-size: var(--fs-xs);
    color: var(--color-text-2);
}

/* ---------- Preview mockup ---------- */
.preview-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.25);
}

.preview-section {
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.preview-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.preview-title {
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--color-text);
}

.preview-subtitle {
    font-size: var(--fs-xs);
    color: var(--color-text-2);
}

/* Recent order cards (mini) */
.preview-cards {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
}

.mini-card {
    flex: 1;
    min-width: 140px;
    display: flex;
    align-items: flex-start;
    gap: .5rem;
    padding: .75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-bg);
}

.mini-card-labels {
    display: flex;
    flex-direction: column;
    gap: .1rem;
    min-width: 0;
}

.mini-merchant {
    font-size: var(--fs-xs);
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mini-company {
    font-size: var(--fs-xs);
    color: var(--color-text-2);
}

.mini-card-summary {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: .1rem;
}

.mini-label {
    font-size: 10px;
    color: var(--color-text-2);
}

.mini-value {
    font-size: var(--fs-xs);
    font-weight: 600;
    color: var(--color-text);
}

.mini-logo {
    width: 26px;
    height: 26px;
    flex: 0 0 26px;
    display: grid;
    place-items: center;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text-2);
    font-size: var(--fs-xs);
    font-weight: 700;
}

.mini-logo--sm {
    width: 22px;
    height: 22px;
    flex-basis: 22px;
}

/* Orders table (mini) */
.mini-table {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.mini-table-header {
    display: grid;
    grid-template-columns: 1.5fr 1fr .8fr;
    gap: .5rem;
    padding: .5rem .75rem;
    background: var(--color-surface-2);
    color: var(--color-text-2);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: var(--ls-small);
    text-transform: uppercase;
}

.mini-table-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr .8fr;
    align-items: center;
    gap: .5rem;
    padding: .6rem .75rem;
    border-top: 1px solid var(--color-border);
    font-size: var(--fs-xs);
}

.mini-row-company {
    display: flex;
    align-items: center;
    gap: .5rem;
    min-width: 0;
}

.align-right {
    text-align: right;
}

.mini-status {
    width: fit-content;
    padding: .15rem .5rem;
    border-radius: 999px;
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-size: 10px;
    font-weight: 600;
}

.mini-status--delivered {
    background: var(--color-success-soft);
    color: var(--color-success);
}

.mini-status--pending {
    background: var(--color-warning-soft);
    color: var(--color-warning);
}

/* ---------- How it works ---------- */
.how {
    max-width: 1000px;
    margin: 0 auto;
    padding: 4rem 5%;
    text-align: center;
}

.how h2 {
    font-size: var(--fs-xl);
    letter-spacing: var(--ls-tight);
    margin-bottom: 2rem;
}

.steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    text-align: left;
}

.step {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 1.5rem;
}

.step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-weight: 700;
    font-size: var(--fs-sm);
    margin-bottom: .75rem;
}

.step h3 {
    font-size: var(--fs-md);
    margin-bottom: .5rem;
}

.step p {
    color: var(--color-text-2);
    font-size: var(--fs-sm);
    line-height: var(--lh-body);
}

/* ---------- CTA final ---------- */
.cta-final {
    text-align: center;
    padding: 4rem 5%;
}

.cta-final h2 {
    font-size: var(--fs-xl);
    letter-spacing: var(--ls-tight);
    margin-bottom: 1.5rem;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
    .hero {
        flex-direction: column;
        align-items: stretch;
        gap: 2rem;
        flex-direction: column-reverse;
    }

    .hero-copy {
        order: 2;
        text-align: center;
    }

    .hero-preview {
        order: 1;
    }

    .hero-sub {
        font-size: var(--fs-sm);
    }
}

@media (max-width: 720px) {
    .preview-cards .mini-card:nth-child(n + 2) {
        display: none;
    }

    .steps {
        grid-template-columns: 1fr;
    }

    .hero-copy h1 {
        font-size: var(--fs-xl);
    }

    .mini-table-header,
    .mini-table-row {
        grid-template-columns: 1.4fr .9fr;
    }

    .mini-table-header span:last-child,
    .mini-table-row span.align-right {
        display: none;
    }
}
</style>