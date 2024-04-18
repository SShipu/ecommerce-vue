<template>
    <div class="filter-items-container">
        <h4 class="heading">{{title}}</h4>
        <!-- {{ selectedCategories }} -->
        <div v-if="!props.loading" class="mt-2">
            <FilterSubRow 
                v-for="(category, i) in allCategory.slice(0, 7)" 
                :key="i" 
                v-model="selectedItems"
                :singleItem="category" 
                @onChangeProcessed="onCategoryCheck"
                :inputType="true"
                :selectedItems="props.selectedCategories"
            />

            <span 
                v-if="allCategory.length > 7" 
                class="fs-4 c-view-more" 
                @click.prevent="categoryModalVisibility = true"
            >
                View More
            </span>
        </div>
        <div v-else>
            <div class="item-body" v-for="i in 7" :key="i">
                <Skeletor height="24px" width="24px" class="" style="margin-bottom: 0.5rem;"/>
                <Skeletor height="24px" width="175px" class="" style="margin-bottom: 0.5rem;"/>
            </div>
        </div>
    </div>

    <ModalBaseModal 
        v-if="categoryModalVisibility" 
        :show="categoryModalVisibility"
        @close="categoryModalVisibility = false"
        :title="'Categories'"
    >
        <div class="d-flex flex-wrap">
            <FilterSubRow 
                class="mx-1"
                v-for="(category, i) in allCategory.slice(7)" 
                :key="i" 
                v-model="selectedItems"
                :singleItem="category" 
                @onChangeProcessed="onCategoryCheck"
                :inputType="true"
                :selectedItems="props.selectedCategories"
            />
        </div>
    </ModalBaseModal>
</template>

<script setup>
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

import FilterSubRow from './component/FilterSubRowV1.vue';
import { useVModel } from '~/libs/fuel-station/useVModel';

const props = defineProps({
    modelValue: {
        type: Array,
        default: [],
    },
    selectedCategories:{
        type: Array,
        default: [],
    },
    allCategory:{
        type: Array,
        required: true,
    },
    type: {
        type: String,
        default: '',
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
const selectedItems = useVModel(props, emit, 'modelValue');
const categoryModalVisibility = ref(false);

const onCategoryCheck = (e) => {

    emit('onCategoryCheck', e);

    if(e?.item?.id && !selectedItems.value.includes(e.item)){
        // selectedItems.value.push(e.item);
        selectedItems.value[0] = e.item;
    } else {
        selectedItems.value = selectedItems.value.filter((i) => i.id != e.item.id)
    }
};
</script>

<style lang="scss">
.filter-items-container {
    // padding: 0 12%;
    padding: 10px 0;
    border-bottom: 1px solid black;
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

  .c-view-more {
        cursor: pointer;
        font-weight: 700;
        color: #000;
        
        &:hover {
            color: #2277E0;
        }
  }
}
</style>
