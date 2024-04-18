<template>
    <div class="mt-5">
        <h3>Account Settings</h3>

        <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">Customer Name</h4>
                <span v-if="editTab != 'name'" class="edit-mode" style="height: 38px;" @click="onEditChange('name')">Edit</span>
                <div class="d-flex" v-if="editTab == 'name'">
                    <button 
                        type="button" 
                        class="btn btn-outline-success rounded-circle me-2"
                        style="height: 40px; width: 40px;display: flex;justify-content: center;align-items: center;"
                    >
                        <i class="fa fa-check"></i>
                    </button>
                    
                    <button 
                        type="button" 
                        class="btn btn-outline-danger rounded-circle" 
                        @click="editTab = ''"
                        style="height: 40px; width: 40px;display: flex;justify-content: center;align-items: center;"
                    >
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="row p-3" v-if="editTab != 'name'">
                <div class="col-2">Name</div>
                <div class="col-10 text-center">{{ name }}</div>
            </div>
            <div class="input-group border-0" v-if="editTab == 'name'">
                <span class="input-group-text p-3 border-0 w-20" id="basic-addon3">Name</span>
                <input v-model="name" type="text" class="form-control p-3 border-0" id="basic-url" aria-describedby="basic-addon3">
            </div>
        </div>

        <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">Contact Information</h4>
                <span v-if="editTab != 'email'" class="edit-mode" style="height: 38px;" @click="onEditChange('email')">Edit</span>
                <div class="d-flex" v-if="editTab == 'email'">
                    <button 
                        type="button" 
                        class="btn btn-outline-success rounded-circle me-2"
                        style="height: 40px; width: 40px;display: flex;justify-content: center;align-items: center;"
                    >
                        <i class="fa fa-check"></i>
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-outline-danger rounded-circle" 
                        @click="editTab = false"
                        style="height: 40px; width: 40px;display: flex;justify-content: center;align-items: center;"
                    >
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
            <div v-if="editTab != 'email'">
                <div class="row px-3 py-2">
                    <div class="col-2">Email</div>
                    <div class="col-10 text-center">{{ email }}</div>
                </div>
                <div class="row px-3 py-2">
                    <div class="col-2">Mobile Number</div>
                    <div class="col-10 text-center">{{ mobile }}</div>
                </div>
            </div>
            <div v-if="editTab == 'email'">
                <div class="input-group border-0">
                    <span class="input-group-text px-3 py-2 border-0 w-20" id="basic-addon3">Email</span>
                    <input v-model="email" type="email" class="form-control px-3 py-2 border-0" id="basic-url" aria-describedby="basic-addon3">
                </div>
                <div class="input-group border-0">
                    <span class="input-group-text px-3 py-2 border-0 w-20" id="basic-addon3">Mobile Number</span>
                    <input v-model="mobile" type="text" class="form-control px-3 py-2 border-0" id="basic-url" aria-describedby="basic-addon3">
                </div>
            </div>
        </div>

        <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">Password</h4>
                <span v-if="editTab != 'password'" class="edit-mode" style="height: 38px;" @click="onEditChange('password')">Edit</span>
                <div class="d-flex" v-if="editTab == 'password'">
                    <button 
                        type="button" 
                        class="btn btn-outline-success rounded-circle me-2" 
                        style="height: 40px; width: 40px;display: flex;justify-content: center;align-items: center;"
                        @click.prevent="changePassword()" 
                    >
                        <i class="fa fa-check"></i>
                    </button>
                    
                    <button 
                        type="button" 
                        class="btn btn-outline-danger rounded-circle" 
                        @click="editTab = ''"
                        style="height: 40px; width: 40px;display: flex;justify-content: center;align-items: center;"
                    >
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="row p-3" v-if="editTab != 'password'">
                <div class="col-2">Password</div>
                <div class="col-10 text-center">{{ oldPassword }}</div>
            </div>
            <!-- <div class="input-group border-0" v-if="editTab == 'password'">
                <span class="input-group-text p-3 border-0 w-20" id="basic-addon3">Password</span>
                <input v-model="password" type="password" class="form-control p-3 border-0" id="basic-url" aria-describedby="basic-addon3">
            </div> -->

            <div v-if="editTab == 'password'">
                <div class="input-group border-0">
                    <span class="input-group-text px-2 px-lg-3 py-2 border-0 w-30 d-flex flex-column align-items-start" id="basic-addon3">
                        Old Password
                        <div v-if="errorMessages.oldPassword" id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.oldPassword }}</div>
                    </span>
                    <!-- <span class="input-group-text px-3 py-2 border-0 w-20" id="basic-addon3">Old Password</span> -->
                    <input v-model="oldPassword" type="password" class="form-control p-3 border-0" id="basic-url" aria-describedby="basic-addon3">
                </div>
                <div class="input-group border-0">
                    <span class="input-group-text px-2 px-lg-3 py-2 border-0 w-30 flex-wrap d-flex flex-column align-items-start" id="basic-addon3">
                        New Password
                        <div id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.newPassword }}</div>
                    </span>
                    <input v-model="newPassword" type="password" class="form-control px-3 py-2 border-0" id="basic-url" aria-describedby="basic-addon3">
                </div>

                <div class="input-group border-0">
                    <span class="input-group-text px-1 px-lg-3 py-2 border-0 w-30 d-flex flex-column align-items-start" id="basic-addon3">
                        Confirm Password
                        <div id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.confirmPassword }}</div>
                    </span>
                    <input v-model="confirmPassword" type="password" class="form-control px-3 py-2 border-0" id="basic-url" aria-describedby="basic-addon3">
                </div>
            </div>
        </div>

        <!-- <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">Two-Step Verification</h4>
                <span v-if="editTab != 'two-step'" class="edit-mode" style="height: 38px;" @click="onEditChange('two-step')">Edit</span>
                <div class="d-flex" v-if="editTab == 'two-step'">
                    <button type="button" class="btn btn-outline-success rounded-circle me-2"><i class="fa fa-check"></i></button>
                    <button type="button" class="btn btn-outline-danger rounded-circle" @click="editTab = ''"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="row p-3" v-if="editTab != 'two-step'">
                <div class="col-2">Two-Step Verification</div>
                <div class="col-10 text-center">Off</div>
            </div>
            <div class="input-group border-0" v-if="editTab == 'two-step'">
                <span class="input-group-text p-3 border-0 w-20" id="basic-addon3">Two-Step Verification</span>
                <input type="text" class="form-control p-3 border-0" id="basic-url" aria-describedby="basic-addon3">
            </div>
        </div> -->

        <!-- <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">Birthday</h4>
                <span v-if="editTab != 'birth'" class="edit-mode" style="height: 38px;" @click="onEditChange('birth')">Edit</span>
                <div class="d-flex" v-if="editTab == 'birth'">
                    <button type="button" class="btn btn-outline-success rounded-circle me-2"><i class="fa fa-check"></i></button>
                    <button type="button" class="btn btn-outline-danger rounded-circle" @click="editTab = ''"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="row p-3" v-if="editTab != 'birth'">
                <div class="col-2">Birthday</div>
                <div class="col-10 text-center">March 5</div>
            </div>
            <div class="input-group border-0" v-if="editTab == 'birth'">
                <span class="input-group-text p-3 border-0 w-20" id="basic-addon3">Birthday</span>
                <input type="text" class="form-control p-3 border-0" id="basic-url" aria-describedby="basic-addon3">
            </div>
        </div> -->

        <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">Saved Address</h4>
                <span class="edit-mode" style="height: 38px;" @click="isShippingAddressModalVisibility = true">Add address</span>
                <!-- <span v-if="editTab != 'address'" class="edit-mode" style="height: 38px;" @click="onEditChange('address')">Add address</span> -->
                <!-- <div class="d-flex" v-if="editTab == 'address'">
                    <button type="button" class="btn btn-outline-success rounded-circle me-2"><i class="fa fa-check"></i></button>
                    <button type="button" class="btn btn-outline-danger rounded-circle" @click="editTab = ''"><i class="fa fa-times"></i></button>
                </div> -->
            </div>
            <div class="row p-3">
                <div class="d-flex col-12 col-sm-6 col-xl-4" v-if="data.addresses.length" v-for="(address, i) in data.addresses" :key="i">
                    <div class="row d-flex p-3 flex-column">
                        <BaseRadio 
                            circle 
                            :name="'address'"
                            v-model="data.selectedAddress" 
                            :value="address" 
                            :id="address.type" 
                            :label="address.type" 
                            :disabled="!address.address"
                        />
                        <div class="col-12 text-start ps-4">{{ address.mobile }}</div>
                        <div class="col-12 text-start ps-4">{{ address.address }}</div>
                    </div>
                </div>

                <div class="d-flex col-12 col-sm-6 col-xl-4" v-else>
                    <div class="row d-flex p-3 flex-column">
                        <BaseRadio 
                            circle 
                            :name="'address'"
                            label="Address Not Saved Yet" 
                            disabled="true"
                        />
                    </div>
                </div>
            </div>
            <!-- <div class="input-group border-0" v-if="editTab == 'address'">
                <span class="input-group-text p-3 border-0 w-20" id="basic-addon3">Saved Address</span>
                <input v-model="address" type="text" class="form-control p-3 border-0" id="basic-url" aria-describedby="basic-addon3">
            </div> -->
        </div>

        <!-- <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">Saved Payment</h4>
                <span v-if="editTab != 'payment'" class="edit-mode" style="height: 38px;" @click="onEditChange('payment')">Add Payment</span>
                <div class="d-flex" v-if="editTab == 'payment'">
                    <button type="button" class="btn btn-outline-success rounded-circle me-2"><i class="fa fa-check"></i></button>
                    <button type="button" class="btn btn-outline-danger rounded-circle" @click="editTab = ''"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="row p-3" v-if="editTab != 'payment'">
                <div class="col-2">Saved Payment</div>
                <div class="col-10 text-center">No saved Payment method!</div>
            </div>
            <div class="input-group border-0" v-if="editTab == 'payment'">
                <span class="input-group-text p-3 border-0 w-20" id="basic-addon3">Saved Payment</span>
                <input type="text" class="form-control p-3 border-0" id="basic-url" aria-describedby="basic-addon3">
            </div>
        </div> -->

        <ModalBaseToastr ref="toaster"/> 

        <ShippingAddressModal 
            v-if="isShippingAddressModalVisibility"
            :show="isShippingAddressModalVisibility"
            v-model="data"
            @close="isShippingAddressModalVisibility = false"
        />
    </div>
</template>

<script setup>
import { useAuthStore } from '~~/stores/auth-store';
import { authClient, cmsClient } from '~~/libs/gandalf/apis/config';
import ShippingAddressModal from '~~/views/cart-checkout/modals/ShippingAddressModal.vue';

const editTab = ref('');
const authStore = useAuthStore();

const toaster = ref(null);
const name = ref('');
const mobile = ref('');
const email = ref('');
const password = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const address = ref('');
const isShippingAddressModalVisibility = ref(false);

const data = ref({
    addresses: [],
    selectedAddress: null,
    payments: [
        {
            id: 'CASH_ON_DELIVERY',
            name: 'Cash On Delivery',
            isDisabled: false,
        }, 
        {
            id: 'ONLINE',
            name: 'Online',
            isDisabled: true,
        },
    ],
    selectedPaymentType: {
            id: 'CASH_ON_DELIVERY',
            name: 'Cash On Delivery',
            isDisabled: false,
        },
});

if(authStore.profile) {
    name.value = authStore.profile.name;
    mobile.value = authStore.profile.mobile;
    email.value = authStore.profile.email;
    address.value = authStore.profile.address;
}

const errorMessages = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const onEditChange = (val) => {
    editTab.value = val;
}

const clearValidations = () => {
    Object.keys(errorMessages.value).forEach((key) => {
        errorMessages.value[key] = '';
    });
}

const passwordValidate = () => {
    clearValidations();
    if (oldPassword.value.trim().length == 0) {
        errorMessages.value.oldPassword = "Please Give Your Old Password";
        return false;
    }

    if (oldPassword.value.trim().length < 6) {
        errorMessages.value.oldPassword =
            "Password Must Be More Than Six Character";
        return false;
    }

    if (newPassword.value.trim().length == 0) {
        errorMessages.value.newPassword = "Please Give A New Password";
        return false;
    }

    if (newPassword.value.trim().length < 6) {
        errorMessages.value.newPassword =
            "Password Must Be More Than Six Character";
        return false;
    }

    if (newPassword.value.trim() != confirmPassword.value.trim()) {
        errorMessages.value.newPassword =
            "New Password and Confirm Password not Match";
        errorMessages.value.confirmPassword =
            "New Password and Confirm Password not Match";
        return false;
    }

    return true;
}

const changePassword = async () => {
    if (passwordValidate()) {
        // showSpinner.value = true;
        let sumitedData = {
            source: "DEFAULT",
            type: "DEFAULT",

            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
            confirmPassword: confirmPassword.value,
        };

        authClient
            .changePassword(sumitedData)
            .then((res) => {
                if (!res.networkError) {
                    if (res.status == 200) {
                        editTab.value = '';
                        
                        toaster.value.success("Password Changed Successfully", {
                            duration: 1500,
                        });
                    } else if (res.status == 406) {
                        errorMessages.value.oldPassword = "Wrong Old Password";
                    } else if (res.status == 401) {
                        errorMessages.value.oldPassword = "User Not Found";
                    } else if (res.status == 404) {
                        errorMessages.value.oldPassword = "User Not Found";
                    }
                }
                // showSpinner.value = false;
            })
            .catch((err) => {
                console.log(err);
                // showSpinner.value = false;
                toaster.value.error("Failed to change password", 1500);
            });
    }
};

const fetchAddress = async () => {
    let obj = {
        page: 1,
        size: 100,
        sortParams: [
            {
                field: "dateCreated",
                type: "DESCENDING",
            }
        ]
    }
    await cmsClient.fetchAddress(obj).then((res)=> {
        if (res.status == 200 && !res.networkError) {
            if (res.body && res.body.list && res.body.list.length > 0) {
                // res.body.list.forEach((a) => {
                    
                //     data.value.addresses.push({
                //         type: a.type,
                //         mobile: a.mobile,
                //         address: `${a.area}, ${a.street},  ${a.zipCode}, ${a.city}, ${a.country}`,
                //         detail: {
                //             address: a.area,
                //             street: a.street,
                //             area: a.zipCode,
                //             division: a.city,
                //             country: a.country,
                //             mobile: a.mobile,
                //         },
                //     });

                // });

                let shippingAddress = res.body.list.filter((s) => s.type.toUpperCase() === 'SHIPPING');

                if(shippingAddress.length) {
                    data.value.addresses = [{
                        type: shippingAddress[0].type,
                        mobile: shippingAddress[0].mobile,
                        address: `${shippingAddress[0].area}, ${shippingAddress[0].street},  ${shippingAddress[0].zipCode}, ${shippingAddress[0].city}, ${shippingAddress[0].country}`,
                        detail: {
                            address: shippingAddress[0].area,
                            street: shippingAddress[0].street,
                            area: shippingAddress[0].zipCode,
                            division: shippingAddress[0].city,
                            country: shippingAddress[0].country,
                            mobile: shippingAddress[0].mobile,
                        },
                    }];

                    data.value.selectedAddress = data.value.addresses[0];

                }

            }
            //  else {
            //     data.value.addresses[0] = {
            //         type: "No Address Saved",
            //         address: '',
            //         detail:  {},
            //     }

            //     data.value.selectedAddress = data.value.addresses[0]
            // }
        }
    })
}

onMounted(async() => {
    await fetchAddress();
})
</script>

<style lang="scss" scoped>
.edit-mode {
    cursor: pointer;
    text-decoration: underline;
}
</style>