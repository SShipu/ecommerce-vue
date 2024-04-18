<template>
    <div class="selector_container">
        <label class="typo__label">{{ label }} </label>
        <Multiselect
            v-model="selectedId"
            mode="single"
            value-prop="id"
            :filter-results="true"
            :resolve-on-load="true"
            label="name"
            :min-chars="1"
            :delay="0"
            :closeonselect="isCloseOnSelect"
            :searchable="isSearchable"
            :options="
                async (query) => {
                    return await search(query);
                }
            "
            :class="classes"
            :style="styles"
        >
            <template #singlelabel="{ value }">
                <div class="multiselect-single-label" v-if="value.name">
                    <span class="select-label-text" >
                        {{ value.name ? value.name : value }}
                    </span>
                </div>
            </template>

            <template #option="{ option }">
                <strong v-if="option.name">{{ option.name }}</strong>
            </template>
        </Multiselect>
        
        <pre class="error_message"><code>{{ error  }}</code></pre>
    </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.scss'
import {useVModel} from "@/libs/fuel-station/useVModel";

const props = defineProps({
    modelValue: {
        type: [Object, Array, String, Number],
        default: ()=> null,
    },
    options: {
        type: Array,
        default: ()=> [],
    },
    error: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: 'Selector',
    },
    placeholder: {
        type: String,
        default: 'Select One',
    },
    classes: {
        type: String,
        default: '',
    },
    styles: {
        type: String,
        default: '',
    },
    isSearchable: {
        type: Boolean,
        default: false,
    },
    isCloseOnSelect: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);
const selectedItem = useVModel(props, emit, 'modelValue');
const selectedId = ref('');

const search = async (query) => {
    return props.options;
};

watch(selectedId, (newVal) => {
    let id = newVal ? newVal : "";

    
    let index = props.options.findIndex((c) => c.id == id);

    if (index > -1) selectedItem.value = props.options[index];
    else selectedItem.value = null;
});

watch(
    () => props.modelValue,
    (newVal) => {

        let id = newVal && newVal.id ? newVal.id : '';
        let index = props.options.findIndex((c) => c.id  == id);

        if (index > -1) {
            selectedId.value = props.options[index].id;
        } else {
            selectedId.value = null;
        }
    },{immediate: true}
);

</script>

<style lang="scss">
.selector_container {
    .error_message {
        color: red;
    }
}
.multiselect .is-active {
    box-shadow: none !important;
}
.multiselect-option.is-pointed {
  background: var(--ms-option-bg-pointed, #F3F4F6);
  color: var(--ms-option-color-pointed, #1F2937);
}

.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-pointed, #F3F4F6) !important;
  color: var(--ms-option-color-pointed, #1F2937) !important;
}

.multiselect-option.is-selected {
    background: var(--ms-option-bg-pointed, #0000) !important;
    background: #1F2937 !important;
    &:hover {
        color: #ffff
    }
}
</style>