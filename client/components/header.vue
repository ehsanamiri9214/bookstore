<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~/constants'
import { useAppStore, useAuthStore, useHeaderStore, useCartStore } from '~/stores'
import { THEME_ENUM } from '~~/enums'
import { makeRequest } from '~~/services'

const appStore = useAppStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const headerStore = useHeaderStore()
const { resultsBoxStatus, showDrawer } = storeToRefs(appStore)
const { isLoggedIn } = storeToRefs(authStore)
const { leftDir, loading, searchPhrase, searchResults } = storeToRefs(headerStore)
const { cart } = storeToRefs(cartStore)

const setDrawer = (value: boolean) => {
    appStore.setShowDrawer(value)
}

const showResultsBox = (value: boolean) => {
    appStore.setResultsBoxStatus(value)
}

const switchTheme = async () => {
    const colorMode = useColorMode()
    const themeCookie = await getCookie('theme')
    if (themeCookie) {
        const newTheme = themeCookie === THEME_ENUM.DARK ? THEME_ENUM.LIGHT : THEME_ENUM.DARK
        colorMode.preference = newTheme
        await setCookie('theme', newTheme)
    } else {
        await setCookie('theme', 'dark')
    }
}

const goToCartPage = async () => {
    if (!isLoggedIn.value) {
        navigateTo({ path: CLIENT_ROUTES.LOGIN, query: {} })
    } else {
        navigateTo({ path: CLIENT_ROUTES.CART, query: {} })
    }
}

const goToUserPage = async () => {
    if (!isLoggedIn.value) {
        navigateTo({ path: CLIENT_ROUTES.LOGIN, query: {} })
    } else {
        navigateTo({ path: CLIENT_ROUTES.USER_DETAILS, query: {} })
    }
}

const goToSearchPage = async () => {
    if (searchPhrase.value.length > 0) {
        navigateTo({ path: CLIENT_ROUTES.SEARCH, query: { phrase: searchPhrase.value } })
        showResultsBox(false)
    }
}

const search = async (e) => {
    if (e.key === 'Escape') {
        showResultsBox(false)
    } else {
        if (e.key !== 'Enter' && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.target.value !== '') {
            headerStore.setSearchPhrase(e.target.value)
            headerStore.setDir(searchPhrase.value.length > 0 && startsWithEnglish(searchPhrase.value))
            showResultsBox(searchPhrase.value.length > 0)
            headerStore.setLoading(true)
            const { error, data } = await makeRequest(SERVER_ROUTES.SEARCH, "POST", undefined, { searchPhrase: searchPhrase.value })
            headerStore.setLoading(false)
            if (!error) headerStore.setSearchResults(data)
        }
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <header>
        <div>
            <!-- <button @click="switchTheme">
                                <Icon name="ic:baseline-brightness-6" />
                            </button> -->
            <button @click="goToCartPage">
                <Icon name="ic:outline-shopping-cart" />
                <span v-if="cart.items.length > 0">{{ cart.items.length }}</span>
            </button>
            <button @click="goToUserPage">
                <Icon name="ic:baseline-person-outline" />
            </button>
        </div>
        <div @click="(e) => { e.stopImmediatePropagation() }">
            <form @submit.prevent="goToSearchPage">
                <button type="submit">
                    <Icon name="ic:baseline-search" />
                </button>
                <input type="text" @keyup="search" v-bind:class="{ leftDir }"
                    v-bind:placeholder="!leftDir ? 'جستجوی کتاب، نویسنده، ناشر ...' : ''">
            </form>
            <div class="results" v-if="resultsBoxStatus">
                <div class="top">
                    <button @click="() => {
                        showResultsBox(false)
                    }">
                        <Icon name="ic:baseline-close" />
                    </button>
                </div>
                <div class="itemsContainer">
                    <div class="spinnerContainer" v-if="loading">
                        <Spinner />
                    </div>
                    <p class="notFound" v-if="!loading && headerStore.noResults">نتیجه ای یافت نشد!</p>
                    <div class="items" v-if="!loading && !headerStore.noResults && headerStore.searchResults.length">
                        <ul v-if="!loading">
                            <li v-for="item in searchResults" @click="() => {
                                showResultsBox(false)
                            }">
                                <BookRow :item=item />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <NuxtLink :to="CLIENT_ROUTES.HOME">
                <p>فروشگاه کتاب دیبا</p>
                <img src="/img/logo.png" alt="">
            </NuxtLink>
        </div>
        <div>
            <button id="menu" @click="() => { setDrawer(true) }">
                <Icon name="ic:baseline-menu" />
            </button>
        </div>
    </header>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/header.style.scss"
</style>