<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useAuthStore, useUserStore } from '~/stores'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~~/constants'
import { makeRequest } from '~~/services'

const userStore = useUserStore()
const authStore = useAuthStore()
const { user } = storeToRefs(userStore)
const { isLoggedIn } = authStore

onMounted(async () => {
    scrollToTop()
    if (!isLoggedIn) {
        navigateTo({ path: CLIENT_ROUTES.LOGIN, query: {} })
    } else {
        if (!user.value.id) {
            const { error, data: user } = await makeRequest(SERVER_ROUTES.ME, "GET")
            if (!error) {
                userStore.setUser(user)
                navigateTo({ path: CLIENT_ROUTES.USER_DETAILS, query: {} })
            } else {
                await removeCookie("accessToken")
                await removeCookie("refreshToken")
                authStore.setLoggedIn(false)
                navigateTo({ path: CLIENT_ROUTES.LOGIN, query: {} })
            }
        }
    }
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <div class="menu">
            <ul>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.USER_DETAILS" activeClass="active">
                        <Icon name="ic:baseline-person-outline" />
                        <span>
                            اطلاعات
                        </span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.USER_ORDERS" activeClass="active">
                        <Icon name="ic:outline-shopping-bag" />
                        <span>
                            سفارش ها
                        </span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.USER_EDIT" activeClass="active">
                        <Icon name="ic:outline-edit" />
                        <span>
                            ویرایش اطلاعات
                        </span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.USER_LOGOUT" activeClass="active">
                        <Icon name="ic:baseline-logout" />
                        <span>
                            خروج
                        </span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="details">
            <NuxtPage />
        </div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/user/user.style.scss"
</style>