<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { SERVER_ROUTES } from '~~/constants';
import { TOAST_TYPE_ENUM } from '~~/enums';
import { makeRequest } from '~~/services';
import { useCartStore } from '~~/stores';

const cartStore = useCartStore()

const { states, cities } = storeToRefs(cartStore)

const emit = defineEmits(['close', 'update'])

const state = reactive({
    loading: false,
    state: {},
    city: {},
    postalCode: '',
    details: ''
})

const setState = (stateItem: object) => {
    state.state = stateItem;
    setCity({})
}

const setCity = (city: object) => {
    state.city = city;
}

const getSelectedStateCities = () => {
    const filteredCities = cities.value.filter((c) => c.stateId === state.state.id)
    return filteredCities
}

const save = async () => {
    if (!state.loading) {
        if (!state.state.id || !state.city.id || !state.postalCode || state.details.length < 5) {
            showToast('پر کردن تمام فیلد ها الزامی است.')
        } else {
            state.loading = true;
            const { error, data } = await makeRequest(SERVER_ROUTES.ADDRESS, "POST", undefined, {
                stateId: state.state.id,
                cityId: state.city.id,
                postalCode: state.postalCode,
                details: state.details
            })
            state.loading = false;
            if (!error) {
                showToast("آدرس جدید با موفقیت اضافه شد.", TOAST_TYPE_ENUM.SUCCESS)
                emit('close')
                emit('update')
            }
            else {
                showToast(error.msg)
            }
        }
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="modalContent">
        <ul>
            <li>
                <SelectBox :options="states" placeholder="استان" @select="setState" :selected="state.state" />
            </li>
            <li>
                <SelectBox :options="state.state.id && getSelectedStateCities()" placeholder="شهر" @select="setCity"
                    :selected="state.city" />
            </li>
            <li>
                <input type="number" placeholder="کد پستی" v-model="state.postalCode">
            </li>
        </ul>
        <textarea placeholder="جزییات آدرس ..." v-model="state.details" />
        <button @click="save">
            <Spinner color="white" v-if="state.loading" />
            <span v-else>ثبت</span>
        </button>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/modals/add-address.modal.style.scss"
</style>