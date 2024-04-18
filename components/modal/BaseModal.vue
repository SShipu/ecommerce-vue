<template>
    <div>
        <div class="modal fade" :class="{ show: show }" id="staticBackdrop" data-bs-backdrop="static"
            data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" :style="{maxWidth: `${modalWidth}`}">
                <div class="modal-content bg-image position-relative" :style="bgImgStyle">
                    <div class="overlay w-100 h-100 position-absolute" v-if="bgImgStyle"></div>
                    <div class="modal-header" :class="{'border-0': bgImgStyle}">
                        <h3 class="modal-title text-black" id="staticBackdropLabel">{{ title }}</h3>
                        <button type="button" class="btn-close rounded-circle " :class="{'bg-gray': bgImgStyle}" data-bs-dismiss="modal" aria-label="Close"
                            @click.prevent="$emit('close')"
                            style="z-index: 99;"
                            ></button>
                    </div>
                    <div class="modal-body" :style="bodyStyle">
                        <slot>...</slot>
                    </div>
                    <div class="modal-footer" v-if="modalFooter">
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
        default: "Modal title",
    },
    closeLabel: {
        type: String,
        default: "Close",
    },
    bgImgStyle: {
        type: [Object, String],
        default: "",
    },
    bodyStyle: {
        type: String,
        default: "",
    },
    maxWidth: {
        type: String,
        default: "",
    },
    show: {
        type: Boolean,
        default: false,
    },
    nonScroll: {
        type: Boolean,
        default: true,
    },
    modalFooter: {
        type: Boolean,
        default: true,
    },
});

const currentScreen = ref(process.client ? window.screen.width : 0);
// const modalMargin = ref('var(--ct-modal-margin)')

const modalWidth = computed(()=> {
    let width = ""
    if (currentScreen.value >= 1024) {
        if (props.maxWidth?.length) {
            width = props.maxWidth
        }
    }
    return width;
});

const checkScroll = () => {
    if (process.client) {
        const body = document.querySelector("body");
        if (props.nonScroll && props.show) {
            body.style.setProperty("overflow", "hidden")
        } else if (props.nonScroll && !props.show) {
            body.style.removeProperty("overflow")
        }
    }
}

watchEffect(checkScroll);

onUnmounted(() => {
    if (process.client) {
        const body = document.querySelector("body");
        body.style.removeProperty("overflow")
    }
})
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

@media screen and (max-width: 1023px) {
    .modal {
        padding: 0 2%;
    }
    .modal-dialog {
        max-width: 100% !important;
        margin: 0 !important;
    }
    .modal-content {
        height: 100vh;
    }
}
</style>