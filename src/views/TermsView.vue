<template>
    <main class="document-page">
        <nav class="document-nav" aria-label="Legal navigation">
            <router-link to="/">AutoTracker</router-link>
            <span><router-link to="/privacy">Privacy</router-link> · <router-link to="/cookies">Cookies</router-link></span>
        </nav>
        <header class="document-header">
            <p class="eyebrow">Legal</p>
            <h1>Terms of Service</h1>
            <p>Last updated: 18 September 2026</p>
        </header>
        <article class="document-content">
            <p>These Terms of Service govern your access to and use of AutoTracker. By using the service, you agree to
                these terms. If you do not agree, do not use AutoTracker.</p>
            <h2>1. The service</h2>
            <p>AutoTracker helps you organize order information and related delivery details. Features may change as the
                service evolves. We will make reasonable efforts to keep the service available, but we do not guarantee
                uninterrupted operation.</p>
            <h2>2. Accounts and connected services</h2>
            <p>You are responsible for keeping your account secure and for the activity carried out through it. When you
                connect an email account, you authorize AutoTracker to process the messages and data necessary to
                provide the requested order-tracking features, subject to the <router-link to="/privacy">Privacy Policy</router-link>.</p>
            <h2>3. Acceptable use</h2>
            <p>You must use AutoTracker lawfully and must not attempt to disrupt the service, access another person's
                account, reverse engineer it, or use it to process data without an appropriate legal basis.</p>
            <h2>4. Intellectual property</h2>
            <p>AutoTracker and its original software, branding and content belong to their respective rights holders.
                These terms grant you a limited, non-exclusive right to use the service for its intended purpose.</p>
            <h2>5. Liability</h2>
            <p>AutoTracker is provided with reasonable care. To the extent permitted by applicable law, we are not
                responsible for indirect losses, loss of availability, or inaccuracies in information supplied by
                third-party services. Nothing limits rights that cannot legally be excluded under Spanish or EU law.</p>
            <h2>6. Suspension and termination</h2>
            <p>You may stop using the service at any time. We may suspend access when reasonably necessary for security,
                legal compliance, or material breach of these terms.</p>
            <h2>7. Governing law</h2>
            <p>These terms are governed by Spanish law. Consumers retain any mandatory protections and jurisdictional
                rights granted by applicable EU and Spanish consumer law.</p>
            <h2>8. Contact</h2>
            <p>For questions about these terms, contact the AutoTracker service owner through the support channel made
                available in the application.</p>
        </article>
    </main>
</template>

<style scoped>
.document-page {
    width: min(900px, calc(100% - 2rem));
    margin: 0 auto;
    padding: 2rem 0 5rem;
    color: var(--color-text);
}

.document-nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
    font-size: var(--fs-sm);
}

.document-header {
    padding: 5rem 0 3rem;
    border-bottom: 1px solid var(--color-border);
}

.eyebrow {
    color: var(--color-accent);
    font-size: var(--fs-sm);
    font-weight: 600;
    letter-spacing: var(--ls-small);
    text-transform: uppercase;
}

h1 {
    margin-top: .75rem;
}

.document-header>p:last-child {
    margin-top: .75rem;
    color: var(--color-text-2);
    font-size: var(--fs-sm);
}

.document-content {
    max-width: 700px;
    padding-top: 2.5rem;
}

.document-content h2 {
    margin: 2rem 0 .6rem;
    font-size: var(--fs-md);
}

.document-content p {
    color: var(--color-text-2);
}

.document-content a {
    text-decoration: underline;
}

@media (max-width: 600px) {
    .document-page {
        padding-top: 1rem;
    }

    .document-header {
        padding: 3rem 0 2rem;
    }

    .document-nav {
        flex-direction: column;
    }
}
</style>
