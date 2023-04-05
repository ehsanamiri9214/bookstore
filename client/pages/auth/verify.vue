<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { CLIENT_ROUTES, SERVER_ROUTES } from '~/constants';
import { useAuthStore, useUserStore, useCartStore } from '~/stores';
import { makeRequest } from '~~/services';
import { scrollToTop } from '~/utils'

const authStore = useAuthStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const { phone, verificationCode, loading } = storeToRefs(authStore)

onMounted(() => {
    scrollToTop()
})

const validate = () => {
    const result = verificationCode.value.length === 5
    authStore.setVerificationCodeValidation(result)
}

const submit = async () => {
    if (loading.value !== true) {
        authStore.setLoading(true)
        const { error, data } = await makeRequest(SERVER_ROUTES.VERIFY, "POST", undefined, { phone: phone.value, code: verificationCode.value })
        if (!error) {
            await setCookie('accessToken', data.accessToken)
            await setCookie('refreshToken', data.refreshToken)
            authStore.setLoggedIn(true)
            if (authStore.bookUrlBeforeLogin.length > 0) {
                navigateTo(authStore.bookUrlBeforeLogin)
            } else {
                navigateTo({ path: CLIENT_ROUTES.HOME, query: {} })
            }
            getMe()
            getCart()
        } else {
            showToast(error.msg)
        }
        authStore.setLoading(false)
    }
}

const getMe = async () => {
    const { error, data } = await makeRequest(SERVER_ROUTES.ME, "GET")
    if (!error) {
        userStore.setUser(data)
    } else {
        showToast(error.msg)
    }
}

const getCart = async () => {
    const { error, data } = await makeRequest(SERVER_ROUTES.CART, "GET")
    if (!error) {
        cartStore.setCart(data)
    } else {
        showToast(error.msg)
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <div class="cardContainer">
            <div class="card">
                <div class="top">
                    <NuxtLink :to="CLIENT_ROUTES.LOGIN">تغییر شماره موبایل</NuxtLink>
                    <p>کد تایید به شماره {{ phone }} ارسال شد.</p>
                </div>
                <form @submit.prevent="submit">
                    <input type="tel" placeholder="کد تایید" lang="en" required autofocus v-model="verificationCode"
                        @change="validate">
                    <button>
                        <span v-if="!loading">ارسال</span>
                        <Spinner color="white" v-if="loading" />
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/auth/verify.style.scss"
</style>