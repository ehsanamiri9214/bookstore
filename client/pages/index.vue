<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useAppStore } from '~/stores'
import { SERVER_ROUTES } from '~~/constants'
import { makeRequest } from '~~/services'

const appStore = useAppStore()
const { loading, feed } = storeToRefs(appStore)

onMounted(async () => {
    scrollToTop()
    if (feed.value.banners.length === 0) {
        appStore.setLoading(true)
        const { error, data } = await makeRequest(SERVER_ROUTES.HOME, "GET")
        if (!error) {
            appStore.setFeed(data)
            appStore.setLoading(false)
        } else {
            showToast(error.msg)
        }
    }
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <div class="page-item" v-if="!loading">
            <Banner :items=feed.banners />
        </div>
        <div class="page-item" v-if="!loading">
            <ShowList :items="feed.books?.mostViewed" title="پربازدیدترین ها" dir="rtl" />
        </div>
        <div class="page-item" v-if="!loading">
            <ShowList :items="feed.books?.newest" title="جدیدترین ها" dir="ltr" />
        </div>
        <div class="page-item" v-if="!loading">
            <ShowList :items="feed.books?.highestDiscount" title="بالاترین تخفیف ها" dir="rtl" />
        </div>
        <div class="page-item" v-if="!loading">
            <ShowList :items="feed.books?.selected" title="منتخب" dir="ltr" />
        </div>
        <div class="spinnerContainer" v-if="loading">
            <Spinner />
        </div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/home.style.scss"
</style>