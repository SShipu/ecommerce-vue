<template>
    <div>
        <Banner title="Privacy Policy"/>
        <div v-if="data?.text?.length" class="container-xl my-5 privacy-container" v-html="data?.text"></div>
        <div v-else class="container-xl my-5 privacy-container">
            <p class="pt-2 text-center">
                Currently No Content Given
            </p>
        </div>
        <!-- <div class="container-xl my-5 privacy-container">
        <h3>Privacy and Cookie Policy</h3>
        <p class="pt-2">
            This privacy policy sets out how this website (hereafter "the Store") uses and protects any information that you
            give the Store while using this website. The Store is committed to ensuring that your privacy is protected.
            Should we ask you to provide certain information by which you can be identified when using this website, then
            you can be assured that it will only be used in accordance with this privacy statement. The Store may change
            this policy from time to time by updating this page. You should check this page from time to time to ensure that
            you are happy with any changes.
        </p>

        <h3 class="pt-3">What we collect</h3>
        <p class="m-0">
            We may collect the following information:
        </p>
        <ul>
            <li>name</li>
            <li>
                contact information including email address
            </li>
            <li>demographic information such as postcode, preferences and interests</li>
            <li>other information relevant to customer surveys and/or offers</li>
        </ul>

        <h3 class="pt-3">What we do with the information we gather</h3>
        <p class="m-0">
            We require this information to understand your needs and provide you with a better service, and in particular
            for the following reasons:
        </p>
        <ul>
            <li>Internal record keeping.</li>
            <li>We may use the information to improve our products and services.</li>
            <li>We may periodically send promotional emails about new products, special offers or other information which we
                think you may find interesting using the email address which you have provided.</li>
            <li>From time to time, we may also use your information to contact you for market research purposes. We may
                contact you by email, phone, fax or mail. We may use the information to customise the website according to
                your interests.</li>
        </ul>

        <h3 class="pt-3">Security</h3>
        <p class="pt-2">
            We are committed to ensuring that your information is secure. In order to prevent unauthorised access or
            disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure
            the information we collect online.
        </p>

        <h3 class="pt-3">How we use cookies</h3>
        <p class="pt-2">
            A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the
            file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site.
            Cookies allow web applications to respond to you as an individual. The web application can tailor its operations
            to your needs, likes and dislikes by gathering and remembering information about your preferences.
        </p>
        <p class="pt-2">
            We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page
            traffic and improve our website in order to tailor it to customer needs. We only use this information for
            statistical analysis purposes and then the data is removed from the system.
        </p>
        <p class="pt-2">
            Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find
            useful and which you do not. A cookie in no way gives us access to your computer or any information about you,
            other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers
            automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
            This may prevent you from taking full advantage of the website.
        </p>

        <h3 class="pt-3">Links to other websites</h3>
        <p class="pt-2">
            Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
        </p>

    <h3 class="pt-3">Controlling your personal information</h3>
    <p class="pt-2">
        You may choose to restrict the collection or use of your personal information in the following ways:
    </p>
    <ul>
        <li>whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
        <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by letting us know using our Contact Us information</li>
    </ul>
    <p class="pt-2">
        We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen. 
    </p>
    <p class="pt-2">
        You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please email us this request using our Contact Us information.
    </p>
    <p class="pt-2">
        If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.
    </p>
    </div> -->
    </div>
</template>

<script setup>
import Banner from '@/views/commons/Banner.vue';
import { usePagesContentStore } from "@/stores/pages-content-store";

const pagesContentStore = usePagesContentStore();

const data = computed(() =>{
    if (pagesContentStore?.pagesContents?.length) {
        return pagesContentStore?.pagesContents.find(i => i.title == 'Privacy Policy');
    }
    return null;
});
</script>

<style lang="scss" scoped>
.privacy-container {
    font-size: 1.225rem !important;
}
</style>