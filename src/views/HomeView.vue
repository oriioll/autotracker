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

const goToLogin = () => {
    router.push('/login')
}

const goToDashboard = () => {
    router.push('/dashboard')
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
//FAQS ARRAY with all the FaQs and answers for the landing page
const faqs: { question: string; answer: string }[] = [
    {
        question: 'What does AutoTracker read in my inbox?',
        answer: 'Only the subject, the sender and a short preview of each email, never the full message or attachments. The first sync covers the last 6 months; after that, only new emails are checked.'
    },
    {
        question: 'Can AutoTracker send, delete or change my emails?',
        answer: 'No. It only requests read-only access to your Gmail and never sends, deletes or modifies anything.'
    },
    {
        question: 'What data do you store?',
        answer: 'Only the order details we extract: store, order number, total, tracking number, carrier, status and estimated delivery. We don\'t keep the contents of your emails. We also store the authorization token Google gives us so we can keep syncing.'
    },
    {
        question: 'How does the AI part work?',
        answer: 'Emails that look order-related (confirmations, shipping updates, receipts) are sent to Google\'s Gemini AI, which decides whether it\'s a real order and extracts the details. Emails that don\'t look order-related are never sent to the AI.'
    },
    {
        question: 'When does it sync?',
        answer: 'Every time you open your dashboard, AutoTracker checks for emails received since the last sync and updates your orders.'
    },
    {
        question: 'Which stores, carriers and languages are supported?',
        answer: 'Any store or carrier. Order emails in Spanish, Catalan, English, French, German, Italian and Portuguese are recognized, and emails from major carriers like Correos, SEUR, MRW, GLS, DHL, UPS and FedEx are picked up even when the subject is short.'
    },
    {
        question: 'How can I revoke access or delete my data?',
        answer: 'You can revoke AutoTracker\'s access at any time from the third-party access settings of your Google Account. To delete the data we store about you, email orimypro7@gmail.com and we\'ll remove it within 30 days.'
    }
]
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
                    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" aria-hidden="true">

                <el-dropdown v-else-if="isLoggedIn" trigger="click" @command="handleLogout">
                    <img class="avatar" :src="userAvatar" alt="Your Google profile picture">
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
                <button v-if="!isLoggedIn" class="btn-primary" @click="goToLogin">
                    Connect with Google
                </button>
                <button v-else class="btn-primary" @click="goToDashboard">
                    Go to Dashboard
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
        <!-- FAQ -->
        <section class="faq">
            <h2>Frequently asked questions</h2>
            <div class="faq-list">
                <details v-for="faq in faqs" :key="faq.question" class="faq-item">
                    <summary>{{ faq.question }}</summary>
                    <p>{{ faq.answer }}</p>
                </details>
            </div>
            <p class="faq-note">Want the details? Read our <router-link to="/privacy">Privacy Policy</router-link>.</p>
        </section>
        <!-- CTA final -->
        <section class="cta-final">
            <h2>Stop searching your inbox for orders.</h2>
            <button v-if="!isLoggedIn" class="btn-primary" @click="goToLogin">
                Connect with Google
            </button>
            <button v-else class="btn-primary" @click="goToDashboard">
                Go to Dashboard
            </button>
        </section>
        <footer class="footer">
            <router-link to="/privacy">Privacy</router-link> ·
            <router-link to="/terms">Terms</router-link> ·
            <router-link to="/cookies">Cookies</router-link>
        </footer>
    </div>
</template>

<style scoped>
.landing {
    min-height: 100dvh;
    padding-bottom: env(safe-area-inset-bottom);
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
    padding: max(1rem, env(safe-area-inset-top)) var(--page-gutter) 1rem;
    gap: 1rem;
}

.brand {
    text-decoration: none;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: clamp(.75rem, 2vw, 2rem);
}

.nav-actions img {
    border-radius: 50%;
    height: 44px;
    width: 44px;
    aspect-ratio: 1/1;
    object-fit: cover;
}

.avatar {
    cursor: pointer;
}

.avatar-skeleton {
    background: var(--color-surface-2);
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
    transition: background-color 180ms ease, border-color 180ms ease;
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
    transition: opacity 180ms ease, transform 180ms ease-in-out;
}

.btn-ghost:active,
.btn-primary:active {
    transform: scale(.97);
    transition: transform 120ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .btn-ghost:hover {
        background: var(--color-surface-2);
        border-color: var(--color-accent);
    }

    .btn-primary:hover {
        opacity: .88;
        transform: translateY(-1px);
    }
}

/* ---------- Hero ---------- */
.hero {
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(2rem, 5vw, 3rem) var(--page-gutter) clamp(2.5rem, 6vw, 4rem);
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: clamp(1.5rem, 4vw, 3rem);
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
    font-size: var(--fs-xs);
    color: var(--color-text-2);
}

.mini-value {
    font-size: var(--fs-xs);
    font-weight: 600;
    color: var(--color-text);
}

.mini-logo {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
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
    width: 26px;
    height: 26px;
    flex-basis: 26px;
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
    font-size: var(--fs-xs);
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
    font-size: var(--fs-xs);
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
    padding: var(--section-space) var(--page-gutter);
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
    width: 36px;
    height: 36px;
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

/* ---------- FAQ ---------- */
.faq {
    max-width: 760px;
    margin: 0 auto;
    padding: var(--section-space) var(--page-gutter);
}

.faq h2 {
    font-size: var(--fs-xl);
    letter-spacing: var(--ls-tight);
    margin-bottom: 2rem;
    text-align: center;
}

.faq-list {
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.faq-item {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    transition: border-color .3s ease;
}

.faq-item:hover,
.faq-item[open] {
    border-color: var(--color-accent);
}

.faq-item summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 48px;
    padding: .75rem 1rem;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
    border-radius: var(--radius-sm);
}

.faq-item summary::-webkit-details-marker {
    display: none;
}

.faq-item summary::after {
    content: '';
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-right: 2px solid var(--color-text-2);
    border-bottom: 2px solid var(--color-text-2);
    transform: rotate(45deg);
    transition: transform .3s ease;
}

.faq-item[open] summary::after {
    transform: rotate(-135deg);
}

.faq-item summary:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

.faq-item p {
    padding: 0 1rem 1rem;
    font-size: var(--fs-sm);
    color: var(--color-text-2);
}

.faq-note {
    margin-top: 1.5rem;
    text-align: center;
    font-size: var(--fs-sm);
    color: var(--color-text-2);
}

/* ---------- CTA final ---------- */
.cta-final {
    text-align: center;
    padding: var(--section-space) var(--page-gutter);
}

.cta-final h2 {
    font-size: var(--fs-xl);
    letter-spacing: var(--ls-tight);
    margin-bottom: 1.5rem;
}

.footer {
    padding: 2rem var(--page-gutter) max(2rem, env(safe-area-inset-bottom));
    border-top: 1px solid var(--color-border);
    text-align: center;
    font-size: var(--fs-sm);
    color: var(--color-text-2);
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
    .hero {
        flex-direction: column-reverse;
        align-items: stretch;
        gap: 2rem;
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
    .nav {
        padding-right: max(var(--page-gutter), env(safe-area-inset-right));
        padding-left: max(var(--page-gutter), env(safe-area-inset-left));
    }

    .nav-actions {
        gap: .5rem;
    }

    .preview-cards .mini-card:nth-child(n + 2) {
        display: none;
    }

    .steps {
        grid-template-columns: 1fr;
        gap: .75rem;
    }

    .how,
    .faq {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .how h2,
    .faq h2 {
        margin-bottom: 1.25rem;
    }

    .step {
        padding: 1rem;
    }

    .step-number {
        margin-bottom: .5rem;
    }

    .faq-list {
        gap: .5rem;
    }

    .faq-item summary {
        min-height: 44px;
        padding: .6rem .75rem;
        gap: .75rem;
    }

    .faq-item p {
        padding: 0 .75rem .75rem;
    }

    .faq-note {
        margin-top: 1rem;
    }

    .hero-copy h1 {
        font-size: var(--fs-xl);
    }

    .mini-table-header,
    .mini-table-row {
        grid-template-columns: 1.4fr .9fr;
        gap: .35rem;
        padding-inline: .5rem;
    }

    .mini-table-header span:last-child,
    .mini-table-row span.align-right {
        display: none;
    }
}

@media (max-width: 480px) {
    .preview-card {
        padding: 1rem;
    }

    .preview-heading {
        align-items: flex-start;
        gap: .5rem;
    }

    .preview-subtitle {
        text-align: right;
    }

    .mini-card {
        min-width: 0;
    }

    .mini-card-summary {
        flex: 0 0 auto;
    }

    .footer {
        padding-bottom: max(2rem, env(safe-area-inset-bottom));
    }
}
</style>