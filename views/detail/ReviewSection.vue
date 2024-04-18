<template>
    <div class="h-50vh bg-dark position-relative d-flex justify-content-center align-items-center">
        <div class="d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row flex-xxl-row mx-2 mx-sm-2 mx-md-2 mx-lg-2 mx-xl-1 mx-xxl-1">

            <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 banner-text-container mb-1">
                <span class="fw-bold text-white fs-2">Reviews</span>
    
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-6 col-xxl-6 banner-text-container d-flex flex-column align-items-start">
                <span class="fw-bold text-white bg-text">Your reviews help us improve our gear. Take a few minutes to tell us what you think.</span>
                <button class="btn btn-light bg-btn rounded-pill fs-4 fw-bold mt-3 px-3 py-2">Write A Review</button>
            </div>
    
            <!-- <div class="col-sm-3"></div> -->
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.bg-dark{
    background-color: #1C1C24 !important;
}
.bg-text {
    // text-shadow: 0px 2px #2277E0; 
    font-weight: 800; 
    font-family: 'Futura'; 
    font-size: 2rem;

    @media screen and (max-width: 390px) {
        font-size: 1.75rem;
    }
}

.bg-btn {
    // box-shadow: 0px 3px #2277E0; 
    color: #1C1C24
}
</style>