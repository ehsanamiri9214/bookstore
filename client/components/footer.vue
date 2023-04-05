<script setup lang="ts">

import { CLIENT_ROUTES } from '~~/constants'

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <footer>
        <nav>
            <ul>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.FAQ" activeClass="active">سوالات متداول</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.RULES" activeClass="active">شرایط و قوانین</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.CONTACT_US" activeClass="active">تماس با ما</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="CLIENT_ROUTES.ABOUT_US" activeClass="active">درباره ما</NuxtLink>
                </li>
            </ul>
        </nav>
    </footer>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/components/footer.style.scss"
</style>