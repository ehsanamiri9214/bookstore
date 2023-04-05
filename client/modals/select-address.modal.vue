<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { emit } from 'process';
import { useCartStore } from '~~/stores'

const emit = defineEmits(['addNew'])

const cartStore = useCartStore()

const { addresses } = storeToRefs(cartStore)


const addNew = () => {
    if (addresses.value.length < 3) {
        emit('addNew')
    } else {
        showToast("امکان ثبت بیش از ۳ آدرس وجود ندارد.")
    }
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="modalContent">
        <p v-if="addresses.length">آدرس مورد نظر را انتخاب کنید.</p>
        <p class="error" v-else>آدرسی برای شما ثبت نشده است.</p>
        <ul>
            <li v-for="(item, i) in addresses" :key=i>
                <Address :item=item selectable @close="$emit('close')" @update="$emit('update')" />
            </li>
        </ul>
        <button @click="addNew">
            <Icon name="ic:baseline-add-circle-outline" />
            <span>افزودن آدرس جدید</span>
        </button>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/modals/select-address.modal.style.scss"
</style>