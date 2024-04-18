<template>
    <div class="filter-items-container">
        <h4 class="heading">Price</h4>

        <div style="margin-top: 40px; width: 80% !important;">
            <!-- <Slider tooltipPosition="top" :merge="260000" v-model="rangeValue" :min="0" :max="1000000" :step="1000"/> -->
        </div>
        <div style="margin-top: 25px; width: 80% !important; display: flex; justify-content: space-between;">
            <div class="price-box" s>
                <input 
                    class="form-control"
                    type="number" 
                    placeholder="Min Price"
                    v-model="rangeValue[0]"
                    @keyup.enter="setPrice"
                    style="
                        width: 100px; 
                        height: 35px; 
                        background-color: #fff;
                        border-color: rgb(219, 219, 219);
                        border-radius: 5px;
                        text-align: center;
                        margin-right: 5px;
                    "
                />
            </div>
            <div class="price-box">
                <input class="form-control" @keyup.enter="setPrice" v-model="rangeValue[1]" type="number" placeholder="Max Price"  style="width: 100px; height: 35px; 
                    background-color: #fff;
                    border-color: rgb(219, 219, 219);
                    border-radius: 5px;
                    text-align: center;
                "/>
            </div>
        </div>
    </div>
</template>
<script setup>
// import Slider from '@vueform/slider';

const props = defineProps({
    modelValue: {
        type: Array,
        required: true,
    },
    error: {
        type: String,
        default: '',
    },
});
const emit = defineEmits(['update:modelValue']);
const rangeValue = ref([5000, 500000]);
const setPrice = () => {
    if (rangeValue.value && rangeValue.value.length > 0) {
        emit('update:modelValue', rangeValue.value);
    }
}
watch(rangeValue, () => {
        if (rangeValue.value && rangeValue.value.length > 0) {
            emit('update:modelValue', rangeValue.value);
        }
    },
    { immediate: true }
);

</script>
<!-- <style src="@vueform/slider/themes/default.css"></style> -->
<style lang="scss">

.filter-items-container {
    // padding-left: 40px;
    padding: 0 12%;
    .heading {
        font-size: 1rem;
        font-weight: 600;
        color: #667085 !important;
    }

    .item-body {
        display: flex;
        column-gap: 15px;
        align-items: baseline;
    }
    .slider-connect {
        background: var(--slider-connect-bg,#ea1a21) !important;
        cursor: pointer;
    }
    .slider-tooltip {
        background: var(--slider-tooltip-bg,#ea1a21) !important;
        border: 1px solid var(--slider-tooltip-bg,#ea1a21) !important;
    }
    .slider-handle-lower {
        background: var(--slider-handle-bg,#dbdbdb) !important;
    }
    // .slider-handle-upper
}

// .header_area .header_search input {
//   height: 60px;
//   width: 600px;
//   border: 2px solid #f7f7f7;
//   border-radius: 35px;
//   -webkit-box-shadow: 0px 1px 6px 0px #e6e6e6;
//   box-shadow: 0px 1px 6px 0px #e6e6e6;
//   padding-left: 30px;
// }
.price-box{
    .form-control:focus {
        color: #495057;
        background-color: #fff;
        border: 1px solid #ea1a21 !important;
        outline: 0;
        box-shadow: none !important;
    }
    input {
      outline-offset: -2px;
      -webkit-appearance: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
}
</style>
