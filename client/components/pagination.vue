<script setup lang="ts">

const props = defineProps({
    length: {
        type: Number,
        required: true
    },
    active: {
        type: Number,
        required: true
    }
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <ul class="pagination">
        <li v-for="i in length" :key="i" v-bind:class="{ active: i === props.active }" @click="$emit('change', i)">
            <span>{{ convertNumbersToPersian(i.toString()) }}</span>
        </li>
    </ul>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/pagination.style.scss"
</style>