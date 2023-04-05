<script setup lang="ts">

import { CLIENT_ROUTES } from '~~/constants'
import { convertNumbersToPersian } from '~~/utils'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const state = reactive({
    imageLoaded: false
})

const config = useRuntimeConfig()

const goToTarget = () => {
    navigateTo({ path: CLIENT_ROUTES.BOOK, query: { name: props.item.name }, force: true })
}

const setImageLoaded = () => {
    state.imageLoaded = true;
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="book" @click="goToTarget">
        <div class="imageContainer" v-bind:class="{ noImage: !item.image }">
            <Icon name="ic:baseline-menu-book" v-if=!item.image />
            <img :src="config.public.API_BASE_URL + '/img/books/' + item.image" :alt=item.name @load="setImageLoaded"
                v-bind:class="{ loaded: state.imageLoaded }" v-else>
            <Spinner :type="'clip'" size='20px' v-if="!state.imageLoaded" />
            <span class="discount" v-if="item.discount">{{ item.discount && convertNumbersToPersian(item.discount)
            }}%</span>
        </div>
        <ul class="info">
            <li>
                <div class="row-data-item">
                    <span class="name">{{ item.name }}</span>
                </div>
            </li>
            <li>
                <div class="row-data-item">
                    <span class="value price total" v-bind:class="{ lineThrough: item.discount }">{{ item.price ?
                        item.price.toLocaleString('fa') : ''
                    }}</span>
                    <span class="value price totalAfterDiscount" v-if="item.price && item.discount">{{
                        (item.price - item.price * item.discount /
                            100).toLocaleString('fa')
                    }}</span>
                    <span class="currency">{{ item.price ? "تومان" : "نیاز به تماس" }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/book.style.scss"
</style>