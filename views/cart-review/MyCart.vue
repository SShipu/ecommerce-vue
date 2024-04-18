<template>
    <div class="c-my-cart row  my-4 d-flex justify-content-between border-bottom">
        <div class="col-12 text-center border-bottom pb-2">
            <span class="fs-2" style="color: #202028; font-weight: 700;">Bag</span>
        </div>

        <!-- left side card -->
        <div class="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7 col-xxl-7">
            <div v-if="cartStore.items.length">
                <CartItem 
                    v-for="(item, i) in cartStore.items" 
                    :key="i" 
                    :item="item" 
                    class="d-flex row mt-2"
                />
            </div>

            <div v-else class="d-none d-xl-block card my-4 rounded-3 " style="background-color: #FAFAFA; border: 1px solid #d1d1d1">
                <div class="card-body d-flex justify-content-center flex-column align-items-center">
                    <div class="">
                        <span class="fs-4 fw-bold" style="color: #202028;">your Cart is Empty </span>
                    </div>

                    <div class="my-4 d-flex btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class=" ms-2 rounded-5 px-2 py-1 btn c-btn-primary fs-5 py-2" @click.prevent="goTo('shop')">Continue Shopping</button>
                    </div>
                </div>
            </div>

            <!-- bottom card -->
            <!-- <div class="d-none d-xl-block card mt-2 rounded-3 " style="background-color: #FAFAFA; border: 1px solid #d1d1d1">
                <div class="card-body d-flex">
                    <div class="col-6">
                        <BaseCheckBox 
                            v-model="packagingInstructions.isGiftWrap" 
                            label="🎁 Gift Wrap this item?"
                            class="d-flex justify-content-start my-2"
                        />
                        <div class="row px-2" v-if="packagingInstructions.isGiftWrap">
                            <div class="col-6">
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
                            </div>
                            <div class="col-12">
                                <div class="row mb-3">
                                    <label for="floatingInput" class="ps-0 text-davys-grey">Message</label>
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
            </div> -->

        </div>
                    

        <!-- right side card -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-4 pt-3 m-sm-0 ">
            <!-- position-relative h-40vh -->
            <div class="">
                <!-- position-fixed w-inherit -->
                <div class="card rounded-4 w-100">
                    <div class="card-body">
                        <!-- {{ cartStore }} -->
                        <div class="flex-row d-flex justify-content-between">
                            <h4 style="color: #202028;" class="card-title fs-4">Item Subtotal</h4>
                            <h4 style="color: #202028;" class="fs-4">Tk {{ cartStore.discountedTotal }}</h4>
                        </div>
                        <div class="flex-row d-flex justify-content-between" v-if="cartStore.totalGiftWrapFee > 0">
                            <h4 style="color: #202028;" class="card-title fs-4">Gift Package Wrap</h4>
                            <h4 style="color: #202028;" class="fs-4">Tk {{ cartStore.totalGiftWrapFee }}</h4>
                        </div>
                        <!-- <div class="flex-row d-flex justify-content-between">
                            <h5 style="color: #202028;" class="card-title ">Delivery</h5>
                            <h5 style="color: #202028;" >Free</h5>
                        </div> -->
    
                        <!-- <div class="flex-row d-flex justify-content-between border-bottom pb-2">
                            <h5 style="color: #202028;" class="card-title ">Vat</h5>
                            <h5 style="color: #202028;" >TK {{ vat }}</h5>
                        </div> -->
    
                        <div class="flex-row d-flex justify-content-between mt-3">
                            <h4 style="color: #202028;" class="card-title ">Total</h4>
                            <h4 style="color: #202028;" >TK {{ Number(cartStore.discountedTotal) + Number(vat) + Number(cartStore.totalGiftWrapFee)}}</h4>
                        </div>
    
                        <!-- <div class="flex-row d-flex justify-content-between">
                            <h5 style="color: #202028;" class="card-title ">You Save</h5>
                            <h5 style="color: #202028;" >TK {{ cartStore.totalDiscount }}</h5>
                        </div> -->
    
                        <div class="col-12 d-flex btn-group my-2" role="group" aria-label="Basic outlined example">
                            <button 
                                type="button" 
                                class="ms-2 rounded-5 px-0 px-lg-4 px-md-4 px-sm-4 py-1 btn c-btn-primary fs-4 py-2"
                                @click="goToCheckout"
                                :disabled="!cartStore.items.length"
                            >
                                Continue to Checkout
                            </button>
                        </div>
    
                        <!-- <div class="col-12 input-wrapper">
                            <label for="first">Apply Cupon</label>
                            <input v-model="cuponCode" type="text" placeholder="Enter Your Cupon Code">
                        </div> -->
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-3 payment-type">
                    <img src="/images/payments/master.png" class="img-fluid mx-1" alt="">
                    <img src="/images/payments/visa.png" class="img-fluid mx-1" alt="">
                    <img src="/images/payments/amarecan.png" class="img-fluid mx-1" alt="">
                    <img src="/images/payments/bkash.png" class="img-fluid mx-1" alt="">
                    <img src="/images/payments/rocket.png" class="img-fluid mx-1" alt="">
                    <img src="/images/payments/nogod.png" class="img-fluid mx-1" alt="">
                </div>
            </div>
        </div>
    </div>
    <ModalBaseToastr ref="toast"/> 
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useAuthStore } from '~~/stores/auth-store';
import CartItem from './CartItem-v2.vue';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
// const vat = ref(24);
const cuponCode = ref('');
const toast = ref(null);
const giftPacKage = ref(false);
const giftPacKageWrapPrice = ref(0);
const goTo = (name) => {
    router.push({name: name})
}
const vat = computed(() => {
    return Number(cartStore.total)*0/100;
});

const packagingInstructions = ref({
    isGiftWrap: false,
    sender: "",
    recipient: "",
    message: "",
    fee: 120
});

const goToCheckout = () => {
    if(authStore.currentUser) {
        router.push({
            name: 'informations',
            // query: {
            //     cuponCode: cuponCode.value,
            // }
        })
    } else {
        if (process.client) {
            window.scrollTo(0, 0);
        }
        router.push({
            name: 'checkout'
        })
        // goTo('checkout');
    }
};

onMounted(() => {
    let globalGiftWrap = localStorage.getItem('globalGiftWrap');
    if (globalGiftWrap) {
        giftPacKageWrapPrice.value = JSON.parse(globalGiftWrap).amount;
        giftPacKage.value = giftPacKageWrapPrice.value > 0 ? true : false;
    }
})
</script>

<style lang="scss" scoped>
.c-my-cart {

    .c-remove-section {
        .c-trash {
            font-size: 16px !important;
            color: #2277E0;
            font-weight: 400 !important;
        }

        .c-remove-text {
            font-size: 18px !important;
            color: #2277E0;
        }

        .c-save-text {
            font-size: 18px;
            color: #2277E0;
            text-align: end;
        }
    }

    @media(max-width: 776px) {
        .c-remove-section {
            .c-trash {
                font-size: 12px !important;
            }

            .c-remove-text {
                font-size: 14px !important;
            }

            .c-save-text {
                font-size: 14px;
            }
        }
    }
    .input-wrapper {
        position: relative;
        input {
            // border: 1px solid gray;
            // border-radius: 6px;
            position: relative;
            width: 100%;
            margin: 10px;
            line-height: 3rem;

            border-radius: 10px;
            border: 1px solid #D1D1D1;
            background: #fff; 
            padding-left: 20px;
        }
    
        label {
            position: absolute;
            top: 0.2ex;
            z-index: 1;
            left: 2em;
            background-color: white;
            padding: 0 5px;
            color: #1C1C24;
        }
    }

    .c-btn-primary {
        background-color: #2277E0;
        color: #ffff !important;
        border-radius: 35px !important;
        font-weight: 700 !important;
    }

    .c-btn-primary:hover {
        border: 1px solid #2277E0;
        color: #1C1C24 !important;
        font-weight: 700 !important;
        background-color: #ffff;
    }
    .num_count {
        width: 100%;
        // width: 160px;
        height: 55px;
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
}
@media screen and (max-width: 500px) {
    .payment-type {
        img {
            height: 30px;
        }
    }
}

@media screen and (max-width: 349px) {
    .payment-type {
        flex-wrap: wrap;
    }
}
</style>