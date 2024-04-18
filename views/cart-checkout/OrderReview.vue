<template>
    <div class="c-order-review border border-1 rounded-4 mt-3 overflow-hidden">
        <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
            <h4 class="m-0">3. Order Review</h4>
            <!-- <div class="d-flex" v-if="editTab == 'email'">
                <button type="button" class="btn btn-outline-success rounded-circle me-2"><i class="fa fa-check"></i></button>
                <button type="button" class="btn btn-outline-danger rounded-circle" @click="editTab = false"><i class="fa fa-times"></i></button>
            </div> -->
        </div>
        

        <div class="col-12">
            <div class="px-1 px-sm-2">

                <span class="fs-2" style="color: #202028; font-weight: 600;">Add Gift Card/Promot</span>
        
                <div v-if="cartStore.items.length">
                    <OrederReviewItem v-for="(item, i) in cartStore.items" :key="i" :item="item"/>
                </div>

                <div v-else class="d-none d-xl-block card my-4 rounded-3 " style="background-color: #FAFAFA;">
                    <div class="card-body d-flex justify-content-center flex-column align-items-center">
                        <div class="">
                            <span class="fs-4 fw-bold" style="color: #202028;">your Cart is Empty </span>
                        </div>

                        <div class="my-4 d-flex btn-group" role="group" aria-label="Basic outlined example">
                            <button type="button" class=" ms-2 rounded-5 px-3 py-1 btn c-btn-primary fs-5 py-2" @click.prevent="goTo('shop')">Continue Shopping</button>
                        </div>
                    </div>
                </div>
                <!-- <div v-for="(item, i) in 2" class="d-flex row my-2">
                    <div class="col-2">
                        <img src="/images/2.png" class="w-100 rounded float-start" alt="...">
                    </div>
        
                    <div class="col-6">
                        <div class="col-12 col-sm-12">
                            <div class="product-content">
                                <a href="" class="product-title fw-bold fs-4" style="color: #202028;">Baby Crocodile T-shirt</a>
                            </div>
                        </div>
        
                        <div class="d-flex flex-column col-12 col-sm-12 mt-sm-2">
                            <span >Color: Green</span>
                            <span >Size: Small</span>
                        </div>
                    </div>
        
                    <div class="col-4 col-lg-3 float-end d-flex flex-column" >
                        <div class="col-12 col-sm-12">
                            <div class="product-content float-end">
                                <a href="" class="product-title fw-bold fs-4" style="color: #202028;">TK. 2500</a>
                            </div>
                        </div>
        
                        <div class="col-12 col-sm-12 my-2">
                            <div class="float-end  num_count">
                                <div id="minus" class="minus">
                                    <button class="btn" @click.prevent="onDecrease()">-</button>
                                </div>
        
                                <input
                                    id="qty1"
                                    v-model="quantity"
                                    :disabled="true"
                                    type="text"
                                    class="qty"
                                />
        
                                <div id="add" class="add">
                                    <button class="btn" @click.prevent="onIncrease()">+</button>
                                </div>
                            </div>
                        </div>
        
                        <div class="c-remove-section col-12 col-sm-12 d-flex flex-column flex-sm-column flex-md-row justify-content-end">
                            <div class="d-flex justify-content-end">
                                <i class="c-trash fas fa-trash-alt float-end me-1 pt-1">
                                </i>
                                <span class="c-remove-text sm-fs-1 fw-bold me-2">Remove</span>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import OrederReviewItem from "./item/OrderReviewItem";
import { useCartStore } from '~~/stores/cart';

const cartStore = useCartStore();
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
</script>

<style lang="scss" scoped>
.c-order-review {

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

    .c-remove-section {
        .c-trash {
            font-size: 12px !important;
            color: #2277E0;
            font-weight: 400 !important;
        }

        .c-remove-text {
            font-size: 14px !important;
            color: #2277E0;
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
        }
    }
}
</style>