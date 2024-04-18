<template>
    <div class="accordion-body">
        <div v-if="props.item" class="mt-2 d-flex justify-content-start align-items-center flex-wrap">
            <label class="color-body my-1 mx-1 py-1 d-flex rounded-circle position-relative" 
                v-if="item?.color?.length"
                :class="{'active-body': isChecked}" 
                style="cursor: pointer; column-gap: 15px;"
                :style="{backgroundColor: item.color}"
            >
                <input 
                    class="primary-checkbox"
                    :class="{inputHidden: inputType}"
                    type="checkbox" 
                    name="cate" 
                    :checked="isChecked"
                    v-model="selectedItems" 
                    :value="item"
                    @change="$emit('onChangeProcessed', { args: $event.target.checked, item: item })"
                />
            </label>
            
            <label class="color-body my-1 mx-1 py-1 d-flex rounded-circle position-relative d-flex justify-content-center align-items-center" 
                :class="{'active-body': isChecked}"  v-if="item?.name?.length"
                style="cursor: pointer; column-gap: 15px;"
            >
                <input 
                    class="primary-checkbox"
                    :class="{inputHidden: inputType}"
                    type="checkbox" 
                    name="cate" 
                    :checked="isChecked"
                    v-model="selectedItems" 
                    :value="item"
                    @change="$emit('onChangeProcessed', { args: $event.target.checked, item: item })"
                />
                <span>{{ item.name }}</span>
            </label>
        </div>

        <div v-else>
            <div class="item-body" v-for="i in 7" :key="i">
                <Skeletor height="24px" width="24px" class="" style="margin-bottom: 0.5rem;" />
                <Skeletor height="24px" width="175px" class="" style="margin-bottom: 0.5rem;" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVModel } from '~/libs/fuel-station/useVModel';

const props = defineProps({
    modelValue: {
        type: Array,
        default: [],
    },
    item: {
        type: Object,
        default: null,
    },
    index: {
        type: Number,
        default: -1,
    },
    type: {
        type: String,
        default: '',
    },
    inputType: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);
const selectedItems = useVModel(props, emit, 'modelValue');

const isChecked = computed(() => {
    let checked = false;
    if (selectedItems.value && selectedItems.value.length > 0 ) {
        if (props.item && props.item.id) {
            // checked = selectedItems.value.map(c => {
            //     if(c) {
            //         return c.name
            //     }
            // }).includes(props.item.name);


            let ids = selectedItems.value.map(c => {
                if(c) {
                    return c.id
                }
            });
            let displayLabels = selectedItems.value.map(c => {
                if(c) {
                    return c.displayLabel
                }
            });
            let optionIds = selectedItems.value.map(c => {
                if(c) {
                    return c.optionId
                }
            });

            if(ids.includes(props.item.id) && displayLabels.includes(props.item.displayLabel) && optionIds.includes(props.item.optionId)) {
                checked = true;
            } else {
                checked = false;
            }
        }
    }
    return checked;
});
</script>

<style lang="scss">
.active-body {
    border-radius: 60px;
    background: #F3F3F3;
    border: 2px solid red !important;
 }
.primary-checkbox {
    margin-right: 5px !important;
    accent-color: #000;
}
.inputHidden {
    position: absolute;
    clip-path: circle(0);
    height: 1px;
    width: 1px;
    opacity: 0;
}

.color-body {
    width: 40px;
    height: 40px;
    border: 1px solid black;
}

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
