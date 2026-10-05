<template>
    <main class="document-page">
        <nav class="document-nav" aria-label="Legal navigation">
            <router-link to="/">AutoTracker</router-link>
            <span><router-link to="/terms">Terms</router-link> · <router-link to="/cookies">Cookies</router-link></span>
        </nav>
        <header class="document-header">
            <p class="eyebrow">Legal</p>
            <h1>Privacy Policy</h1>
            <p>Last updated: 5 October 2026</p>
        </header>
        <article class="document-content">
            <p>This Privacy Policy explains how AutoTracker processes personal data under Regulation (EU) 2016/679
                (GDPR), Spain's Organic Law 3/2018 (LOPDGDD), and other applicable data protection rules.</p>
            <h2>1. Who is responsible for your data</h2>
            <p>The data controller is Oriol Plazas, an individual based in Spain. Contact:
                <a href="mailto:orimypro7@gmail.com">orimypro7@gmail.com</a>.
            </p>

            <h2>2. What we process, why, and on what basis</h2>
            <p><strong>Account data</strong> (Google account ID, name, email, profile picture): to sign you in and run
                your
                account. Basis: performance of the contract (Art. 6(1)(b) GDPR).</p>
            <p><strong>Email data from Gmail:</strong> with your authorization, we read the subject, sender and a short
                preview
                of your emails, never the full message or attachments. We do not store them. Basis: performance of the
                contract
                and the authorization you give on Google's consent screen, which you can withdraw at any time.</p>
            <p><strong>Order data we store:</strong> store name, order number, total, currency, tracking number,
                carrier,
                status, estimated delivery date and the Gmail message ID. Basis: performance of the contract.</p>
            <p><strong>Authorization token:</strong> the Google token that lets us keep syncing. Basis: performance of
                the
                contract.</p>
            <p><strong>Technical logs</strong> (such as IP address and errors): for security and reliability. Basis:
                legitimate
                interest (Art. 6(1)(f)).</p>

            <h2>3. Use of AI</h2>
            <p>To detect orders, we send the subject, sender and short preview of emails that look order-related to
                Google's
                Gemini API, which acts as our processor. Other emails are not sent. Under Google's paid-services terms
                this
                content is not used to train or improve Google's models. The AI only extracts fields; it makes no
                decision with
                legal or similarly significant effects on you (Art. 22 GDPR), and its results can be wrong.</p>

            <h2>4. Google user data</h2>
            <p>AutoTracker's use and transfer to any other app of information received from Google APIs will adhere to
                the
                <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
                    target="_blank" rel="noreferrer">Google API Services User Data Policy</a>, including the Limited Use
                requirements. No humans read your email data unless you agree, it is not used for advertising, and it is
                not
                used to train generalized AI models. You can revoke access at any time in your Google Account settings.
            </p>

            <h2>5. Retention</h2>
            <p>Order data and your authorization token are kept while your account exists. If you ask us to delete your
                data, we delete it within 30 days. If you revoke access in your Google Account, the stored token stops
                working
                and is deleted together with the rest of your data on request. Technical logs are kept by our hosting
                providers
                for the short periods set by their plans. Data no longer needed is deleted.</p>

            <h2>6. Recipients and international transfers</h2>
            <p>We use Supabase (database, authentication and server functions; region: EU), Vercel (hosting) and
                Google
                (sign-in, Gmail API and Gemini API) as processors under data processing agreements. Where data leaves
                the EEA,
                transfers rely on the EU–US Data Privacy Framework or Standard Contractual Clauses. We do not sell your
                data or
                share it for advertising, including under California law.</p>
            <p>AutoTracker also loads its typeface from Google Fonts. When you visit the site, your browser connects to
                Google's servers to download the font files, so Google receives your IP address and browser information.
                This is done to display the site correctly (legitimate interest, Art. 6(1)(f) GDPR), and we do not
                receive
                or store this information. Google handles it under its own
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.
            </p>
            <h2>7. Your rights</h2>
            <p>You may request access, rectification, erasure, restriction, portability or objection, and withdraw
                consent at
                any time where processing relies on consent. Withdrawing consent does not affect processing carried out
                before.
                To exercise these rights, email <a href="mailto:orimypro7@gmail.com">orimypro7@gmail.com</a>; we will
                reply
                within one month. You may also complain to the Spanish Data Protection Agency (AEPD): <a
                    href="https://www.aepd.es" target="_blank" rel="noreferrer">aepd.es</a>, or, if you are in the UK,
                to the
                Information Commissioner's Office (<a href="https://ico.org.uk" target="_blank"
                    rel="noreferrer">ico.org.uk</a>), or to your local data protection authority.</p>

            <h2>8. Who can use AutoTracker</h2>
            <p>AutoTracker is intended for people aged 18 or over and for use in Spain and the European Economic Area.
                It is
                not directed at children, and we do not knowingly collect their data.</p>

            <h2>9. Security and changes</h2>
            <p>We use proportionate technical and organizational measures to protect personal data, including encrypted
                connections (HTTPS). We may update this policy when the service or legal requirements change and will
                publish
                the new version here.</p>
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
