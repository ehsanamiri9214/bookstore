<script setup lang="ts">

import { LMap, LTileLayer, LCircle, LControlScale, LFeatureGroup, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

onMounted(() => {
    scrollToTop()
})

</script>

<!-- ------------------------------------------------------------------------------------------------------ -->

<template>
    <div class="page">
        <div class="info">
            <ul>
                <li>
                    <RowDataItem icon="ic:outline-phone-enabled" title="تلفن" value="(+98) - 935 303 46 56"
                        :ltrDir=true />
                </li>
                <li>
                    <RowDataItem icon="ic:outline-telegram" title="تلگرام" value="(+98) - 935 303 46 56" :ltrDir=true />
                </li>
                <li>
                    <RowDataItem icon="ic:baseline-whatsapp" title="واتساپ" value="(+98) - 935 303 46 56" :ltrDir=true />
                </li>
                <li>
                    <RowDataItem icon="ic:baseline-alternate-email" title="اینستاگرام" value="@dibabookstore"
                        :ltrDir=true />
                </li>
                <li>
                    <RowDataItem icon="ic:baseline-alternate-email" title="یوتیوب" value="@dibabookstore" :ltrDir=true />
                </li>
                <li>
                    <RowDataItem icon="icon-park-twotone:twitter" title="توییتر" value="@dibabookstore"
                        :ltrDir=true />
                </li>
                <li>
                    <RowDataItem icon="ic:outline-facebook" title="فیس بوک" value="@dibabookstore" :ltrDir=true />
                </li>
                <li>
                    <RowDataItem icon="ic:baseline-mail-outline" title="ایمیل" value="dibabookstore@gmail.com" />
                </li>
                <li>
                    <RowDataItem icon="ic:outline-location-on" title="آدرس" value="میدان انقلاب، خیابان کارگر جنوبی، خیابان ژاندارمری" />
                </li>
            </ul>
        </div>
        <div class="map">
            <l-map ref="map" zoom=16 :center="[35.700109, 51.392844]">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                    name="OpenStreetMap"></l-tile-layer>
                <l-circle :lat-lng="[35.700109, 51.392844]" :radius="150" color="green" />
                <l-control-scale position="bottomleft" />
                <l-feature-group>
                    <l-marker :lat-lng="[35.700109, 51.392844]"></l-marker>
                </l-feature-group>
            </l-map>
        </div>
    </div>
</template>

<!-- ------------------------------------------------------------------------------------------------------ -->

<style lang="scss" scoped>
@import "@/assets/styles/pages/contact-us.style.scss"
</style>