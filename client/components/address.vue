<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~~/constants'
import { TOAST_TYPE_ENUM } from '~~/enums';
import { makeRequest } from '~~/services'
import { useUserStore, useCartStore } from '~~/stores'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    selectable: {
        type: Boolean,
        required: false
    }
})

const emit = defineEmits(['close', 'update'])

const state = reactive({
    loading: false
})

const userStore = useUserStore()
const cartStore = useCartStore()

const { user } = storeToRefs(userStore)
const { cart, addresses } = storeToRefs(cartStore)

const select = async (id: number) => {
    if (!state.loading) {
        if (id !== cart.value.addressId) {
            state.loading = true
            const { error, data } = await makeRequest(SERVER_ROUTES.ADD_ADDRESS_TO_CART, "POST", undefined, { id })
            state.loading = false
            if (!error) {
                cartStore.setCart(data)
                showToast("ادرس با موفقیت انتخاب شد.", TOAST_TYPE_ENUM.SUCCESS)
            } else {
                showToast(error.msg)
            }
        }
        emit('close')
    }
}

const remove = async (e, id: number) => {
    e.stopPropagation()
    if (!state.loading) {
        state.loading = true
        const { error, data } = await makeRequest(SERVER_ROUTES.ADDRESS + "/" + id, "DELETE")
        state.loading = false
        if (!error) {
            showToast("ادرس با موفقیت حذف شد.", TOAST_TYPE_ENUM.SUCCESS)
            emit('close')
            emit('update')
        } else {
            showToast(error.msg)
        }
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="address" v-bind:class="{ selectable }" @click="selectable && select(props.item.id)">
        <ul class="top">
            <li>
                <span class="title">استان</span>
                <span class="value">{{ item.state.name }}</span>
            </li>
            <li>
                <span class="title">شهر</span>
                <span class="value">{{ item.city.name }}</span>
            </li>
            <li>
                <span class="title">کدپستی</span>
                <span class="value">{{ item.postalCode }}</span>
            </li>
            <li>
                <span class="title">جزییات</span>
                <span class="value">{{ item.details }}</span>
            </li>
        </ul>
        <button @click="(e) => remove(e, props.item.id)" v-if="selectable" class="closeButton">
            <Icon name="ic:baseline-close" />
        </button>
        <Spinner :type="'clip'" size='20px' v-if="selectable && state.loading" />
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/address.style.scss"
</style>