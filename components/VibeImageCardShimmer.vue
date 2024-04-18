<template>
    <div class="card mb-0 w-100">
        <a href="#" class="card-img-top bg-image h-70vh d-flex justify-content-center align-items-end" @click.prevent>
            <Skeletor width="100%" height="100%" class="" />
        </a>
    </div>
</template>

<script setup>
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";
</script>

<style lang="scss" scoped>
.card-img-top {
    border-radius: 0px !important;
}

.category_image {
    height: 50vh;
}

@media screen and (max-width: 699px) {
    .category_image {
        height: 32vh;
    }
}
.card {
    a:hover {
        .overlay {
            position: absolute;
            z-index: 10;
            background: rgba(0, 0, 0, .3);
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
}

</style>