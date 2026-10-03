<script setup lang="ts">
import LoginWithGoogleButton from '@/components/login/LoginWithGoogleButton.vue';
import ThemeToggle from '@/components/shared/ThemeToggle.vue';
import { AuthService } from '@/services/auth.service';
import { type Ref, ref } from 'vue';
const authService: AuthService = new AuthService();
const loginLoading: Ref<boolean> = ref(false)
const loginError: Ref<boolean> = ref(false)
const loginErrorMsg: Ref<string> = ref('')

/**
 * Handles google login by using authService
 * @author Oriol Plazas León
 * @since 13/09/2026
 */
const handleGoogleLogin = async () => {
    try {
        // Reset ux ui variables
        loginError.value = false;
        loginErrorMsg.value = '';
        loginLoading.value = true;
        await authService.loginWithGoogle();
    } catch (e: any) {
        // Set error ux variables to true
        loginError.value = true;
        loginErrorMsg.value = e.message;
    } finally {
        loginLoading.value = false;
    }
}
</script>

<template>
    <main>
        <ThemeToggle class="themeToggle" />
        <div class="text">
            <h1>AutoTracker</h1>
            <h4>Track your orders automatically, from your inbox. </h4>
        </div>
        <div class="login">
            <div class="loginText">
                <h4>Welcome back</h4>
                <p>Sign in to continue to autotracker</p>
            </div>
            <div class="loginButton">
                <LoginWithGoogleButton @handle-google-login="handleGoogleLogin" :login-loading="loginLoading" />
                <span class="errorMsg" v-if="!loginError">{{ loginErrorMsg }}</span>
            </div>
            <p class="login-terms">
                By continuing, you agree to our
                <router-link to="/terms">Terms</router-link> and
                <router-link to="/privacy">Privacy Policy</router-link>.
            </p>
        </div>
    </main>
</template>

<style scoped>
main {
    min-height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--sp-7);
    padding: var(--sp-6) var(--sp-4);
}

.text {
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

.login {
    background-color: var(--color-surface);
    border: solid 2px var(--color-border);
    border-radius: var(--radius-md);
    width: 800px;
    max-width: 90%;
    padding: 2rem 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.loginButton {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loginText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.themeToggle {
    position: absolute;
    top: 40px;
    right: 40px;
}
</style>