<template>
    <div class=" c-order-place-card-container card rounded-4">
        <div class="card-body">
            <div class="flex-row d-flex justify-content-between">
                <h4 style="color: #202028;" class="card-title fs-4">Item Subtotal</h4>
                <h4 style="color: #202028;" class="fs-4">Tk {{ cartStore.total }}</h4>
            </div>
            <div class="flex-row d-flex justify-content-between">
                <h5 style="color: #202028;" class="card-title ">Delivery</h5>
                <h5 style="color: #202028;" >Free</h5>
            </div>

            <div class="flex-row d-flex justify-content-between border-bottom pb-2">
                <h5 style="color: #202028;" class="card-title ">Vat</h5>
                <h5 style="color: #202028;" >{{ vat }} TK</h5>
            </div>

            <div class="flex-row d-flex justify-content-between mt-3">
                <h4 style="color: #202028;" class="card-title ">Total:</h4>
                <h4 style="color: #202028;" >TK {{ Number(cartStore.total) + Number(vat) }}</h4>
            </div>

            <div class="flex-row d-flex justify-content-between">
                <h5 style="color: #202028;" class="card-title ">You Save</h5>
                <h5 style="color: #202028;" >TK {{ cartStore.totalDiscount }}</h5>
            </div>

            <div class="col-12 d-flex btn-group my-2" role="group" aria-label="Basic outlined example">
                <button 
                    type="button" 
                    class=" ms-2 rounded-5 px-4 py-1 btn c-btn-primary fs-4 py-2"
                    @click.prevent="onSubmit()"
                    :disabled="isLoading || !cartStore.items.length"
                >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Place Your Order
                </button>
            </div>

            <div class="col-12 input-wrapper">
                <label for="first">Apply Cupon</label>
                <input v-model="cuponCode" type="text" placeholder="Enter Your Cupon Code">
            </div>
        </div>
    </div>
    <ModalBaseToastr ref="toast"/> 
</template>

<script setup>
import { ordersPlaceClient } from "~/libs/gandalf/apis/config";
import { useCartStore } from '~~/stores/cart';
import { useAuthStore } from '~~/stores/auth-store';

const authStore = useAuthStore();
const cartStore = useCartStore();
const route = useRoute();

const toast = ref(null);

const props = defineProps({
    info: {
        type: Object,
        default: null,
    },
    methods: {
        type: Object,
        default: null,
    }
});
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
// const vat = ref(24);
const isLoading = ref(false);
const cuponCode = ref('');

if(route.query.cuponCode) {
    cuponCode.value = route.query.cuponCode;
}


const vat = computed(() => {
    return Number(cartStore.total)*15/100;
})

const onSuccess = (res) => {
    toast.value.success('Your Order has been successfully Placed');
    
    router.push({
        name: 'order-confirmation',
        query: {
            total: cartStore.total,
            referenceId: res.body.id,
        }
    });
    cartStore.removeAll();
}

const onSubmit = async () => {

    if(props.methods.validate()) {

        isLoading.value = true;
        let req = {
            info: {
                fullName: props.info.address?.firstName || props.info.address.lastName ? props.info.address.firstName + ' ' + props.info.address.lastName : "walking",
                mobile: props.info.address?.mobile ? props.info.address.mobile : "",
                email: props.info.address?.email ? props.info.address.email : "",
                shortAddress: props.info.address.street + ' ' + props.info.address.city + ' ' + props.info.address.zip + ' ' + props.info.address.country,
                contactNumber: props.info?.mobile ? props.info.mobile : "",
                type: "INDIVIDUAL",
                deviceId: "",
                deviceName: "",
            },
    
            source: "ECOMMERCE",
            couponId: "",
            locationType: "SHOWROOM_STOCK",
            locationId: "LKFARBY2-194KK79ZUS3EK-KQCX2CETEIOQ",
            customerId: "",
            discountType: "PERCENTAGE",
            discountAmount: 0,
            vatAmount: 24,
            vatType: "FIXED",
            paymentType: props.info.selectedPaymentType.id,
            paymentStatus: "PENDING",
            items: [],
            packagingInstructions: [],
        };
    
        req.items = cartStore.items.map((item) => {
            return {
                itemId: item.product.id,
                itemTitle: item.product.title,
                skuCode: item.sku.code,
                price: Number(item.sku.salesPrice),
                // price: Number(item.sku.discountedSalesPrice) && Number(item.sku.discountedSalesPrice) > 0 ? Number(item.sku.discountedSalesPrice) : Number(item.sku.salesPrice),
                discountedPrice: Number(item.sku.discountedSalesPrice),
                quantity: Number(item.quantity),
            };
        });

        req.packagingInstructions = cartStore.items.map((item) => {
            return {
                itemId: item.product.id,
                skuCode: item.sku.code,
                sender: item?.packagingInstructions?.sender,
                recipient: item?.packagingInstructions?.recipient,
                message: item?.packagingInstructions?.message,
                instruction: "",
                typeId: "<gift>",
                fee: Number(item?.packagingInstructions?.fee),
            };
        });

        // await serverSideUpdate(req)
    
        isLoading.value = false;
    } else if(process.client) {
        toast.value.error('Please give your Shipping informations');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


}

const serverSideUpdate = async (req) => {
    
    ordersPlaceClient.orderPlace(req).then((res) => {
        if (!res.networkError) {
            if (res.status == 201) {
                onSuccess(res);
            }
        }
    });
}
</script>

<style lang="scss" scoped>
.c-order-place-card-container {
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
}
</style>