<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useHeaderStore } from '~/stores';

const headerStore = useHeaderStore()
const { categories } = storeToRefs(headerStore)

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="sub-category sub1">
        <ul>
            <li v-for="subCategory in categories[0].items">
                <ul>
                    <li class="head">
                        <NuxtLink :to="'search?category=' + subCategory.name">
                            <span>{{ subCategory.name }}</span>
                        </NuxtLink>
                    </li>
                    <li v-for="item in subCategory.items">
                        <NuxtLink :to="'search?category=' + item">
                            <span>{{ item }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/components/sub-category/sub-category-1.style.scss"</style>