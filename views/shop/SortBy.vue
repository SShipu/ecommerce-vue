<template>
    <div id="edit-sort-bef-combine-wrapper w-100" class="views-exposed-widget views-widget-sort-sort_bef_combine">
        <div class="views-widget">
            <div class="form-item form-type-select form-item-sort-bef-combine"> 
                <div id="edit-sort-bef-combine-2">
                    <select v-model="selectedList" id="edit-sort-bef-combine" name="sort_bef_combine" class="form-select select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                        <option value="0">Sort</option>
                        <option v-for="(item, i) in sortList" :key="i" :value="item" selected="selected">{{item.title}}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

const props = defineProps({
    modelValue: {
        type: Array,
        // required: false,
    },
    error: {
        type: String,
        default: '',
    },
});
const emit = defineEmits(['update:modelValue']);

const selectedList = ref("0");
const sortList = ref([
    {
        title: "Name: A - Z",
        id: 1,
        field: "title",
        type: "ASCENDING",
    },
    {
        title: "Name: Z - A",
        id: 2,
        field: "title",
        type: "DESCENDING",
    },
    {
        title: "Popularity",
        id: 3,
        field: "totalPopularity",
        type: "DESCENDING",
    },
    {
        title: "Price: Low to High",
        id: 4,
        field: "minPrice",
        type: "ASCENDING",
    },
    {
        title: "Price: High to Low",
        id: 5,
        field: "minPrice",
        type: "DESCENDING",
    },
])

watch(selectedList, () => {
        if (selectedList.value && selectedList.value.title && selectedList.value.title.length) {
            emit('update:modelValue', selectedList.value);
        }
    },
    { immediate: true }
);

const onOutsideClick = () => {
    // isVisible.value = false;
};

</script>
<style lang="scss">
#edit-sell-price-wrapper {
    .slider-connect {
        background: var(--slider-connect-bg, #e0e0e0) !important;
        cursor: pointer;
    }

    .slider-tooltip {
        background: var(--slider-tooltip-bg, #e0e0e0) !important;
        border: 1px solid var(--slider-tooltip-bg, #e0e0e0) !important;
        color: #667085;
    }


    .slider-handle-lower {
        background: var(--slider-handle-bg, #dbdbdb) !important;
    }

}

.price-box {
    .form-control:focus {
        color: #495057;
        background-color: #fff;
        border: 1px solid #e0e0e0 !important;
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

@media screen and (min-width: 992px) and (max-width: 1200px) {
    .filter-items-container {
        padding: 0 0%;
    }
}
</style>


<style >
/* Sort By Filter HATIL */
#edit-sort-bef-combine-wrapper {
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.views-exposed-form .views-exposed-widget {
    float: left;
    padding: .5em 1em 0 0;
}

select2-hidden-accessible {
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
}

.select2-container {
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    position: relative;
    vertical-align: middle;
}

.select2-container--default .select2-selection--single {
    height: 35px;
    border-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}

.select2-container--default .select2-selection--single {
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 4px;
}

.select2-container .select2-selection--single {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 28px;
    user-select: none;
    -webkit-user-select: none;
}

.select2-container--default.select2-container--open.select2-container--below .select2-selection--single,
.select2-container--default.select2-container--open.select2-container--below .select2-selection--multiple {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

select2-container--default .select2-selection--single {
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 4px;
}

.select2-container--default .select2-selection--single .select2-selection__rendered {
    padding-top: 3px;
    font-weight: bold;
    padding-left: 20px;
}

.select2-container--default .select2-selection--single .select2-selection__rendered {
    /* color: #444; */
    color: #667085;
    line-height: 28px;
}

.select2-selection__rendered {
    display: block;
    padding-left: 8px;
    padding-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #667085;
}


.select2-container--default .select2-selection--single .select2-selection__arrow {
    top: 4px;
    right: 5px;
}

.select2-container--default .select2-selection--single .select2-selection__arrow {
    height: 26px;
    position: absolute;
    top: 1px;
    right: 1px;
    width: 20px;
}

.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow b {
    border-color: transparent transparent #888 transparent;
    border-width: 0 4px 5px 4px;
}

.select2-container--default .select2-selection--single .select2-selection__arrow b {
    /* border-color: #888 transparent transparent transparent; */
    color: #667085;
    border-style: solid;
    border-width: 5px 4px 0 4px;
    height: 0;
    left: 50%;
    margin-left: -4px;
    margin-top: -2px;
    position: absolute;
    top: 50%;
    width: 0;
}
.select2-container--default .select2-selection--single {
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 4px;
}

#edit-sort-bef-combine {
    background-color: #fff;
    /* border: 1px solid #aaa; */
    border-radius: 20px;
    /* padding: 6px 15px; */
    /* width: auto; */
    border: none;
    border-radius: 20px;
    padding: 0;
    /* width: 60px; */
    width: auto;
}

.select2-hidden-accessible {
    font-weight: 500;
    color: rgb(68, 68, 68);
}
</style>
