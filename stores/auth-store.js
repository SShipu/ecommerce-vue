import { defineStore } from "pinia";

import { host, authClient } from "~/libs/gandalf/apis/config";

export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            currentUser: null,
            token: "",
            profile: null,
            isAuthenticated: false,
        };
    },

    actions: {
        signIn(data) {
            return new Promise((resolve, reject) => {
                authClient.signIn(data).then((res) => {
                    if (!res.networkError) {
                        if (res.status == 200) {
                            localStorage.removeItem("informations");
                            localStorage.removeItem("guest-address");
                            this.token = res.body.user.authToken;
                            delete res.body.user.authToken;
                            this.currentUser = res.body.user;
                            this.profile = res.body.profile;
                            this.isAuthenticated = true;
                            if (this.profile?.imageUrl?.length > 0) this.profile.imageUrl = host + this.profile.imageUrl; //need update from profile return data
                                
                            localStorage.setItem("token", this.token);
                            localStorage.setItem(
                                "currentUser",
                                JSON.stringify(this.currentUser)
                            );
                            localStorage.setItem(
                                "profile",
                                JSON.stringify(this.profile)
                            );
                            resolve(res);
                        } else if (res.status == 409) {
                            reject("already_logedin");
                        } else {
                            reject("auth_error");
                        }
                    } else {
                        reject("network_error");
                    }
                });
            });
        },

        signUp(data) {
            return new Promise((resolve, reject) => {
                authClient.signUp(data).then((res) => {
                    if (!res.networkError) {
                        if (res.status == 200) {
                            resolve();
                        } else if (res.status == 409) {
                            reject("duplicate_email");
                        } else {
                            reject("auth_error");
                        }
                    } else {
                        reject("network_error");
                    }
                });
            });
        },

        signOut() {
            return new Promise((resolve) => {
                authClient.signOut().then((res) => {
                    this.currentUser = null;
                    this.token = "";
                    this.profile = null;
                    this.isAuthenticated = false;

                    localStorage.removeItem("token");
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("profile");

                    localStorage.removeItem("informations");
                    localStorage.removeItem("guest-address");
                    localStorage.removeItem("coupon");
                    localStorage.removeItem("globalGiftWrap");
                    resolve(res);
                });
            });
        },

        fetchAll(data) {
            return new Promise((resolve, reject) => {
                authClient.fetchCustomer(data).then((res) => {
                    if (!res.networkError) {
                        if (res.status == 200) {
                            this.profile.subscriptionStatus =
                                res.body.subscriptionStatus;
                            localStorage.setItem(
                                "profile",
                                JSON.stringify(this.profile)
                            );
                            resolve();
                        } else {
                            reject("auth_error");
                        }
                    } else {
                        reject("network_error");
                    }
                });
            });
        },

        init() {
            if (process.client) {
                this.currentUser = JSON.parse(
                    localStorage.getItem("currentUser")
                );
                this.profile = JSON.parse(localStorage.getItem("profile"));
                this.isAuthenticated = this.currentUser != null ? true : false;
            }
        },
    },
});
