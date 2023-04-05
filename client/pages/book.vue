<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useAppStore, useAuthStore, useBookStore, useCartStore } from '~/stores';
import { scrollToTop, convertNumbersToPersian } from '~/utils';
import { SERVER_ROUTES } from '~~/constants';
import { TOAST_TYPE_ENUM } from '~~/enums';
import { makeRequest } from '~~/services';

const config = useRuntimeConfig()
const route = useRoute()
const bookStore = useBookStore()
const appStore = useAppStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { loading, book, similarBooks } = storeToRefs(bookStore)
const { isLoggedIn } = storeToRefs(authStore)

onMounted(async () => {
    await getBook(route.query.name + '')
})

watch(() => route.query.name, async () => {
    await getBook(route.query.name + '')
})

const state = reactive({
    imageLoaded: false,
    addingToCart: false,
    showModal: false
})

const getBook = async (name: string) => {
    scrollToTop()
    bookStore.setLoading(true);
    const [{ error, data }, { error: error2, data: data2 }] =
        await Promise.all([
            makeRequest(SERVER_ROUTES.BOOK + "?name=" + name, "GET"),
            makeRequest(SERVER_ROUTES.BOOK + "/" + name + "/similar", "GET"),
        ]);
    if (!error && !error2) {
        bookStore.setBook(data);
        bookStore.setSimilarBooks(data2);
        bookStore.setLoading(false);
    }
}

const addToCart = async () => {
    if (!state.addingToCart) {
        if (isLoggedIn.value) {
            state.addingToCart = true;
            const { error, data } = await makeRequest(SERVER_ROUTES.ADD_TO_CART, "POST", undefined, { id: book.value.id })
            state.addingToCart = false;
            if (!error) {
                cartStore.setCart(data)
                showToast("به سبد خرید اضافه شد.", TOAST_TYPE_ENUM.SUCCESS)
            } else {
                showToast(error.msg)
            }
        } else {
            authStore.setBookUrlBeforeLogin(route.fullPath)
            showToast("لطفا ابتدا وارد شوید.")
            // navigateTo({ path: CLIENT_ROUTES.LOGIN, query: {} })
        }
    }
}

const setImageLoaded = () => {
    state.imageLoaded = true
}

const showModal = (value: boolean) => {
    appStore.setShowModal(value)
    state.showModal = value
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page" v-if="!loading">
        <div class="bookInfo">
            <div class="imageContainer">
                <Icon name="ic:baseline-menu-book" v-if=!book.image />
                <img :src="config.public.API_BASE_URL + '/img/books/' + book.image" @load="setImageLoaded"
                    v-bind:class="{ loaded: state.imageLoaded }" @click="showModal(true)" v-else />
                <Spinner :type="'clip'" size='20px' v-if="!state.imageLoaded" />
                <span class="discount" v-if="book.discount">{{ book.discount &&
                    convertNumbersToPersian(book.discount) }}%</span>
            </div>
            <ul class="info">
                <li>
                    <RowDataItem title="نام" :value=book.name />
                </li>
                <li v-if=book.writers>
                    <RowDataItem title="نویسنده" :value="book.writers || '-'" />
                </li>
                <li v-if=book.authors>
                    <RowDataItem title="مولف" :value="book.authors || '-'" />
                </li>
                <li v-if=book.translators>
                    <RowDataItem title="مترجم" :value="book.translators || '-'" />
                </li>
                <li>
                    <RowDataItem title="انتشارات" :value="book.publisher?.faName || '-'" />
                </li>
                <li>
                    <RowDataItem title="دسته بندی" :value="book.category?.name || '-'" />
                </li>
                <li>
                    <RowDataItem title="سال" :value="book.year && convertNumbersToPersian(book.year.toString())" />
                </li>
                <li>
                    <RowDataItem title="نوبت چاپ" :value="book.round && convertNumbersToPersian(book.round.toString())" />
                </li>
                <li v-if=book.edit>
                    <RowDataItem title="ویراست"
                        :value="book.edit && convertNumbersToPersian(book.edit.toString()) || '-'" />
                </li>
                <li>
                    <RowDataItem title="تعداد صفحه" :value="book.pages && convertNumbersToPersian(book.pages.toString())" />
                </li>
                <li>
                    <!-- <RowDataItem title="قیمت" :value="book.price && book.price.toLocaleString('en-US') + ' تومان'" /> -->
                    <span class="title">قیمت</span>
                    <div class="value">
                        <span class="value price totalAfterDiscount" v-if="book.price && book.discount">{{
                            (book.price - book.price * book.discount / 100).toLocaleString('fa')
                        }}</span>
                        <span class="value price total" v-bind:class="{ lineThrough: book.discount }">{{ book.price ?
                            book.price.toLocaleString('fa') : ''
                        }}</span>
                        <span class="currency">{{ book.price ? "تومان" : "نیاز به تماس" }}</span>
                    </div>
                </li>
            </ul>
            <div class="status">
                <button @click="addToCart" :disabled=state.addingToCart>
                    <span>افزودن به سبد خرید</span>
                    <Icon name="ic:baseline-add-shopping-cart" v-if=!state.addingToCart />
                    <Spinner color="white" v-else />
                </button>
            </div>
        </div>
        <div class="similarItems">
            <ShowList title="محصولات مشابه" :items=similarBooks dir="rtl" />
        </div>
    </div>
    <div class="spinnerContainer" v-else>
        <Spinner />
    </div>
    <Modal v-if="state.showModal" @close="showModal(false)">
        <template v-slot:childComponent>
            <div class="modalContent">
                <img :src="config.public.API_BASE_URL + '/img/books/' + book.image" @load="setImageLoaded"
                    v-bind:class="{ loaded: state.imageLoaded }" />
            </div>
        </template>
    </Modal>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/book.style.scss"
</style>