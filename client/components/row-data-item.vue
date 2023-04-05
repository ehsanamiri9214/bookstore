<script setup lang="ts">

const props = defineProps({
    icon: { type: String, required: false },
    title: { type: String, required: false },
    value: { type: String, required: false },
    ltrDir: { type: Boolean }
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="row-data-item">
        <Icon :name="icon || ''" />
        <span class="title">{{ title }}</span>
        <span class="value" v-bind:class="{ ltr: ltrDir }">{{ value }}</span>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/row-data-item.style.scss"
</style>