<template>
    <!-- <div class="w-100 h-80vh bg-image position-relative d-flex justify-content-center align-items-center my-5"> -->
        <!-- <div class="banner-text-container d-flex flex-column align-items-center">
            <span class="fw-bold text-white shadow bg-text">Ready To Wear</span>
            <button class="btn btn-light bg-btn rounded-pill fs-4 fw-bold mt-3 px-3 py-2">Shop LS Kids</button>
        </div> -->
    <!-- </div> -->

    <div class="w-100 position-relative">
        <img 
            :src="'/images/home/rect.png'" 
            alt="banner-image" 
            class="w-100 img-fluid" 
        />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.bg-image {
    background-image: url('/images/home/rect.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.bg-text {
    text-shadow: 0px 2px #2277E0; 
    font-weight: 800; 
    font-family: 'Futura'; 
    font-size: 55px;
}

.bg-btn {
    box-shadow: 0px 3px #2277E0; 
    color: #2277E0
}
</style>