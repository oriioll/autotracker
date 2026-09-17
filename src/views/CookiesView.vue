<template>
    <main class="document-page">
        <nav class="document-nav" aria-label="Legal navigation">
            <a href="/">AutoTracker</a>
            <span><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></span>
        </nav>
        <header class="document-header">
            <p class="eyebrow">Legal</p>
            <h1>Cookie Policy</h1>
            <p>Last updated: 18 September 2026</p>
        </header>
        <article class="document-content">
            <p>This policy explains how AutoTracker uses cookies and similar technologies on its website and
                application.</p>
            <h2>1. What cookies are</h2>
            <p>Cookies are small files stored on your device. Similar technologies can remember preferences or support
                authentication.</p>
            <h2>2. Cookies we use</h2>
            <p><strong>Strictly necessary cookies:</strong> these support authentication, session security and core
                application operation. They do not require consent because the service cannot work properly without
                them.</p>
            <p><strong>Preference cookies:</strong> these remember choices such as the selected theme. They are used
                only when necessary to provide the requested preference.</p>
            <p>We do not use advertising cookies or third-party tracking cookies unless this policy and an applicable
                consent mechanism are updated first.</p>
            <h2>3. Your choices</h2>
            <p>You can control cookies through your browser settings. Blocking necessary cookies may prevent login or
                other core features from working. Where consent is required, you can withdraw it using the available
                consent controls.</p>
            <h2>4. Third-party services</h2>
            <p>Connected services, such as an email provider used for synchronization, may set or process identifiers
                under their own policies. Review those providers' information when connecting an account.</p>
            <h2>5. More information</h2>
            <p>For details about personal data and your rights under the GDPR and Spanish law, see our <a
                    href="/privacy">Privacy Policy</a>.</p>
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
