<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useSearchStore } from '~/stores'
import { SERVER_ROUTES } from '~~/constants';
import { makeRequest } from '~~/services';

const route = useRoute()
const searchStore = useSearchStore()
const { loading, searchPhrase, searchDetails, searchResults, activeItems, activePageIndex, numberOfItemsPerPage } = storeToRefs(searchStore)

onMounted(async () => {
    scrollToTop()
    if (route.query.phrase !== searchPhrase.value) {
        await search()
    }
})

watch(() => route.query.phrase, async () => {
    await search()
})

const search = async () => {
    searchStore.setSearchPhrase(route.query.phrase + '')
    searchStore.setLoading(true)
    const { error, data } = await makeRequest(SERVER_ROUTES.SEARCH, "POST", undefined,
        { searchPhrase: searchPhrase.value, searchDetails: searchDetails.value })
    if (!error) {
        searchStore.setSearchResults(data)
        setActivePageIndex(1)
        updateActiveItems()
    }
    else {
        showToast(error.msg)
    }
    searchStore.setLoading(false)
}

const setActivePageIndex = (index: number) => {
    searchStore.setActivePageIndex(index)
    updateActiveItems()
    scrollToTop()
}

const updateActiveItems = () => {
    if (searchResults.value.length > numberOfItemsPerPage.value) {
        const activeItems = searchResults.value.slice((activePageIndex.value - 1) * numberOfItemsPerPage.value, activePageIndex.value * numberOfItemsPerPage.value)
        searchStore.setActiveItems(activeItems)
    } else {
        searchStore.setActiveItems(searchResults.value)
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <div class="results">
            <div class="sortItems">
                <ul>
                    <li>
                        <button>پربازدید ترین</button>
                    </li>
                    <li>
                        <button>بالاترین تخفیف</button>
                    </li>
                    <li>
                        <button>ارزان ترین</button>
                    </li>
                    <li>
                        <button>گران ترین</button>
                    </li>
                </ul>
            </div>
            <div class="items">
                <Spinner v-if="loading" />
                <p class="notFound" v-if="!loading && searchResults.length === 0">نتیجه ای یافت نشد!</p>
                <ul v-if="!loading && searchResults.length > 0">
                    <li v-for="item in activeItems" :key=item.id>
                        <Book :item=item />
                    </li>
                </ul>
            </div>
            <div class="paginationHolder" v-if="!loading && searchResults.length > 0">
                <Pagination :length="Math.ceil(searchResults.length / numberOfItemsPerPage)" :active=activePageIndex @change="setActivePageIndex" />
            </div>
        </div>
        <div class="categories">
            <ul>
                <li>
                    <DropBox name="انتشارات" />
                </li>
                <li>
                    <DropBox name="رشته" />
                </li>
                <li>
                    <DropBox name="مقطع" />
                </li>
            </ul>
        </div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/search.style.scss"
</style>