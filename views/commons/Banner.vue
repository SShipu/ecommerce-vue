<template>
    <div class="w-100 h-25vh bg-image position-relative d-flex justify-content-center align-items-center banner-container border border-bottom-1">
        <div class="banner-text-container d-flex flex-column align-items-center">
            <span class="fw-bold bg-text">{{ title }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    }
})
</script>

<style lang="scss" scoped>

.banner-container {
    
}
.bg-image {
    // background-image: url('/images/home/banner.png');
}
.bg-text {
    font-weight: 800; 
    font-family: 'Roboto' sans-serif; 
    font-size: 55px;
}

.bg-btn {
    box-shadow: 0px 3px #2277E0; 
    color: #2277E0
}

@media screen and (max-width: 1023px){
    .banner-container {
        .bg-text {
            font-size: 35px;
        }
    }
    
}

@media screen and (max-width: 550px){
    .banner-container {
        .bg-text {
            font-size: 30px;
        }
    }
    
}
</style>