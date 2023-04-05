<script setup lang="ts">

import { CLIENT_ROUTES } from '~~/constants'

const props = defineProps({
    item: { type: Object, required: true },
})

const goToPublisherPage = () => {
    navigateTo({ path: CLIENT_ROUTES.BOOK, query: { name: 'math' } })
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="publisher-row" @click="goToPublisherPage">
        <img src="/img/banner/1.png" alt="">
        <p>{{ item.name }}</p>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/publisher-row.style.scss"
</style>