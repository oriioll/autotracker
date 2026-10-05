<template>
    <main class="document-page">
        <nav class="document-nav" aria-label="Legal navigation">
            <router-link to="/">AutoTracker</router-link>
            <span><router-link to="/privacy">Privacy</router-link> · <router-link to="/terms">Terms</router-link></span>
        </nav>
        <header class="document-header">
            <p class="eyebrow">Legal</p>
            <h1>Cookie Policy</h1>
            <p>Last updated: 5 October 2026</p>
        </header>
        <article class="document-content">
            <p>This policy explains the browser storage AutoTracker uses. The app does not currently set cookies or use
                advertising or analytics trackers.</p>
            <h2>1. What cookies are</h2>
            <p>Cookies are one kind of information stored on a device. Browser local storage is a separate technology,
                but privacy rules can apply to it too.</p>
            <h2>2. Browser storage used by AutoTracker</h2>
            <p><strong>Sign-in session</strong> (first-party local storage, key starting with <code>sb-</code> and
                ending in
                <code>-auth-token</code>, kept until you sign out): Supabase Auth stores session information so you can
                stay
                signed in and use your account. It is strictly necessary to provide the service you request and is
                exempt from
                consent under Article 22.2 of Spain's LSSI.
            </p>
            <p><strong>Theme preference</strong> (first-party local storage, key <code>autotracker-theme</code>, kept
                until
                you clear
                it): if you allow optional storage in Privacy settings, AutoTracker saves your selected light or dark
                theme. If
                you reject it, the selected theme applies only for the current visit and the app follows your device
                preference
                on a later visit.</p>
            <p><strong>Privacy choice</strong> (first-party local storage, key
                <code>autotracker-storage-consent</code>, kept until
                you clear
                it or change your choice): AutoTracker stores whether you accepted or rejected the optional theme
                preference so
                it can respect that choice on later visits.
            </p>
            <h2>3. Your choices</h2>
            <p>Use the Privacy settings control on any page to accept or reject optional theme storage, or to change
                your choice later. You can also clear browser storage in your browser settings. Clearing the sign-in
                session will sign you out.</p>
            <h2>4. Third-party services</h2>
            <p>When you sign in with Google, Google and Supabase may use their own technologies on their services. Their
                use is governed by their respective privacy information and is outside AutoTracker's first-party
                storage.</p>
            <p>AutoTracker loads its typeface (Sora) from Google Fonts. Your browser requests the font files directly
                from
                Google's servers (fonts.googleapis.com and fonts.gstatic.com), which means Google receives your IP
                address and
                browser information. AutoTracker does not use these requests to set cookies or to track you.</p>
            <h2>5. More information</h2>
            <p>For details about personal data and your rights under the GDPR and Spanish law, see our <router-link
                    to="/privacy">Privacy Policy</router-link>.</p>
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

    .document-content p {
        font-size: var(--fs-sm);
        line-height: 1.5;
    }
}
</style>
