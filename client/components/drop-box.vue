<script setup lang="ts">

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

const state = reactive({
    showItems: false
})

const openItems = () => {
    state.showItems = !state.showItems;
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="box" v-bind:class="{ showItems: state.showItems }">
        <div class="top" @click="openItems">
            <Icon name="ic:baseline-keyboard-arrow-down" v-if="!state.showItems" />
            <Icon name="ic:baseline-keyboard-arrow-up" v-else />
            <p>{{ props.name }}</p>
        </div>
        <div class="items"></div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/drop-box.style.scss"
</style>