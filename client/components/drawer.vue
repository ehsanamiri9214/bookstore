<script setup lang="ts">

import { useAppStore } from '~/stores'
import { CLIENT_ROUTES, SERVER_ROUTES } from '~/constants'

const appStore = useAppStore()

const closeDrawer = () => {
    appStore.setShowDrawer(false)
}

const goToPage = (path: string) => {
    closeDrawer()
    navigateTo({ path, query: {} })
}

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="drawer" @click="closeDrawer">
        <div class="drawerContent" @click="(e) => {
            e.stopPropagation()
        }">
            <ul>
                <li @click="goToPage(CLIENT_ROUTES.CATEGORIES)">
                    <span>دسته بندی ها</span>
                    <Icon name="ic:outline-category" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.PUBLISHERS)">
                    <span>انتشارات</span>
                    <Icon name="ic:baseline-library-books" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.WRITERS)">
                    <span>نویسندگان</span>
                    <Icon name="ic:outline-people" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.SEARCH)">
                    <span>لوازم التحریر</span>
                    <Icon name="ic:baseline-signal-cellular-0-bar" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.SEARCH)">
                    <span>لوازم جانبی</span>
                    <Icon name="ic:outline-coffee" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.SEARCH)">
                    <span>کتب دست دو</span>
                    <Icon name="ic:round-published-with-changes" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.SEARCH)">
                    <span>کتب کلکسیونی و قدیمی</span>
                    <Icon name="ic:baseline-av-timer" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.RULES)">
                    <span>شرایط و قوانین</span>
                    <Icon name="ic:baseline-assured-workload" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.FAQ)">
                    <span>سوالات متداول</span>
                    <Icon name="ic:round-help-outline" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.ABOUT_US)">
                    <span>درباره ما</span>
                    <Icon name="ic:outline-assignment-late" />
                </li>
                <li @click="goToPage(CLIENT_ROUTES.CONTACT_US)">
                    <span>تماس با ما</span>
                    <Icon name="ic:outline-contact-phone" />
                </li>
            </ul>
        </div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/drawer.style.scss"
</style>