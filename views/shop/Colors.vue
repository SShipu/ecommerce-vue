<template>
    <div class="accordion accordion-flush filter-items-container">
        <div class="accordion-item">
            <h2 class="accordion-header" :id="'flush-headingOne' + collapsId">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#flush-collapseOne' + collapsId" aria-expanded="false" :aria-controls="'flush-collapseOne' + collapsId">
                    <h4 class="heading">{{ title }}</h4>
                </button>
            </h2>
            
            <div :id="'flush-collapseOne' + collapsId" class="accordion-collapse collapse" :aria-labelledby="'flush-headingOne' + collapsId"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div v-if="!props.loading" class="mt-2 d-flex justify-content-start align-items-center flex-wrap">
                        <!-- v-for="(category, i) in items.values"  -->
                        <FilterSubRow
                            v-for="(category, i) in itemValues" 
                            :key="i" 
                            :singleItem="category" 
                            :selectedItems="selectedCategories"
                            @onChangeProcessed="onCategoryCheck"
                            v-model="selectedItems"
                            :inputType="true"
                            :type="type"
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
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

import FilterSubRow from './component/FilterSubRowV2.vue';
import { useVModel } from '~/libs/fuel-station/useVModel';

const props = defineProps({
    modelValue: {
        type: Array,
        default: [],
    },
    selectedCategories:{
        type: Array,
        required: true,
    },
    items:{
        type: [Array, Object],
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
    },
    collapsId: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ""
    }
});

const title = toRef(props, 'label');
const emit = defineEmits(['update:modelValue', 'onCategoryCheck']);
const selectedItems = useVModel(props, emit, 'modelValue');

const itemValues = computed(() => {
    if (props.items?.values?.length ) {
        return props.items.values.sort((x, y) => x.sortOrder - y.sortOrder);
    }
    return [];
})
const onCategoryCheck = (e) => {
    emit('onCategoryCheck', e);
    if(e?.item?.id && !selectedItems.value.includes(e.item)){
        selectedItems.value.push(e.item);
    } else if(selectedItems.value?.length) {
        selectedItems.value = selectedItems.value.filter((i) => i && i.id != e.item.id)
    }
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
            box-shadow: none !important;
        }
        .accordion-body {
            padding: 0;
            background-color: transparent !important;
        }
    }

}
</style>
