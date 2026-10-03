<template>
    <main class="document-page not-found-page">
        <p class="eyebrow">AutoTracker</p>
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you requested does not exist or has moved.</p>
        <router-link class="action-link" to="/">Go to the start</router-link>
    </main>
</template>

<style scoped>
.document-page {
    width: min(760px, calc(100% - 2rem));
    min-height: 100dvh;
    margin: 0 auto;
    padding: 5rem 0;
    color: var(--color-text);
}

.not-found-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.eyebrow {
    color: var(--color-accent);
    font-size: var(--fs-sm);
    font-weight: 600;
    letter-spacing: var(--ls-small);
    text-transform: uppercase;
}

h1 {
    margin-top: 1rem;
    color: var(--color-accent);
    font-size: clamp(4rem, 16vw, 9rem);
    line-height: .9;
}

h2 {
    margin-top: 1.25rem;
}

.not-found-page>p:not(.eyebrow) {
    margin-top: .75rem;
    color: var(--color-text-2);
}

.action-link {
    margin-top: 1.5rem;
    padding: .7rem 1rem;
    border-radius: var(--radius-sm);
    background: var(--color-accent);
    color: var(--color-accent-contrast);
    font-weight: 600;
}

.action-link:hover {
    text-decoration: none;
    opacity: .9;
}
</style>
