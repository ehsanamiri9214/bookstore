<script setup lang="ts">

import { Carousel, Navigation, Slide } from 'vue3-carousel'

const props = defineProps({
    items: {
        type: Array,
        required: false
    },
    title: {
        type: String
    },
    dir: {
        type: String
    },
    autoPlay: {
        type: Number,
    }
})

const localAutoPlay = 4000 + Math.floor(Math.random() * 2000)

const breakpoints = {
    200: {
        itemsToShow: 1.5,
    },
    400: {
        itemsToShow: 1.95,
    },
    600: {
        itemsToShow: 2.75,
    },
    750: {
        itemsToShow: 3.5,
    },
    900: {
        itemsToShow: 4.5,
    },
    1024: {
        itemsToShow: 5.15,
    },
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <section class="show-list">
        <div class="header">
            <!-- <NuxtLink to="/category">بیشتر</NuxtLink> -->
            <p>{{ title }}</p>
        </div>
        <div class="items">
            <carousel :items-to-show=5 :autoplay="autoPlay || localAutoPlay" :transition=2000 :pause-autoplay-on-hover=true
                :wrapAround=true :dir=dir :breakpoints="breakpoints">
                <slide v-for="item in items" :key="item">
                    <div class="carousel__item">
                        <Book :item=item />
                    </div>
                </slide>
                <template #addons>
                    <navigation />
                </template>
            </carousel>
        </div>
</section>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss">@import "@/assets/styles/components/show-list.style.scss"</style>