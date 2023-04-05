<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useAuthStore, useCartStore } from '~/stores'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~~/constants'
import { TOAST_TYPE_ENUM } from '~~/enums';
import { makeRequest } from '~~/services'
import { scrollToTop } from '~/utils'

onMounted(() => {
    scrollToTop()
})

const authStore = useAuthStore()
const cartStore = useCartStore()
const { loggingOut: loading } = storeToRefs(authStore)

const logout = async () => {
    authStore.setLoggingOut(true);
    const { error } = await makeRequest(SERVER_ROUTES.LOGOUT, "POST")
    if (!error) {
        await removeCookie("accessToken")
        await removeCookie("refreshToken")
        authStore.logout()
        cartStore.reset()
        authStore.setLoggingOut(false)
        navigateTo({ path: CLIENT_ROUTES.LOGIN, query: {} })
        showToast('خروج موفقیت آمیز.', TOAST_TYPE_ENUM.SUCCESS)
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <button @click="logout">
            <span v-if="!loading">
                خروج از حساب کاربری
            </span>
            <Icon name="ic:baseline-logout" v-if="!loading" />
            <Spinner color="white" v-if="loading" />
        </button>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/user/logout.style.scss"
</style>