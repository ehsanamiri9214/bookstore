<script setup lang="ts">

import { CLIENT_ROUTES } from '~/constants'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores'
import { scrollToTop } from '~/utils'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(() => {
    scrollToTop()
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <ul>
            <li>
                <RowDataItem icon="ic:baseline-person-outline" title="نام" :value="user.firstName || '-'" />
            </li>
            <li>
                <RowDataItem icon="ic:baseline-person-outline" title="نام خانوادگی" :value="user.lastName || '-'" />
            </li>
            <li>
                <RowDataItem icon="ic:outline-phone-enabled" title="تلفن"
                    :value="user.phone && convertNumbersToPersian(user.phone) || '-'" />
            </li>
            <li>
                <NuxtLink :to="CLIENT_ROUTES.USER_EDIT">
                    <p>ویرایش اطلاعات</p>
                </NuxtLink>
            </li>
        </ul>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/pages/user/details.style.scss"</style>