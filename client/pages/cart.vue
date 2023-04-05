<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~~/constants'
import { makeRequest } from '~~/services'
import { useAppStore, useUserStore, useAuthStore, useCartStore } from '~~/stores'
import { scrollToTop } from '~/utils'
import UserInfoModal from '~~/modals/user-info.modal.vue'
import AddressModal from '~~/modals/select-address.modal.vue'
import AddAddressModal from '~~/modals/add-address.modal.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const { user } = storeToRefs(userStore)
const { isLoggedIn } = storeToRefs(authStore)
const { loading, cart, addresses, states, cities } = storeToRefs(cartStore)

const state = reactive({
    infoModal: false,
    selectAddressModal: false,
    addAddressModal: false
})

onMounted(() => {
    scrollToTop()
    if (!isLoggedIn.value) {
        showToast("لطفا ابتدا وارد شوید.")
        navigateTo({ path: CLIENT_ROUTES.LOGIN, query: {} })
    } else {
        getCart()
        getAddresses()
        if (!states.value.length) getStates()
        if (!cities.value.length) getCities()
    }
})

const getCart = async () => {
    cartStore.setLoading(true)
    const { error, data } = await makeRequest(SERVER_ROUTES.CART, "GET")
    cartStore.setLoading(false)
    if (!error) {
        cartStore.setCart(data)
    } else {
        // showToast(error.msg)
    }
}

const getAddresses = async () => {
    const { error, data } = await makeRequest(SERVER_ROUTES.ADDRESS, "GET")
    if (!error) {
        cartStore.setAddresses(data)
    } else {
        // showToast(error.msg)
    }
}

const getStates = async () => {
    const { error, data } = await makeRequest(SERVER_ROUTES.STATE + '/all', "GET")
    if (!error) {
        cartStore.setStates(data)
    } else {
        // showToast(error.msg)
    }
}

const getCities = async () => {
    const { error, data } = await makeRequest(SERVER_ROUTES.CITY + '/all', "GET")
    if (!error) {
        cartStore.setCities(data)
    } else {
        // showToast(error.msg)
    }
}

const buy = () => {
    if (!user.value.firstName || !user.value.lastName) {
        showInfoModal()
    } else if (!cart.value.addressId) {
        showSelectAddressModal()
    } else {
        // TODO Start payment process.
    }
}

const showInfoModal = () => {
    appStore.setShowModal(true)
    state.infoModal = true
}

const showSelectAddressModal = () => {
    appStore.setShowModal(true)
    state.selectAddressModal = true
}

const showAddAddressModal = () => {
    // closeModal()
    appStore.setShowModal(true)
    state.addAddressModal = true
}

const closeModal = (onlyAddAddress = false) => {
    appStore.setShowModal(false)
    state.infoModal = false
    state.addAddressModal = false
    if (!onlyAddAddress) { state.selectAddressModal = false }
}

const getSelectedAddress = () => {
    const selectedAddress = addresses.value.find((i) => i.id === cart.value.addressId)
    return selectedAddress
}

const update = (onlyAddress = false) => {
    if (!onlyAddress) { getCart() }
    getAddresses()
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page" v-if=!loading>
        <div class="factor" v-if="cart.items.length > 0">
            <div class="data">
                <p>
                    <span class="title">مجموع</span>
                    <span class="value">
                        {{ cart.totalPrice.toLocaleString('fa') + ' تومان' }}
                    </span>
                </p>
                <p>
                    <span class="title">سود شما</span>
                    <span class="value">
                        {{ (cart.totalPrice -
                            cart.totalPriceAfterDiscount).toLocaleString('fa') + ' تومان' }}
                    </span>
                </p>
                <p>
                    <span class="title">قابل پرداخت</span>
                    <span class="value">
                        {{ cart.totalPriceAfterDiscount.toLocaleString('fa') + ' تومان' }}
                    </span>
                </p>
            </div>
            <Address :item="getSelectedAddress()" v-if="addresses.length && cart.addressId" />
            <button @click="showSelectAddressModal" class="changeAddress">
                <Icon name="ic:outline-location-on" v-if=!state.addingToCart />
                <span>{{ cart.addressId ? 'تغییر آدرس' : 'انتخاب آدرس' }}</span>
            </button>
            <button @click="buy">
                <span>نهایی کردن خرید</span>
                <!-- <Spinner color="white"/> -->
            </button>
        </div>
        <div class="items" v-if="cart.items.length > 0">
            <ul>
                <li v-for="item in cart.items" :key="item.id">
                    <CartBookItem :item="item.book" :amount="item.amount" />
                </li>
            </ul>
        </div>
        <p class="notFound" v-else>سبد خرید شما خالی است!</p>
    </div>
    <div class="spinnerContainer" v-else>
        <Spinner />
    </div>
    <Modal v-if="state.infoModal" @close="closeModal">
        <template v-slot:childComponent>
            <UserInfoModal @close="closeModal" />
        </template>
    </Modal>
    <Modal v-if="state.selectAddressModal" @close="closeModal" @update="update">
        <template v-slot:childComponent>
            <AddressModal @close="closeModal" @update="update" @addNew="showAddAddressModal" />
        </template>
    </Modal>
    <Modal v-if="state.addAddressModal" @close="closeModal(true)" @update="update(true)">
        <template v-slot:childComponent>
            <AddAddressModal @close="closeModal(true)" @update="update(true)" />
        </template>
    </Modal>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/cart.style.scss"
</style>