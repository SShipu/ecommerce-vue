<template>
    <label class="color-body my-1 mx-1 py-1 d-flex rounded-circle position-relative d-flex justify-content-center align-items-center" 
        :class="{'active-body': isChecked}"  v-if="props.type == 'color'"
        style="cursor: pointer; column-gap: 15px;"
        :style="{backgroundColor: setExtras(props.singleItem)}"
    >
        <input 
            class="primary-checkbox"
            :class="{inputHidden: inputType}"
            type="checkbox" 
            name="cate" 
            :checked="isChecked"
            v-model="selectItem" 
            :value="props.singleItem"
            @change="$emit('onChangeProcessed', { args: $event.target.checked, item: props.singleItem })"
        />
        <span v-if="props.singleItem?.extras?.valueType == 'TEXT'" style="font-size: 11px;">{{ props.singleItem.extras.value }}</span>
    </label>
    <label class="color-body my-1 mx-1 py-1 d-flex rounded-circle position-relative d-flex justify-content-center align-items-center" 
        :class="{'active-body': isChecked}"  v-else
        style="cursor: pointer; column-gap: 15px;"
    >
        <input 
            class="primary-checkbox"
            :class="{inputHidden: inputType}"
            type="checkbox" 
            name="cate" 
            :checked="isChecked"
            v-model="selectItem" 
            :value="props.singleItem"
            @change="$emit('onChangeProcessed', { args: $event.target.checked, item: props.singleItem })"
        />
        <span style="font-size: 10px;">{{ props.singleItem.name }}</span>
    </label>
</template>

<script setup>
const props = defineProps({
    selectedItems:{
        type: Array,
        required: true,
    },
    singleItem:{
        type: Object,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    inputType: {
        type: Boolean,
        default: false
    },
    background: {
        type: String,
        default: "sd"
    },
    type: {
        type: String,
        default: ""
    }
});

const selectedItemsRef = toRef(props, 'selectedItems');

const selectItem = ref([]);

const isChecked = computed(() => {
    let checked = false;
    
    if (selectedItemsRef.value && selectedItemsRef.value.length > 0 ) {
        if (props.singleItem && props.singleItem.id) {
            // checked = selectedItemsRef.value.map(c => c.id).includes(props.singleItem.id);
           
            let ids = selectedItemsRef.value.map(c => {
                if(c) {
                    return c.id
                }
            });
            let displayLabels = selectedItemsRef.value.map(c => {
                if(c) {
                    return c.displayLabel
                }
            });
            let optionIds = selectedItemsRef.value.map(c => {
                if(c) {
                    return c.optionId
                }
            });
            
            if(ids.includes(props.singleItem.id) && displayLabels.includes(props.singleItem.displayLabel) && optionIds.includes(props.singleItem.optionId)) {
                checked = true;
            } else {
                checked = false;
            }
        }
    }
    return checked;
});
const setExtras = (attr) => {
    if (attr.extras) {
        if (attr.extras?.valueType === 'COLOR') {
            return  attr.extras.value?.length ? attr.extras.value : attr.name;
        }
        // if (attr.extras.valueType === 'TEXT') {
        //     return '#fff';
        // }
    } 
    return attr.name;
}
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
    width: 48px;
    height: 48px;
    border: 1px solid black;
}
</style>