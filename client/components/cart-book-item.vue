<script setup lang="ts">

import { CLIENT_ROUTES, SERVER_ROUTES } from '~~/constants';
import { convertNumbersToPersian } from '~~/utils';
import { makeRequest } from '~~/services';
import { useCartStore } from '~~/stores';
import { stat } from 'fs';

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const config = useRuntimeConfig()

const cartStore = useCartStore()

const state = reactive({
    imageLoaded: false,
    increasing: false,
    decreasing: false,
    removed: false
})

const setImageLoaded = () => {
    state.imageLoaded = true;
}

const goToBookPage = () => {
    navigateTo({ path: CLIENT_ROUTES.BOOK, query: { name: props.item.name } })
}

const add = async () => {
    if (!state.increasing && !state.decreasing) {
        state.increasing = true
        const { error, data } = await makeRequest(SERVER_ROUTES.ADD_TO_CART, "POST", undefined, { id: props.item.id })
        state.increasing = false
        if (!error) {
            cartStore.setCart(data)
        } else {
            showToast(error.msg)
        }
    }
}

const remove = async () => {
    if (!state.increasing && !state.decreasing) {
        state.decreasing = true
        const { error, data } = await makeRequest(SERVER_ROUTES.REMOVE_FROM_CART, "POST", undefined, { id: props.item.id })
        state.decreasing = false
        if (!error) {
            if (props.amount === 1) {
                state.removed = true;
                setTimeout(() => {
                    cartStore.setCart(data)
                }, 500);
            } else {
                cartStore.setCart(data)
            }
        } else {
            showToast(error.msg)
        }
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="cart-book-item" v-bind:class="{ removed: state.removed }">
        <div class="utils">
            <button @click="add">
                <Icon name="ic:baseline-add" v-if="!state.increasing" />
                <Spinner :type="'clip'" size='20px' v-else />
            </button>
            <span>{{ amount.toLocaleString('fa') }}</span>
            <button @click="remove">
                <Icon name="ic:baseline-minus" v-if="!state.decreasing" />
                <Spinner :type="'clip'" size='20px' v-else />
            </button>
        </div>
        <div class="bookInfo" @click="goToBookPage">
            <div class="imageContainer">
                <Icon name="ic:baseline-menu-book" v-if=!item.image />
                <img :src="config.public.API_BASE_URL + '/img/books/' + item.image" :alt=item.name @load="setImageLoaded"
                    v-bind:class="{ loaded: state.imageLoaded }" v-else>
                <Spinner :type="'clip'" size='20px' v-if="!state.imageLoaded" />
                <span class="discount" v-if="item.discount">{{ item.discount && convertNumbersToPersian(item.discount)
                }}%</span>
            </div>
            <ul>
                <li>
                    <span class="name">{{ item.name }}</span>
                </li>
                <li>
                    <span class="value price totalAfterDiscount" v-if="item.price && item.discount">{{
                        (item.price - item.price * item.discount / 100).toLocaleString('fa')
                    }}</span>
                    <span class="value price total" v-bind:class="{ lineThrough: item.discount }">{{ item.price ?
                        item.price.toLocaleString('fa') : ''
                    }}</span>
                    <span class="currency">{{ item.price ? "تومان" : "نیاز به تماس" }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/cart-book-item.style.scss"
</style>