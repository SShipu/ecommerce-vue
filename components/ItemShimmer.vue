<template>
    <div class="card rounded-6 w-100 mx-2">  
        <div class="card-img-top bg-image h-40vh position-relative">
            <Skeletor width="100%" height="100%" class="" />
        </div>

        <div class="card-body d-flex flex-column align-items-center">
            <!-- <div class="colors-container d-flex justify-content-center align-items-center">
                <div class="each-color rounded-circle bg-image mx-1"
                    v-for="(color, i) in 5" :key="i">
                    <Skeletor width="100%" height="100%" class=" rounded-circle" />
                </div>
            </div> -->
            <Skeletor width="70%" height="15px" class="mt-2" style="border-radius: 10px"/>
            <Skeletor width="50%" height="15px" class="my-1" style="border-radius: 10px"/>
            <Skeletor width="40%" height="15px" class="" style="border-radius: 10px"/>
        </div>
    </div>
</template>

<script setup>
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";
</script>

<style lang="scss" scoped>
.card-tag {
    top: 20px;
    left: 20px;
}

.colors-container {
    .each-color {
        width: 20px;
        height: 20px;
    }
}
</style>