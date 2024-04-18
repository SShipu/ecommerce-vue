<template>
    <div class="d-flex row gx-2 col-12 btn-group d-none" v-if="attributeName.toUpperCase() == 'COLOR'">
        <span class="col-2  mt-2 d-flex align-items-start justify-content-start text-black" style="font-weight: 700;">{{ attributeName }}:  </span>
        <!-- {{ attribute }} -->
        <div style="" class="col-10 d-flex align-items-start justify-content-start">
            <div 
                class="attribute-body rounded-circle border border-1 col-2 mx-1 mb-1 d-flex align-items-center justify-content-center fw-bold"
                v-for="(attributeValue, l) in attribute.values" 
                :key="l"
                :class="{'active': isActive(attributeValue) ? true : false}" 
                @click.prevent="setSelectedAttribute(attributeValue)"
                :style="{backgroundColor: setExtras(attributeValue)}"
            >
                <input type="radio" class="btn-check text-black shadow-none" name="btnradio"
                    :id="'btnradioQty'" autocomplete="off"
                />
                    <!-- v-model="quantity"  -->
                <label 
                    :class="isActive(attributeValue) ? '' : ''" 
                    class="btn" :for="'btnradioQty' + l" 
                    style="border-radius: 90px; border: none;"
                >
                    
                    <div class="p-2" v-if="attributeValue?.extras?.valueType == 'TEXT'">{{ attributeValue.extras.value }}</div>
                </label>
            </div>
        </div>
    </div>

    <div class="d-flex row my-3 gx-2 col-12 btn-group" v-else>
        <!-- <span class="col-2  mt-2 d-flex align-items-start justify-content-start text-black" style="font-weight: 700;">{{ attributeName }}:  </span> -->
        <span class="col-2 mt-2 d-flex align-items-start justify-content-start fs-4" style="font-weight: 700;">Size:  </span>
        
        <div class="flex-wrap col-10 d-flex align-items-start justify-content-start">
            <div 
                class="attribute-body rounded-pill border border-1 col-2 mx-1 mb-1 d-flex align-items-center justify-content-center"
                v-for="(attributeValue, l) in attribute.values" 
                :key="l"
                :class="{'active': isActive(attributeValue) && stockAvailability(attributeValue) ? true : false}" 
                @click.prevent="setSelectedAttribute(attributeValue)"
            >
                <input type="radio" class="btn-check text-black shadow-none" name="btnradio"
                    :id="'btnradioQty'" autocomplete="off"
                />
                    <!-- v-model="quantity"  -->
                <label 
                    :class="isActive(attributeValue) ? '' : ''" 
                    class="btn position-relative d-flex justify-content-center align-items-center fw-bold" :for="'btnradioQty' + l" 
                    style="border-radius: 90px; border: none; font-size: 11px;"
                >
                <!-- overflow-hidden  -->
                    <div class="fs-5">{{ attributeValue.name }}</div>
                    <div v-if="!stockAvailability(attributeValue)" class="size-buttons-size-strike-show"></div>
                    <!-- <div v-if="!stockAvailability && attributeName.toUpperCase() == 'SIZE'" class="size-buttons-size-strike-show"></div> -->
                </label>
            </div>
        </div>
    </div>
    <div class="form-text" style="color: red;">{{ error }}</div>
</template>

<script setup>
import { useVModel } from "~/libs/fuel-station/useVModel";

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => {
            return [];
        }
    },
    index: {
        type: Number,
        default: -1
    },
    attribute: {
        type: Object,
        default: null
    },
    stocks: {
        type: Array,
        default: () => {
            return [];
        },
    },
    selectedLocation: {
        type: String,
        default: "",
    },
    error: {
        type: String,
        default: ''
    }
});
const attributeRef = toRef(props, 'attribute');
const stocksRef = toRef(props, "stocks");
const selectedLocationRef = toRef(props, "selectedLocation");

const selectedAttributes = ref([]);
const selectedAttribute = ref(null);
const activeAttribute = ref("");
const collapse = ref(false);


// selectedAttribute.value = attributeRef.value.values[0];

const emit = defineEmits(['update:modelValue', 'selectImage', 'animate']);
const modelValueRef = useVModel(props, emit, "modelValue");

const attributeName = computed(() => {
    if(props.attribute && props.attribute.name) {
        return props.attribute.name;
    }

    return '';
});

const setSelectedAttribute = async (att) => {

    selectedAttribute.value = att;
    selectedAttributes.value.push(att);
    
    emit('selectImage', modelValueRef.value);
    emit('animate');
};

const isActive = (attr) => {
    let val = false;
    if (attr && selectedAttribute.value && attr.id && selectedAttribute.value.id && attr.id == selectedAttribute.value.id) {
        if (attr.extrasType) {
            if (attr.extrasType != 'IMAGE') {
                if (attr.extrasType != 'COLOR') {
                    val = true;
                }
            }
        } else {
            val = true;
        }
    }
    return val
}

const setExtras = (attr) => {
    if (attr.extras) {
        if (attr.extras?.valueType === 'COLOR') {
            return  attr.extras.value?.length ? attr.extras.value : attr.name;
        }
        if (attr.extras.valueType === 'TEXT') {
            return '#fff';
        }
    } 
    return attr.name;
}

const hasSize = computed(() => {
    let has = false;
    if (attributeRef.value && attributeRef.value.name.toUpperCase() == "SIZE" || attributeRef.value.name.toUpperCase() == "BABY SIZE") {
        if (attributeRef.value.values && attributeRef.value.values.length > 1) {
            has = true;
        }
    } else {
        has = true;
    }
    return has
})

const collapseAttribute = (name) => {
    collapse.value = !collapse.value;
    activeAttribute.value = name;
}

// const stockAvailability = computed(() => {
// 	let boolArray = [];

// 	if (attributeRef.value && attributeRef.value.values.length > 0) {
// 		attributeRef.value.values.forEach(sku => {
// 			let stockObject = stocksRef.value.find(s => s.skuCode === sku.code && s.locationId == selectedLocationRef.value);
           
// 			if (attributeRef.value && stockObject) {
// 				let stock = stockObject.ok;
// 				if(stock > 0) boolArray.push(false);
// 				else boolArray.push(true);
// 			} else boolArray.push(true);
// 		});
// 		return boolArray;
// 	}
// 	return boolArray;
// });

// const stockAvailability = computed(() => {
// 	let boolArray = false;

// 	if (attributeRef.value && attributeRef.value.values.length > 0) {
// 		attributeRef.value.values.forEach(sku => {
// 			let stockObject = stocksRef.value.find(s => s.skuCode === sku.code);
// 			if (attributeRef.value && stockObject) {
// 				let stock = stockObject.ok;
// 				if(stock > 0) boolArray = true;
// 				else boolArray = false;
// 			} else boolArray = false;
// 		});
// 		return boolArray;
// 	}
// 	return boolArray;
// });

const stockAvailability = (sku) => {
	let boolArray = false;
    let stockObject = stocksRef.value.find(s => s.skuCode === sku.code);
    if (attributeRef.value && stockObject) {
        let stock = stockObject.ok;
        if(stock > 0) boolArray = true;
        else boolArray = false;
    } else boolArray = false;
	return boolArray;
};

watch(selectedAttribute, () => {

    if (selectedAttribute.value && selectedAttribute.value != null) {
        let values = [];
        if (modelValueRef.value.length > 0) {

            let clone = modelValueRef.value.filter((s) => s.optionId == selectedAttribute.value.optionId);
           
            if (clone.length > 0) {
                values = modelValueRef.value.filter((s) => s.optionId != selectedAttribute.value.optionId);
                values.push(selectedAttribute.value);
                modelValueRef.value = values;
            } else {
                modelValueRef.value.push(selectedAttribute.value);
            }
        } else {
            modelValueRef.value.push(selectedAttribute.value);
        }
        emit('selectImage', modelValueRef.value);
    }
}, { immediate: true }, { deep: true });

watch(() => props.attribute, ()=> {
    if(props.attribute && props.attribute.name && props.attribute.name.toUpperCase() == 'COLOR') {
        if(props.attribute.values.length) {
            selectedAttribute.value = props.attribute.values[0];
            selectedAttributes.value.push(props.attribute.values[0]);
        }
    }
}, {immediate: true}, {deep: true});

</script>

<style lang="scss" scoped>
.active {
    box-shadow: 0px 2px 8px 0px #e6e6e6 !important;
    // border: 1px solid #DEDEDE !important;
    border: 2px solid #1C1C24 !important;
}

.size-buttons-size-strike-show {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #b3b3b3;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
</style>