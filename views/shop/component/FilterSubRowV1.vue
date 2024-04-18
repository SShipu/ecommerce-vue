<template>
    <label class="item-body my-1 px-2 py-1" :class="{'active-cate-body': isChecked}" v-if="props.singleItem && (props.singleItem.id.length > 0) || (props.singleItem.id != '')" style="cursor: pointer; display: flex; column-gap: 15px; position: relative;">
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
        
        <span v-if="props.singleItem.name">{{ props.singleItem.name }}</span>
        <span v-else>{{ props.singleItem.title }}</span>
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
    }
});

const selectedItemsRef = toRef(props, 'selectedItems');
const selectItem = ref([]);

const isChecked = computed(() => {
    let checked = false;
    if (selectedItemsRef.value && selectedItemsRef.value.length > 0 ) {
        if (props.singleItem && props.singleItem.id) {
            checked = selectedItemsRef.value.map(c => c.id).includes(props.singleItem.id);
        }
    }
    return checked;
});

</script>

<style lang="scss">
.active-cate-body {
    border-radius: 60px;
    background: #F3F3F3; 
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
</style>