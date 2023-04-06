<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { CLIENT_ROUTES, SERVER_ROUTES } from '~/constants';
import { useHeaderStore } from '~/stores';
import { makeRequest } from '~~/services';

const headerStore = useHeaderStore()
const { categories, subCategoryIndex } = storeToRefs(headerStore)

const setSubCategoryIndex = (index: number) => {
    headerStore.setSubCategoryIndex(index);
}

onMounted(async () => {
    const { error, data } = await makeRequest(SERVER_ROUTES.CATEGORIES)
    if (!error) {
        headerStore.setUniversityFields(data)
    }
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="categoriesBar">
        <ul>
            <li>
                <NuxtLink :to="CLIENT_ROUTES.SEARCH">
                    <span>کتب دست دو</span>
                    <Icon name="ic:round-published-with-changes" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="CLIENT_ROUTES.SEARCH">
                    <span>لوازم جانبی</span>
                    <Icon name="ic:baseline-coffee" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="CLIENT_ROUTES.SEARCH">
                    <span>لوازم التحریر</span>
                    <Icon name="ic:baseline-signal-cellular-0-bar" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="CLIENT_ROUTES.WRITERS">
                    <span>نویسندگان</span>
                    <Icon name="ic:outline-people" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="CLIENT_ROUTES.PUBLISHERS">
                    <span>انتشارات</span>
                    <Icon name="ic:baseline-library-books" />
                </NuxtLink>
            </li>
            <li>
                <span>دسته بندی ها</span>
                <Icon name="ic:baseline-menu" />
                <div class="categoriesContainer">
                    <div class="categories">
                        <div class="left">
                            <SubCategory1 v-if="subCategoryIndex === 0" />
                            <SubCategory2 v-if="subCategoryIndex === 1" />
                            <SubCategory3 v-if="subCategoryIndex === 2" />
                            <SubCategory4 v-if="subCategoryIndex === 3" />
                            <SubCategory5 v-if="subCategoryIndex === 4" />
                            <SubCategory6 v-if="subCategoryIndex === 5" />
                        </div>
                        <div class="right">
                            <ul>
                                <li v-for="(category, index) in categories" :key="index"
                                    v-bind:class="{ selected: index === subCategoryIndex }"
                                    @click="setSubCategoryIndex(index)">
                                    <NuxtLink :to="'/search?category=' + category.name">
                                        <span>
                                            {{ category.name }}
                                        </span>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/components/categories-bar.style.scss"</style>