<template>
   <div class="success-main">
       <div class="right-side-area">
           <div class="left-side-area">
               <img class="shop-done-img" src="/logo/logo.png" alt="" style="height: 120px;"/>
           </div>
            <div class="title-area">
                <h2>We are Sorry, We wont be able to delight you with our goodies</h2>
            </div>

            <div class="btn-area">
                <div class="c-btn-primary" @click.prevent="gotoShopPage()">
                    Keep Browsing
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ordersPlaceClient } from "~/libs/gandalf/apis/config";

const router = useRouter();
const route = useRoute();

const invoiceId = ref("");
const orderType = ref("");
const id = ref("");

invoiceId.value = route.query && route.query.invoiceId ? route.query.invoiceId : "";

const gotoShopPage = () => {
    let name = "shop"
    
    router.push({
        name: name,
    });
};

const cancelCall = (id, invoiceId) => {
    let data = {
        id: invoiceId,
    }
    
    ordersPlaceClient
        .cancelPayment(data, orderType.value)
        .then((res) => {
            if (!res.networkError && res.status == 200) {}
        })
    }

watch(route, ()=> {
    invoiceId.value = route.query.invoiceId;
    orderType.value = route.query.type;
    id.value = route.query.id;
    cancelCall(route.query.id, route.query.invoiceId);
}, {immediate: true});
</script>

<style lang="scss">
.success-main {
  // background-color: #F69320;
  margin: 100px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .left-side-area {
    .shop-done-img {
      // width: 100%;
      height: 50vh;
    }
    // background-color: black;
  }
  .right-side-area {
    //   width: 100%;
    // background-color: #F69320;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    // width: 100%;
    padding: 20px 0px 20px 0px;
    h2 {
    //   color: #ff0000;
      font-weight: 600;
      text-align: center;
    }
    .logo {
      display: flex;
      justify-content: center;
      .logo-additional-img {
      }
    }
    .title-area {
      display: flex;
      justify-content: center;
      padding: 30px 0;
    }
    .invoice-id-para-area {
      display: flex;
      justify-content: center;
      margin: 20px 20px 10px;

      strong {
        color: #F69320;
      }
    }
    .para-area {
      display: flex;
      justify-content: center;
      margin: 0px 0px 15px 0px;
    }
    .btn-area {
      display: flex;
      justify-content: center;
      .shop-btn {
        text-align: center;
        border: 1px solid transparent;
        border-radius: 5px;
        background-color: black;

        font-weight: 700;
        color: #fff;
        font-size: 16px;

        padding: 10px;

        cursor: pointer;
        &:hover {
          background-color: rgb(91, 89, 89);
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .success-main {
    // background-color: #F69320;
    margin: 80px 0px;
    .left-side-area {
      .shop-done-img {
        height: 40vh;
      }
    }
    .right-side-area {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0px 20px 0px;
      h2 {
        font-size: 1.75rem;
      }
      .logo {
        margin: 10px 0px;
        .logo-additional-img {
          width: 80px;
          height: 50px;
        }
      }
      .title-area {
      }
      .para-area {
        margin: 20px 0px;
      }
    }
  }
}

@media screen and (min-width: 577px) and (max-width: 767px) {
  .success-main {
    // background-color: #F69320;
    margin: 80px 0px;

    .left-side-area {
      .shop-done-img {
        height: 30vh;
      }
    }
    .right-side-area {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0px 20px 0px;
      h2 {
        font-size: 1.25rem;
      }
      .logo {
        margin: 10px 0px;
        .logo-additional-img {
          width: 80px;
          height: 50px;
        }
      }
      .title-area {
      }
      .para-area {
        margin: 15px 0px;
        font-size: 16px;
      }
    }
  }
}

@media screen and (min-width: 0px) and (max-width: 576px) {
  .success-main {
    // background-color: #F69320;
    flex-direction: column;
    margin: 30px 0px;

    .left-side-area {
        .shop-done-img {
            height: 20vh;
      }
    }
    .right-side-area {
        display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0px 20px 0px;
      h2 {
        font-size: 1.125rem;
      }
      .logo {
          margin: 10px 0px;
        .logo-additional-img {
            width: 80px;
          height: 50px;
        }
      }
      .title-area {
          }
      .para-area {
          text-align: center;
        margin: 10px 0px;
        font-size: 16px;
      }
    }
  }
}

</style>
