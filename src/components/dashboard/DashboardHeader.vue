<script setup lang="ts">
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import { AuthService } from '@/services/auth.service';
import type { AppUser } from '@/types/AppUser';
import { ref } from 'vue';
import { onMounted, type Ref } from 'vue';
const userAvatar: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(false)
const authService: AuthService = new AuthService()
onMounted(async () => {
    try {
        isLoading.value = true
        const user: AppUser = await authService.getMe();
        userAvatar.value = user.avatar
        isLoading.value = false;
    } catch (e: any) {
        isLoading.value = false
        console.log(e)
    }
})

/**
 * Handles user logout by using auth service
 * @author Oriol Plazas León
 * @since 16/09/2026
 */
const handleLogout = async () => {
    try {
        await authService.logout();
        window.location.href = '/';
    } catch (e: any) {
        console.log(e)
    }
}
</script>
<template>
    <header>
        <router-link to="/dashboard">
            <h3>Auto<span class="accent">Tracker</span></h3>
        </router-link>
        <span class="empty"></span>
        <aside>
            <ThemeToggle />
            <el-dropdown v-if="!isLoading" trigger="click" @command="handleLogout">
                <img class="avatar" :src="userAvatar" alt="User avatar">
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                width="20" height="20">
                                <path fill="var(--color-text)"
                                    d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" />
                            </svg> Log Out</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <img v-else class="avatar-skeleton" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                alt="Loading user avatar">

        </aside>
    </header>
</template>
<style scoped>
header {
    width: 100%;
    top: 0;
    position: sticky;
    display: flex;
    padding: 1rem 5%;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background: var(--color-bg);
    z-index: 900;
}

header a {
    text-decoration: none;
}

.accent {
    color: var(--color-accent);
}

aside {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

aside img {
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
</style>