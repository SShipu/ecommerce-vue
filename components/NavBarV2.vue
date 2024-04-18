<template>
    <div class="col-12 navbar-v2 mt-4">
        <div
            class="sc-head d-flex justify-content-center align-items-center d-none d-lg-block"
        >
            <div class="nav-top d-flex justify-content-center" @click.prevent="navigateTo('/')" 
            >
                <a class="navbar-brand" href="#">
                    <img src="/images/logo/logo.svg" alt="" />
                </a>
            </div>
        </div>

        <div class="row mt-3">
            <span style="display: flex; justify-content: center; align-items: center;">
                <a class="item" @click.prevent="goTo('cart-review')">Cart <i class="fas fa-chevron-right ms-1  me-2"></i></a>
                <a class="item" @click.prevent="goTo('informations')">Informations <i class="fas fa-chevron-right ms-1  me-2"></i></a>
                <a class="item" @click.prevent="goTo('shipping-method')">Shipping <i class="fas fa-chevron-right ms-1  me-2"></i></a>
                <a class="item" @click.prevent="goTo('payment')">Payment</a>
            </span>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    informations: {
        type: Object,
        default: null,
    },
});

const goTo = (route_name) => {
    if(route_name == 'shipping-method' || route_name == 'payment') {
        if(props.informations.validate()) {
            navigateTo(route_name);
        }
    } else {
        navigateTo(route_name);
    }
}
</script>

<style lang="scss" scoped>
.navbar-v2 {
    .item {
        color: #6D7482;
        cursor: pointer;
        font-size: .95rem;

        display: flex;
        align-items: center;

        font-weight: 600;
        i {
            font-size: .75rem;
        }

        &:hover {
            color: #2277E0
        }
    }
}
</style>