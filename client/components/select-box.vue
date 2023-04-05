<script setup lang="ts">

const props = defineProps({
    options: {
        type: Array<{ id: number, name: string }>,
        required: true
    },
    placeholder: {
        type: String,
        required: false
    },
    selected: {
        type: Object,
        required: false
    }
})

const emit = defineEmits(['select'])

const state = reactive({
    showItems: false
})

const showItems = (e) => {
    state.showItems = true;
}

const hideItems = () => {
    state.showItems = false;
}

const select = (e, item: object) => {
    e.stopPropagation()
    emit('select', item)
    hideItems()
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="selectBox">
        <input type="text" :placeholder="props.placeholder" :value="selected?.name" @click="(e) => e.stopPropagation()"
            @focus="showItems">
        <ul class="options" v-bind:class="{ visible: state.showItems }">
            <li v-for="option in props.options" @click="(e) => { select(e, option) }">
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/select-box.style.scss";
</style>