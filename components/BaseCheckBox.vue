<template>
    <label :for="value" raw :class="classes">
        <input
            v-model="modelValueRef"
            type="checkbox"
            :id="id"
            :value="value"
            :name="id"
            @change="$emit('onChange', $event)"
            :checked="checked"
        />
        <span></span>
        {{ props.label }}
    </label>
    
</template>

<script setup>
import {useVModel} from "@/libs/fuel-station/useVModel";

const props = defineProps({
    modelValue: {
        type: [Array, Boolean, String, Object],
        default: null
    },
    value: {
        type: [Object, Boolean, Number, String],
        default: null
    },
    label: {
        type: String,
        default: 'Check Box'
    },
    color: {
        type: String,
        default: 'success'
    },
    checked: {
        type: Boolean,
        default: true
    },
    trueValue: {
        type: Boolean,
        default: true
    },
    falseValue: {
        type: Boolean,
        default: false
    },
    circle: {
        type: Boolean,
        default: false
    },
    solid: {
        type: Boolean,
        default: false
    },
    paddingless: {
        type: Boolean,
        default: false
    },
    wrapperClass: {
        type: Array,
        default: () => [],
    },
    id: {
        type: [String, Number],
        default: ''
    },
});
const emits = defineEmits(['update:modelValue']);
const modelValueRef = useVModel(props, emits, 'modelValue');


const classes = computed(() => {
    if (props.raw) return [props.wrapperClass];

    return [
        'checkbox',
        props.wrapperClass,
        props.solid ? 'is-solid' : 'is-outlined',
        props.circle ? 'is-circle' : 'is-square',
        props.color ? `is-${props.color}` : 'is-success',
        props.paddingless ? 'is-paddingless' : '',
    ];
});

</script>

<style lang="scss">
%controller {
    position: relative;
    cursor: pointer;
    padding: .5em 0;

    &::selection {
        background: transparent;
    }

    input + span {
        position: relative;
        top: -1px;
        background: #ffff;
        content: '';
        display: inline-block;
        margin: 0 0.5em 0 0;
        padding: 0;
        vertical-align: middle;
        width: 1.4em;
        height: 1.4em;
        border: 1px solid gray;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;

        &::after {
            content: '';
            display: block;
            transform: scale(0);
            transition: transform 0.2s;
        }
    }

    @media screen and (min-width: 768px) {
        &:hover input + span {
            box-shadow: 0 2px 4px rgba(#000, 0.15);
        }
    }

    input:active + span {
        box-shadow: 0 4px 8px rgba(#000, 0.15);
    }

    input:checked + span::after {
        transform: translate(-50%, -50%) scale(1) !important;
    }

    input {
        position: absolute;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s; // transition-all test
    }
}

.checkbox {
    @extend %controller;

    color: rgb(64, 64, 64);

    &:hover,
    &:focus {
        color: rgb(64, 64, 64);
    }

    &.is-paddingless {
        padding: 0 !important;
    }

    &.is-circle {
        input + span {
            border-radius: 90px;
        }
    }

    &.is-square {
        input + span {
            border-radius: 5px !important;
        }
    }

    &.is-solid {
        input + span {
            background: gray;
        }

        &.is-primary {
            input + span {
                border-color: #1a227f;
                background: #1a227f;

                &::after {
                    color: #ffff;
                }
            }
        }

        &.is-success {
            input + span {
                border-color: #667632;
                background: #667632;

                &::after {
                    color: #ffff;
                }
            }
        }

        &.is-info {
            input + span {
                border-color: #1a227f;
                background: #1a227f;

                &::after {
                    color: #ffff;
                }
            }
        }

        &.is-warning {
            input + span {
                border-color: #f9af4e;
                background: #f9af4e;

                &::after {
                    color: #ffff;
                }
            }
        }

        &.is-danger {
            input + span {
                border-color: brown;
                background: brown;

                &::after {
                    color: #ffff;
                }
            }
        }
    }

    &.is-outlined {
        &.is-primary {
            input:checked + span {
                border-color: #1a227f;
            }

            input + span {
                &::after {
                    color: #1a227f;
                }
            }
        }

        &.is-success {
            input:checked + span {
                border-color: #667632;
            }

            input + span {
                &::after {
                    color: #667632;
                }
            }
        }

        &.is-info {
            input:checked + span {
                border-color: #1a227f;
            }

            input + span {
                &::after {
                    color: #1a227f;
                }
            }
        }

        &.is-warning {
            input:checked + span {
                border-color: #f9af4e;
            }

            input + span {
                &::after {
                    color: #f9af4e;
                }
            }
        }

        &.is-danger {
            input:checked + span {
                border-color: brown;
            }

            input + span {
                &::after {
                    color: brown;
                }
            }
        }
    }

    input + span {
        border-radius: 5px;
        transition: all 0.3s; // transition-all test

        &::after {
            background-size: contain;
            position: absolute;
            top: 48%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            content: '\f00c';
            font-family: 'Font Awesome\ 5 Free';
            font-weight: 900;
            font-size: 0.7rem;
        }
    }

    input:focus + span,
    input:active + span {
        outline-offset: 3px;
        outline-width: 1px;
        outline-color: gray;
        outline-style: dashed;
    }
}

</style>