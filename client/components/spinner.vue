<script setup lang="ts">

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

const props = defineProps({
    size: { type: String, required: false },
    color: { type: String, required: false },
    type: { type: String, required: false }
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <span class="spinner">
        <pulse-loader :size="size || '10px'" :color=color :loading="true" v-if="!type" />
        <clip-loader :size="size || '10px'" :color="color" :loading="true" v-else="type === 'clip'" />
    </span>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/components/spinner.style.scss"</style>