<script setup lang="ts">

import { CLIENT_ROUTES } from '~~/constants'

const props = defineProps({
    item: { type: Object, required: true },
})

const goToWriterPage = () => {
    navigateTo({ path: CLIENT_ROUTES.BOOK, query: { name: 'math' } })
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="writer-row" @click="goToWriterPage">
        <img src="/img/banner/1.png" alt="">
        <p>{{ item.firstName + ' ' +item.lastName }}</p>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/writer-row.style.scss"
</style>