<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~/constants'
import { useEditUserStore, useUserStore } from '~/stores'
import { TOAST_TYPE_ENUM } from '~~/enums'
import { makeRequest } from '~~/services'

const editUserStore = useEditUserStore()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { newData } = storeToRefs(editUserStore)

const emit = defineEmits(['close'])

onMounted(() => {
    fillDefault()
})

const state = reactive({
    loading: false
})

const fillDefault = () => {
    newData.value.firstName = user.value.firstName;
    newData.value.lastName = user.value.lastName;
}

const submit = async () => {
    if (!state.loading) {
        state.loading = true
        const { error, data } = await makeRequest(SERVER_ROUTES.USER, "PUT", undefined, { firstName: newData.value.firstName, lastName: newData.value.lastName })
        if (!error) {
            userStore.setUser(data)
            // navigateTo({ path: CLIENT_ROUTES.USER_DETAILS, query: {} })
            showToast("اطلاعات با موفقیت ثبت شد.", TOAST_TYPE_ENUM.SUCCESS)
            emit('close')
        } else {
            showToast(error.msg)
        }
        state.loading = false
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="modalContent">
        <p>لطفا اطلاعات خود را تکمیل کنید.</p>
        <form @submit.prevent="submit">
            <div class="formItem">
                <input type="text" placeholder="نام" required autofocus v-model="newData.firstName" id="firstName">
                <label for="firstName">نام</label>
            </div>
            <div class="formItem">
                <input type="text" placeholder="نام خانوادگی" required v-model="newData.lastName" id="lastName">
                <label for="lastName">نام خانوادگی</label>
            </div>
            <button>
                <span v-if="!state.loading">ثبت</span>
                <Spinner color="white" v-else />
            </button>
        </form>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/modals/user-info.modal.style.scss"</style>