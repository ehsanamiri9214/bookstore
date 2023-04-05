<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~/constants'
import { useEditUserStore, useUserStore } from '~/stores'
import { scrollToTop } from '~/utils'
import { TOAST_TYPE_ENUM } from '~~/enums'
import { makeRequest } from '~~/services'

const editUserStore = useEditUserStore()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { newData, loading } = storeToRefs(editUserStore)

onMounted(() => {
    scrollToTop()
    fillDefault()
})

const fillDefault = () => { 
    newData.value.firstName=user.value.firstName;
    newData.value.lastName=user.value.lastName;
}

const submit = async () => {
    if (loading.value !== true) {
        editUserStore.setLoading(true)
        const { error, data } = await makeRequest(SERVER_ROUTES.USER, "PUT", undefined, { firstName: newData.value.firstName, lastName: newData.value.lastName })
        if (!error) {
            userStore.setUser(data)
            navigateTo({ path: CLIENT_ROUTES.USER_DETAILS, query: {} })
            showToast("اطلاعات با موفقیت ویرایش شد.", TOAST_TYPE_ENUM.SUCCESS)
        } else {
            showToast(error.msg)
        }
        editUserStore.setLoading(false)
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <form @submit.prevent="submit">
            <input type="text" placeholder="نام" required autofocus v-model="newData.firstName" />
            <input type="text" placeholder="نام خانوادگی" required v-model="newData.lastName" />
            <button>
                <span v-if="!loading">ثبت</span>
                <Spinner color="white" v-else />
            </button>
        </form>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/pages/user/edit.style.scss"</style>