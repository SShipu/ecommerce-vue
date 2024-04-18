<template>
    <div>
        <div class="modal fade" :class="{ show: show }" id="staticBackdrop" data-bs-backdrop="static"
            data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">{{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click.prevent="$emit('close')"></button>
                    </div>
                    <div class="modal-body">
                        <slot>...</slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click.prevent="$emit('close')">{{ closeLabel }}</button>
                        <slot name="action"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "Alert title",
    },
    closeLabel: {
        type: String,
        default: "Close",
    },
    show: {
        type: Boolean,
        default: false,
    },
});


watch(()=> props.show, ()=> {
    if (process.client) {
        const body = document.querySelector("body");
        if (props.show) body.style.setProperty("overflow", "hidden");
        else body.style.removeProperty("overflow");
    }
}, {immediate: true, deep: true});
</script>

<style lang="scss" scoped>
.show {
    display: block !important;
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    
}
.modal {
    position: fixed;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.6);
    transition: 0.2s all;
    z-index: 1025;
}
</style>