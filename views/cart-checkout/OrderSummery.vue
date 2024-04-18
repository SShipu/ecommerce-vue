<template>
    <div class="c-order-review mt-3 px-1 px-sm-2 overflow-hidden">
        <!-- <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
            <h4 class="m-0">3. Order Review</h4>
        </div>
         -->

        <div class="col-12">
            <div
                class="border-bottom pe-3 h-25vh overflow-y-scroll"
                style="overflow-x: hidden"
            >
                <!-- <span class="fs-2" style="color: #202028; font-weight: 600;">Add Gift Card/Promot</span> -->

                <div v-if="cartStore.items.length">
                    <OrderSummeryItem
                        v-for="(item, i) in cartStore.items"
                        :key="i"
                        :item="item"
                    />
                </div>

                <div
                    v-else
                    class="d-none d-xl-block card my-4 rounded-3"
                    style="background-color: #fafafa"
                >
                    <div
                        class="card-body d-flex justify-content-center flex-column align-items-center"
                    >
                        <div class="">
                            <span class="fs-4 fw-bold" style="color: #202028"
                                >your Cart is Empty
                            </span>
                        </div>

                        <div
                            class="my-4 d-flex btn-group"
                            role="group"
                            aria-label="Basic outlined example"
                        >
                            <button
                                type="button"
                                class="ms-2 rounded-5 px-3 py-1 btn c-btn-primary fs-5 py-2"
                                @click.prevent="goTo('shop')"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div
                class="card mt-3 rounded-3"
                style="background-color: #fafafa; border: 1px solid #d1d1d1"
            >
                <div
                    class="d-flex justify-content-between align-items-center px-2 pt-2"
                >
                    <h4>Add Gift Box(TK.100/-)</h4>

                    <p
                        class="m-0 fs-5 fw-bolder cursor-pointer"
                        @click="
                            packagingInstructions.isGiftWrap =
                                !packagingInstructions.isGiftWrap
                        "
                    >
                        🎁
                        <span
                            class="text-decoration-underline text-blue"
                            v-if="!packagingInstructions.isGiftWrap"
                            >ADD</span
                        >
                        <span class="text-decoration-underline text-red" v-else
                            >REMOVE</span
                        >
                    </p>

                    <!-- <BaseCheckBox 
                        v-model="packagingInstructions.isGiftWrap" 
                        label="🎁 Gift Wrap this item?"
                        class="d-flex justify-content-start my-2"
                    /> -->
                </div>
                <div class="card-body d-flex p-0 p-2">
                    <div class="col-12">
                        <div class="row px-2 mb-2">
                            <div
                                class="col-2 px-0 d-flex justify-content-start align-items-center"
                            >
                                <img
                                    src="/images/pmt.jpg"
                                    class="img-fluid"
                                    style="width: auto; height: 80px"
                                    alt=""
                                />
                            </div>
                            <div
                                class="col-6 col-lg-7 col-md-7 d-flex align-items-center"
                            >
                                <div class="me-1">
                                    <h4>Lil Star Premium Gift Box</h4>
                                    <p>
                                        Lil stars Items will be wrapped in a
                                        Premium Gift Box
                                    </p>
                                </div>
                            </div>
                            <div
                                class="col-4 col-lg-3 col-md-3 d-flex align-items-center"
                                v-if="packagingInstructions.isGiftWrap"
                            >
                                <div class="me-1">
                                    <h4 class="m-0 text-center">Gift box</h4>
                                    <div class="num_count d-flex rounded-pill">
                                        <div id="minus" class="minus">
                                            <button
                                                class="btn"
                                                @click.prevent="
                                                    packagingInstructions.quantity >
                                                    1
                                                        ? (packagingInstructions.quantity -= 1)
                                                        : 1
                                                "
                                            >
                                                <i class="fas fa-minus"></i>
                                            </button>
                                        </div>

                                        <input
                                            id="qty1"
                                            v-model="
                                                packagingInstructions.quantity
                                            "
                                            :disabled="true"
                                            type="text"
                                            class="qty"
                                        />

                                        <div id="add" class="add">
                                            <button
                                                class="btn"
                                                @click.prevent="
                                                    packagingInstructions.quantity >=
                                                    1
                                                        ? (packagingInstructions.quantity += 1)
                                                        : 1
                                                "
                                            >
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="row px-2"
                            v-if="packagingInstructions.isGiftWrap"
                        >
                            <!-- <div class="col-6">
                                <div class="row mb-3 me-1">
                                    <label for="floatingInput" class="ps-0 text-davys-grey">Sender</label>
                                    <input 
                                        type="text" 
                                        class="form-control rounded-3 text-black" 
                                        id="floatingInput" 
                                        placeholder="Sender"
                                        v-model="packagingInstructions.sender"
                                    >
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row mb-3">
                                    <label for="floatingInput" class="ps-0 text-davys-grey">Recipient</label>
                                    <input 
                                        type="text" 
                                        class="form-control rounded-3 text-black" 
                                        id="floatingInput" 
                                        placeholder="Recipient"
                                        v-model="packagingInstructions.recipient"
                                    >
                                </div>
                            </div> -->
                            <div class="col-12">
                                <div class="row mb-3">
                                    <label
                                        for="floatingInput"
                                        class="ps-0 text-davys-grey"
                                        >Message</label
                                    >
                                    <textarea
                                        class="rounded-3 border border-light outline-none text-black"
                                        name=""
                                        id=""
                                        cols="6"
                                        rows="4"
                                        placeholder="Message"
                                        v-model="packagingInstructions.message"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="py-2 border-bottom row">
                <div class="col-12 input-wrapper p-1">
                    <label for="floatingInput" class="ps-0">Note</label>
                    <input
                        class="w-100 ps-2"
                        v-model="note"
                        placeholder="Note"
                        type="text"
                    />
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="py-2 border-bottom row">
                <div class="col-9 col-md-8 col-xxl-10 input-wrapper p-1">
                    <input
                        class="w-100 ps-2"
                        v-model="couponCode"
                        placeholder="Coupon Code"
                        type="text"
                    />
                </div>
                <div class="col-3 col-md-4 col-xxl-2 py-1">
                    <button
                        :disabled="isLoading"
                        class="c-btn-gray d-flex rounded-pill w-100 d-flex justify-content-center"
                        @click.prevent="applyCoupon()"
                    >
                        <span
                            v-show="isLoading"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Apply
                    </button>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="py-2 border-bottom pe-3">
                <!-- {{ cartStore }} -->
                <div class="d-flex" style="justify-content: space-between">
                    <span style="font-size: 17px; font-weight: 600"
                        >Total Items</span
                    >
                    <span style="font-size: 17px; font-weight: 700" v-if="cartStore.coupon > 0">
                        Tk.{{ cartStore.total }}
                    </span>
                    <span style="font-size: 17px; font-weight: 700" v-else>
                        Tk.{{ cartStore.discountedTotal }}
                    </span>
                </div>

                <div
                    class="d-flex"
                    style="justify-content: space-between"
                    v-if="cartStore.totalGiftWrapFee > 0"
                >
                    <span style="font-size: 17px; font-weight: 600"
                        >Gift Package Wrap</span
                    >
                    <span style="font-size: 17px; font-weight: 700"
                        >Tk.{{ cartStore.totalGiftWrapFee }}</span
                    >
                </div>

                <div class="d-flex" style="justify-content: space-between">
                    <span style="font-size: 17px; font-weight: 600"
                        >Shipping</span
                    >
                    <span style="font-size: 17px; font-weight: 700"
                        >Tk.{{ cartStore.shippingCost }}</span
                    >
                </div>

                <!-- <div class="d-flex" style="justify-content: space-between;">
                    <span style="font-size: 17px; font-weight: 600;">Vat ({{vatRate}}%)</span>
                    <span style="font-size: 17px; font-weight: 700;">Tk.{{ vat }}</span>
                </div> -->
                <div
                    class="d-flex"
                    style="justify-content: space-between"
                    v-if="showDiscount"
                >
                    <span style="font-size: 17px; font-weight: 600"
                        >Discount ({{couponAmount}}%)</span
                    >
                    <span style="font-size: 17px; font-weight: 700"
                        >Tk.{{ totalCouponDiscount }}</span
                    >
                </div>
            </div>
        </div>

        <div class="col-12">
            <div
                class="py-2 pe-3 d-flex"
                style="justify-content: space-between"
            >
                <span style="font-size: 17px; font-weight: 600">Total</span>
                <span style="font-size: 17px; font-weight: 700"
                    >Tk.{{ total }}</span
                >
            </div>
        </div>
        <div
            class="col-12 my-4 d-flex justify-content-center d-lg-none d-xl-none"
            style="justify-content: space-between"
        >
            <div class="mb-3 mb-md-0 px-1 px-md-0 w-100">
                <div
                    class="text-center c-btn-primary"
                    @click.prevent="onSubmit"
                >
                    Checkout
                </div>
            </div>
        </div>
    </div>
    <ModalBaseAlert 
        title="Coupon Alert" 
        :show="showAlert" 
        @close="showAlert = false" 
        maxWidth="40%" 
        body-style="padding: 0"
    >
        <div class="w-100 h-100 position-relative overflow-auto d-flex justify-content-center">
            <h3>
                {{couponMessage}}
            </h3>
        </div>
    </ModalBaseAlert>
</template>

<script setup>
// import { emit } from "process";
import OrderSummeryItem from "./item/OrderSummeryItem.vue";
import { useCartStore } from "~~/stores/cart";
import { itemsClient } from "@/libs/gandalf/apis/config.js";

const cartStore = useCartStore();
const emit = defineEmits(["order-summery", "onSubmit"]);
const code = ref("");
const couponCode = ref("");
const couponAmount = ref(0);
const note = ref("");
const showDiscount = ref(false);
const isLoading = ref(false);
const showAlert = ref(false);
const vatRate = ref(0);
const couponMessage = ref('');
const router = useRouter();

const packagingInstructions = ref({
    isGiftWrap: false,
    sender: "",
    recipient: "",
    message: "",
    quantity: 1,
    fee: 100,
});

const goTo = (name) => {
    router.push({ name: name });
};
const onSubmit = (name) => {
    emit('onSubmit');
};

const totalCouponDiscount = computed(() => {
    if (cartStore.coupon) {
        return Math.ceil((Number(cartStore.total) * Number(cartStore.coupon)) / 100);
    }
    return 0;
});

const vat = computed(() => {
    return (Number(cartStore.total) * Number(vatRate.value)) / 100;
});

const total = computed(() => {
    let total = cartStore.coupon > 0 ? cartStore.total : cartStore.discountedTotal;
    return (
        Number(total) -
        Number(totalCouponDiscount.value) +
        Number(vat.value) +
        Number(cartStore.shippingCost) +
        Number(cartStore.totalGiftWrapFee)
    );
});

const applyCoupon = async () => {
    isLoading.value = true;

    let data = {
        couponCode: "",
        amount: 0,
    };
    
    if (couponCode.value.length) {
        let res = await itemsClient.applyCoupon({ code: couponCode.value });
        if (res.status == 200 && !res.networkError) {
            if (res?.body?.value > 0) {
                data.couponCode = res.body.name;
                data.amount = res.body.value;
                couponAmount.value = res.body.value;
                showDiscount.value = true;
            }
        } else {
            showDiscount.value = false;
            couponMessage.value = "Coupon Code Not Valid"
            showAlert.value = true;
            couponAmount.value = 0;
            couponCode.value = "";
        }
    } else {
        showDiscount.value = false;
        couponAmount.value = 0;
        couponCode.value = "";
    }

    cartStore.addCoupon(data.amount);
    if (process.client) {
        localStorage.setItem("coupon", JSON.stringify(data));
    }

    setTimeout(() => {
        isLoading.value = false;
    }, 200);
};

const addGiftPackageWrap = (val) => {
    cartStore.addGiftPackageWrap(val);
};

const addNote = (val) => {
    cartStore.addNote(val);
};

const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const debouncePackaging = debounce(addGiftPackageWrap, 500);
const debounceNote = debounce(addNote, 500);

watch(
    packagingInstructions,
    () => {
        debouncePackaging(packagingInstructions.value);
    },
    { deep: true }
);

watch(
    note,
    () => {
        debounceNote(note.value);
    },
    { deep: true }
);

watch(
    cartStore,
    () => {
        if (cartStore?.packagingInstructions?.isGiftWrap) {
            packagingInstructions.value = cartStore.packagingInstructions;
        }
        if (cartStore?.note) {
            note.value = cartStore.note;
        }
    },
    { deep: true }
);

watch(
    total,
    () => {
        emit("order-summery", total.value);
    },
    { immediate: true, deep: true }
);

onMounted(() => {
    if (process.client) {
        let data = JSON.parse(localStorage.getItem("coupon"));
        if (data && data.couponCode) {
            showDiscount.value = true;
            code.value = data.couponCode;
            couponCode.value = data.couponCode;
        }
    }
});
</script>

<style lang="scss" scoped>
.c-order-review {
    .c-btn-gray {
        background-color: #2277e0;
        color: #ffff !important;
        // border-radius: 5px !important;
        font-weight: 700 !important;
        padding: 10px 30px;
        cursor: pointer;
        box-shadow: none;
        border: none;
    }

    .c-btn-gray:hover {
        border: 1px solid #2277e0;
        color: #1c1c24 !important;
        font-weight: 700 !important;
        background-color: #ffff;
    }
    .input-wrapper {
        position: relative;
        input {
            // border: 1px solid gray;
            // border-radius: 6px;
            position: relative;
            // width: 100%;
            // margin: 10px;
            line-height: 2.75rem;

            border-radius: 7px;
            border: 1px solid #d1d1d1;
            background: #fff;
            // padding-left: 20px;
        }
    }
    .c-btn-primary {
        background-color: #2277e0;
        color: #ffff !important;
        border-radius: 35px !important;
        font-weight: 700 !important;
    }

    .c-btn-primary:hover {
        border: 1px solid #2277e0;
        color: #1c1c24 !important;
        font-weight: 700 !important;
        background-color: #ffff;
    }
    .num_count {
        width: 100%;
        // width: 160px;
        height: 35px;
        -webkit-box-shadow: 0px 1px 10px 5px #f4f4f4;
        box-shadow: 0px 1px 10px 5px #f4f4f4;
        position: relative;
        border-radius: 15px;
        border: 1px solid #556477;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .num_count input {
        width: 40%;
        text-align: center;
        margin: 0 auto;
        border: none;
    }

    .num_count button {
        padding: 0;
    }

    .num_count .minus {
        left: 0px;
        display: flex;
        cursor: pointer;
        color: #1f2230;
        position: absolute;
        height: inherit;
        width: 30%;
        text-align: center;
        border-right: 1px solid #556477;
    }
    .num_count button,
    .num_count button:focus {
        width: 100%;
        border: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 20px;
    }

    .num_count .add {
        position: absolute;
        display: flex;
        right: 0px;
        cursor: pointer;
        width: 30%;
        height: inherit;
        color: #1f2230;
        border-left: 1px solid #556477;
    }

    .num_count .minus button {
        text-align: center;
    }

    .num_count .add button {
        text-align: center;
    }

    .c-remove-section {
        .c-trash {
            font-size: 12px !important;
            color: #2277e0;
            font-weight: 400 !important;
        }

        .c-remove-text {
            font-size: 14px !important;
            color: #2277e0;
        }
    }

    @media (max-width: 776px) {
        .c-remove-section {
            .c-trash {
                font-size: 12px !important;
            }

            .c-remove-text {
                font-size: 14px !important;
            }
        }
    }
}

.num_count {
    width: 120px;
    height: 45px;
    -webkit-box-shadow: 0px 1px 10px 5px #f4f4f4;
    box-shadow: 0px 1px 10px 5px #f4f4f4;
    position: relative;
    // border-radius: 35px;
    border: 1px solid #2277e0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.num_count input {
    width: 50px;
    text-align: center;
    margin: 0 auto;
    border: none;
    font-size: 18px;
    font-weight: 700;
}

.num_count button {
    padding: 0;

    i {
        font-size: 14px;
    }
}

.num_count .minus {
    left: 0px;
    display: flex;
    cursor: pointer;
    color: #1f2230;
    position: absolute;
    height: inherit;
    width: 35px;
    text-align: center;
    border-right: 1px solid #2277e0;
}

.num_count button,
.num_count button:focus {
    width: 100%;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 20px;
}

.num_count .add {
    position: absolute;
    display: flex;
    right: 0px;
    cursor: pointer;
    width: 35px;
    height: inherit;
    color: #1f2230;
    border-left: 1px solid #2277e0;
}

.num_count .minus button {
    text-align: center;
}

.num_count .add button {
    text-align: center;
}

.c-btn-primary {
    padding: 10px 30px;
    cursor: pointer;
}
</style>
