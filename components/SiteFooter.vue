<template>
    <div class="container-fluid site-footer">
        
        <div class="py-4 px-5 mobile-hidden">
            <div class="row">
                <div class="col-12 col-lg-3 col-md-6 col-sm-6 col-xs-12 d-md-flex justify-content-md-center">
                    <div class="customer-care">
                        <h3 class="mb-3">Customer Care</h3>
                        <div v-if="customerCare.length" v-for="(item, i) in customerCare" :key="i">
                            <a class="fw-bold" v-if="item?.href?.length" :href="item?.href" target="_blank">{{item?.title}}</a>
                            <a class="fw-bold" v-else :href="`/${item?.url}`" @click.prevent="goTo(item?.url)">{{item?.title}}</a>
                        </div>
                        
                        <div>
                            <a class="fw-bold" href="#" @click.prevent="showSizeGuideModal = true">Size Guide</a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 col-md-6 col-sm-6 col-xs-12 d-md-flex justify-content-md-center">
                    <div class="about">
                        <h3 class="mb-3">About</h3>
                        <div v-if="about.length" v-for="(item, i) in about" :key="i">
                            <a class="fw-bold" v-if="item?.href?.length" :href="item?.href" target="_blank">{{item?.title}}</a>
                            <a class="fw-bold" v-else :href="`/${item?.url}`" @click.prevent="goTo(item?.url)">{{item?.title}}</a>
                        </div>
                        
                    </div>
                </div>
                <div class="col-12 col-lg-3 col-md-6 col-sm-6 col-xs-12 d-md-flex justify-content-md-center">
                    <div class="contact">
                        <h3 class="mb-3">Contact</h3>
                        <div class="d-flex align-items-center" v-for="(item, index) in contact" :key="index">
                            <i class="me-2" :class="item.icon"></i>
                            <a class="fw-bold">{{ item.title}}</a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 col-md-6 col-sm-6 col-xs-12 d-md-flex justify-content-md-center">
                    <div class="social">
                        <h3 class="mb-3">Follow Us</h3>
                        <div class="d-flex justify-content-start">
                            <div class="me-3" v-for="(item, index) in follow" :key="index">
                                <a :href="item?.href" target="_blank">
                                    <i class="fa-2x" :class="item.icon"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex justify-content-md-center mt-4">
                    <div class="bg-image-contain h-20vh w-100" style="background-image: url('/images/payments/192.png');"></div>
                    <!-- <img src="/images/payments/ssl_commerz.png" alt=""> -->
                </div>
            </div>
        </div>
        <div class="accordion accordion-flush desktop-hidden">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                       <h4>Customer Care</h4>
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div>
                            <a href="/contacts" @click.prevent="goTo('contacts')">Contact</a>
                        </div>
                        <div>
                            <a href="/delivery-information" @click.prevent="goTo('delivery-information')">Delivery Information</a>
                        </div>
                        <div>
                            <a href="/return-exchange" @click.prevent="goTo('return-exchange')">Make a Return</a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="showSizeGuideModal = true">Size Guide</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        <h4>About</h4>
                    </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div>
                            <a href="/about-us" @click.prevent="goTo('about-us')">Our Story</a>
                        </div>
                        <div>
                            <a href="#" @click.prevent>Careers</a>
                        </div>
                        <div>
                            <a href="/terms-condition" @click.prevent="goTo('terms-condition')">Terms & Conditions</a>
                        </div>
                        <div>
                            <a href="/privacy-policy" @click.prevent="goTo('privacy-policy')">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        <h4>Contact</h4>
                    </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="d-flex align-items-center">
                            <i class="fa fa-phone me-2"></i>
                            <a>+88 0172432694</a>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="far fa-envelope me-2"></i>
                            <a>care@lilstar.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFour">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        <h4>Follow Us</h4>
                    </button>
                </h2>
                <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="d-flex justify-content-start">
                            <div class="me-3">
                                <a href="https://www.facebook.com/lilstar.official" target="_blank"><i class="fab fa-facebook fa-2x"></i></a>
                            </div>
                            <div class="me-3">
                                <a href="https://www.youtube.com/channel/UCx3j7cBUW-2lb8ILMSEUMfg" target="_blank"><i class="fab fa-youtube fa-2x"></i></a>
                            </div>
                            <div class="me-3">
                                <a href="https://www.instagram.com/lilstar_official/" target="_blank"><i class="fab fa-instagram fa-2x"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-md-center mt-2">
                <div class="bg-image-contain h-20vh w-100" style="background-image: url('/images/payments/192.png');"></div>
            </div>
        </div>
        <div class="d-flex justify-content-center align-items-center p-2 border-top footer-border-color">
            <div>@ <a href="#" @click.prevent>{{ year }}</a> Lil Star. All right Reserved.</div>
        </div>
    </div>
    
    <SizeGuide v-if="showSizeGuideModal" :show="showSizeGuideModal" @close="showSizeGuideModal = false"/>

</template>

<script setup>
import SizeGuide from "@/views/commons/SizeGuide.vue";
import { kvpsClient } from '~/libs/gandalf/apis/config';

const year = new Date().getFullYear();
const showSizeGuideModal = ref(false);
const router = useRouter();
const scrollToTop = async () => {
    if (process.client) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};
const goTo = (name) => {
    router.push({name: name})
}

const footerData = ref([]);

const fetchValues = (arr) => {
    let items = [];
    arr.forEach(element => {
        let url = "";
        let href = "";
        let icon = element?.fields?.icon ? element.fields.icon : "";
        if (element?.fields?.url?.length) {
            if (element.fields.url.startsWith('http')) href = element.fields.url;
            else url = element.fields.url;
        }
        items.push({
            url: url,
            href: href,
            title: element.title,
            icon: icon,
        })
    });
    return items;
}

const customerCare = computed(() => {
    let customerCare = footerData.value.filter(i => i.type == 'customer-care').sort((x,y) => x.sortOrder - y.sortOrder);
    return customerCare.length ? fetchValues(customerCare) : [];
});

const about = computed(() => {
    let about = footerData.value.filter(i => i.type == 'about').sort((x,y) => x.sortOrder - y.sortOrder);
    return about.length ? fetchValues(about) : [];
});

const contact = computed(() => {
    let contact = footerData.value.filter(i => i.type == 'contact').sort((x,y) => x.sortOrder - y.sortOrder);
    return contact.length ? fetchValues(contact) : [];
});

const follow = computed(() => {
    let follow = footerData.value.filter(i => i.type == 'follow').sort((x,y) => x.sortOrder - y.sortOrder);
    return follow.length ? fetchValues(follow) : [];
});

const fetchKidsVibe = async () => {
    let params = {
        textParams: [],
        nestedParams: [],
        sortParams: [
            {
                field: 'title',
                type: 'ASCENDING',
            },
        ],
        page: 1,
        size: 100,
    };

    let res = await kvpsClient.search(params);

    if (res.status == 200 && !res.networkError && res?.body?.list) {
        footerData.value = res?.body?.list;
    }
}

onMounted(async () => {
    await fetchKidsVibe();
    await scrollToTop();
})
</script>

<style lang="scss" scoped>
.site-footer {
    background: #000;
    color: #fff;

    div {
        a {
            font-size: 18px;
            color: #fff
        }

        margin: 10px 0 0px 0px;
    }

    .footer-border-color {
        border-color: rgba(255, 255, 255, 0.2) !important;
    }

    .customer-care {
        div {
            cursor: pointer;
        }
    }
    .about {
        div {
            cursor: pointer;
        }
    }
    .contact {
        div {
            cursor: pointer;
        }
    }
    .social {
        div {
            cursor: pointer;
        }
    }
    .accordion-body {
        div {
            cursor: pointer;
        }
    }
    .accordion-item {
        background-color: transparent !important;
        color: #fff;
    }
    .accordion-button {
        background-color: transparent !important;
        color: #fff;
    }
    // .accordion-button:not(.collapsed)::after {
    //     background-image: none !important;
    // }
    // .accordion-button::after {
    //     background-image: none !important;
    // }
}
</style>