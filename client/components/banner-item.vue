<script setup lang="ts">

import { CLIENT_ROUTES } from '~~/constants'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const config = useRuntimeConfig()

const goToTarget = () => {
    // navigateTo({ path: CLIENT_ROUTES.SEARCH, query: {} })
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="banner-item" @click="goToTarget">
        <img :src="config.public.API_BASE_URL + '/' + item.img" alt="">
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/banner-item.style.scss"
</style>