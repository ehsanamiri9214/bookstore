<script setup lang="ts">

import { scrollToTop } from '~/utils'

onMounted(() => {
    scrollToTop()
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <p>Orders page.</p>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/user/orders.style.scss"
</style>