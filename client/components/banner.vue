<script setup lang="ts">

import { Carousel, Navigation, Slide } from 'vue3-carousel'

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const breakpoints = {
    700: {
        // itemsToShow: 1.1,
    },
    1024: {
        // itemsToShow: 1,
    },
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <section class="banner">
        <carousel :items-to-show=1.1 :autoplay=4000 :transition=2000 :pause-autoplay-on-hover=true :wrapAround=true
            dir="rtl" :breakpoints="breakpoints" :mouse-drag=true :touch-drag=true>
            <slide v-for="slide in items" :key=slide>
                <div class="carousel__item">
                    <Banner-item :item=slide />
                </div>
            </slide>
            <template #addons>
                <navigation />
            </template>
        </carousel>
    </section>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss">
@import 'vue3-carousel/dist/carousel.css';
@import "@/assets/styles/components/banner.style.scss"
</style>