<script setup lang="ts"></script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="modal" @click="$emit('close')">
        <div class="child" @click="(e) => {
            e.stopPropagation();
        }">
            <slot name="childComponent"></slot> <!-- Here will be rendered your ComponentC -->
            <button @click="$emit('close')" class="closeButton">
                <Icon name="ic:baseline-close" />
            </button>
        </div>
</div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>@import "@/assets/styles/components/modal.style.scss"</style>