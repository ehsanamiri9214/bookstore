<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~/constants'
import { useAuthStore } from '~/stores'
import { Validator } from '~/utils'
import { makeRequest } from '~~/services'
import { scrollToTop } from '~/utils'

const authStore = useAuthStore()
const { isPhoneValid, phone, loading, showError: err } = storeToRefs(authStore)

onMounted(() => {
    scrollToTop()
})

const change = () => {
    if (err) authStore.setShowError(false)
}

const validate = () => {
    const result = Validator.validatePhone(convertNumbersToEnglish(phone.value))
    authStore.setPhoneValidation(result)
    authStore.setShowError(result)
}

const submit = async () => {
    validate()
    if (!isPhoneValid.value) {
        authStore.setShowError(true)
    } else {
        authStore.setShowError(false)
        if (loading.value !== true) {
            authStore.setLoading(true)
            const { error } = await makeRequest(SERVER_ROUTES.LOGIN, "POST", undefined, { phone: authStore.phone })
            if (!error) {
                navigateTo({ path: CLIENT_ROUTES.VERIFY, query: {} })
            } else {
                showToast(error.msg)
            }
            authStore.setLoading(false)
        }
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <div class="cardContainer">
            <div class="card">
                <form @submit.prevent="submit">
                    <input type="tel" placeholder="شماره موبایل" lang="en" required autofocus v-model="phone"
                        @keypress="change">
                    <button>
                        <span v-if="!loading">ورود | ثبت نام</span>
                        <Spinner color="white" v-else />
                    </button>
                    <p class="error" v-if="err">شماره تلفن وارد شده معتبر نیست.</p>
                </form>
            </div>
        </div>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/pages/auth/login.style.scss"</style>