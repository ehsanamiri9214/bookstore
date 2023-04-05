<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useAppStore, useAuthStore, useUserStore, useCartStore } from '~/stores'
import { SERVER_ROUTES } from '~~/constants';
import { makeRequest } from '~~/services/http.service';

const appStore = useAppStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const { isAppReady, showModal, resultsBoxStatus } = storeToRefs(appStore)

onMounted(async () => {
  const accessTokenCookie = useCookie('accessToken')
  const refreshTokenCookie = useCookie('refreshToken')
  if (accessTokenCookie.value && refreshTokenCookie.value) {
    authStore.setLoggedIn(true)
    await getMe()
    await getCart()
  }
  setTheme()
  appStore.setAppStatus(true)
})

const setTheme = async () => {
  const colorMode = useColorMode()
  const themeCookie = await getCookie('theme')
  if (themeCookie) {
    colorMode.preference = themeCookie
  }
}

const showResultsBox = (value: boolean) => {
  appStore.setResultsBoxStatus(value)
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
    // showToast(error.msg)
  }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
  <div id="app" v-bind:class="{ showResultBox: resultsBoxStatus, hideScrolls: showModal }">
    <Header v-if="isAppReady" @click="() => { showResultsBox(false) }" />
    <Categories-bar v-if="isAppReady" @click="() => { showResultsBox(false) }" />
    <main @click="() => { showResultsBox(false) }">
      <NuxtLoadingIndicator v-if="isAppReady" />
      <NuxtPage v-if="isAppReady" />
      <div class="spinnerContainer" v-if="!isAppReady">
        <Spinner />
      </div>
    </main>
    <Footer v-if="isAppReady" />
    <div class="overlay" @click="showResultsBox(false)"></div>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss">@import "./assets/styles/main.scss"</style>