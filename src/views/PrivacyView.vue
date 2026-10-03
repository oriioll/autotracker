<template>
    <main class="document-page">
        <nav class="document-nav" aria-label="Legal navigation">
            <router-link to="/">AutoTracker</router-link>
            <span><router-link to="/terms">Terms</router-link> · <router-link to="/cookies">Cookies</router-link></span>
        </nav>
        <header class="document-header">
            <p class="eyebrow">Legal</p>
            <h1>Privacy Policy</h1>
            <p>Last updated: 18 September 2026</p>
        </header>
        <article class="document-content">
            <p>This Privacy Policy explains how AutoTracker processes personal data under Regulation (EU) 2016/679
                (GDPR), Spain's Organic Law 3/2018 (LOPDGDD), and other applicable data protection rules.</p>
            <h2>1. Data controller</h2>
            <p>The data controller is the AutoTracker service owner. The controller's identity and contact details
                should be kept current in the application's official support or legal contact channel.</p>
            <h2>2. Data we process</h2>
            <p>Depending on how you use the service, we may process account identifiers, authentication data, profile
                information, order details, merchant and carrier information, tracking numbers, delivery estimates,
                technical logs and support communications.</p>
            <h2>3. Purposes and legal bases</h2>
            <p>We process data to provide and secure AutoTracker, based on performance of the contract (Article 6(1)(b)
                GDPR); to prevent abuse and maintain reliable systems, based on legitimate interests (Article 6(1)(f));
                and to comply with legal obligations (Article 6(1)(c)). We request consent where the law requires it,
                including for non-essential cookies or optional communications.</p>
            <h2>4. Connected email accounts</h2>
            <p>If you connect Gmail or another provider, we access only the information needed for the requested
                synchronization features. We do not sell email content or use it for advertising. You can revoke access
                through the provider and request deletion through the service.</p>
            <h2>5. Retention</h2>
            <p>We keep data only for as long as necessary for the purposes described, while your account is active and
                for legally required limitation periods. Data no longer needed is deleted or anonymized.</p>
            <h2>6. Recipients and international transfers</h2>
            <p>Data may be processed by infrastructure, authentication and email providers acting under appropriate
                contractual safeguards. Where data leaves the European Economic Area, we use a lawful transfer mechanism
                such as an adequacy decision or GDPR-approved safeguards.</p>
            <h2>7. Your rights</h2>
            <p>You may request access, rectification, erasure, restriction, portability or objection, and withdraw
                consent at any time where processing relies on consent. Contact the controller through the official
                support channel. You may also complain to the Spanish Data Protection Agency (AEPD): <a
                    href="https://www.aepd.es" target="_blank" rel="noreferrer">aepd.es</a>.</p>
            <h2>8. Security and changes</h2>
            <p>We use proportionate technical and organizational measures to protect personal data. We may update this
                policy when the service or legal requirements change and will publish the new version here.</p>
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
    margin-bottom: .8rem;
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
