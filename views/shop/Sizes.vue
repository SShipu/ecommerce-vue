<template>
    <div class="accordion accordion-flush filter-items-container">
        <div class="accordion-item">
            <h2 class="accordion-header" :id="'flush-headingOne' + title">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#flush-collapseOne' + title" aria-expanded="false" :aria-controls="'flush-collapseOne' + title">
                    <h4 class="heading">{{ title }}</h4>
                </button>
            </h2>
            <div :id="'flush-collapseOne' + title" class="accordion-collapse collapse" :aria-labelledby="'flush-headingOne' + title"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div v-if="!props.loading" class="mt-2 d-flex justify-content-start align-items-center flex-wrap">
                        <FilterSubRow 
                            v-for="(category, i) in allCategory" 
                            :key="i" 
                            :singleItem="category" 
                            :selectedItems="props.selectedCategories"
                            @onChangeProcessed="onCategoryCheck"
                            :inputType="true"
                        />
                    </div>
                    <div v-else>
                        <div class="item-body" v-for="i in 7" :key="i">
                            <Skeletor height="24px" width="24px" class="" style="margin-bottom: 0.5rem;" />
                            <Skeletor height="24px" width="175px" class="" style="margin-bottom: 0.5rem;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import FilterSubRow from './component/FilterSubRowV2.vue';

const props = defineProps({
    selectedCategories:{
        type: Array,
        required: true,
    },
    allCategory:{
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: 'Unit',
    },
    loading: {
        type: Boolean,
        default: false,
    }
});

const title = toRef(props, 'label');
const emit = defineEmits(['update:modelValue', 'onCategoryCheck']);

const onCategoryCheck = (e) => {
    emit('onCategoryCheck', e);
};
</script>

<style lang="scss">
.filter-items-container {

    // padding: 0 12%;
    .heading {
        font-size: 1.5rem;
        font-weight: 600;
        // color: #667085 !important;
        margin: 0;
    }

    .item-body {
        display: flex;
        column-gap: 15px;
        align-items: baseline;
    }
}
.filter-items-container {
    .accordion-item {
        background-color: transparent !important;
        .accordion-header {
            padding: 0;
        }
        .accordion-button {
            padding: 10px 0;
            background-color: transparent !important;
            color: #1C1C24;
        }
        .accordion-button:not(.collapsed) {
            background-color: transparent !important;
            color: #1C1C24;
        }
        .accordion-body {
            padding: 0;
            background-color: transparent !important;
        }
    }

}
</style>
