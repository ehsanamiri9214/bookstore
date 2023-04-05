<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useHeaderStore } from '~/stores';

const headerStore = useHeaderStore()
const { categories, universityTabIndex } = storeToRefs(headerStore)

const setActiveTab = (i: number) => {
    headerStore.setUniversityTabIndex(i)
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="sub-category sub3">
        <ul class="subCategories">
            <li v-for="(subCategory, index) in categories[2].items" :key="index">
                <ul>
                    <li class="head" v-bind:class="{ active: universityTabIndex === index }"
                        @mouseover="setActiveTab(index)">
                        <NuxtLink :to="'search?category=' + subCategory.name">
                            <span>{{ subCategory.name }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="subCategoryItems">
            <li v-for="item in categories[2].items[universityTabIndex].items">
                <NuxtLink :to="'search?category=' + item.name">
                    <span>{{ item.name }}</span>
                </NuxtLink>
            </li>
        </ul>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/components/sub-category/sub-category-3.style.scss"</style>