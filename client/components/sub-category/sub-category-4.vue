<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useHeaderStore } from '~/stores';

const headerStore = useHeaderStore()
const { categories } = storeToRefs(headerStore)

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="sub-category sub4">
        <ul>
            <li>
                <ul>
                    <li v-for="item in categories[3].items">
                        <NuxtLink :to="'search?category=' + item">
                            <span>{{ item }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </li>
            <li></li>
            <li></li>
        </ul>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/components/sub-category/sub-category-4.style.scss"</style>