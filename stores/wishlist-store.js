import { ref } from "vue";
import { defineStore } from "pinia";
import { cmsClient } from '~/libs/gandalf/apis/config';

export const useWishlistStore = defineStore("wishlistStore", () => {

    /** STATES */
    const wishList = ref([]);
    const totalCount = ref(0);
    const isLoading = ref(false);
    // const TIMESTAMP = Date.now();

    /** ACTIONS */
    const fetchRequestItem = () => {
        let obj = {
            size: 10,
            page: 1,
            textParams: [
                {
                    field: "wishlistId",
                    value: "",
                    matchType: "EXACT"
                }
            ],
            sortParams: [
                {
                    field: "dateCreated",
                    type: "DESCENDING"
                }
            ]
        }
        
        cmsClient.fetchWishlist(obj).then((res) => {
            if (!res.networkError) {
                if (res.status == 200) {
                    
                    wishList.value = res.body.list;
                    totalCount.value = res.body.total;
                }
            }
            isLoading.value = false;
        });
    };

    const updateList = (obj) => {
        let profile = JSON.parse(localStorage.getItem("profile"));
        let userId = profile && profile.userId && profile.userId.length > 0 ? profile.userId : "";
        
        if (obj.itemId) {
            obj.userId = userId;
            let hasItem = wishList.value.filter(i => i.itemId == obj.itemId && i.userId == userId);
            if (!hasItem.length) {
                wishList.value.push(obj.userId);
                totalCount.value += 1;
                isExists(obj.itemId, obj.skuCode);
            }
        }
    };

    const isExists = (id, sku) => {
        let exists = false;
        let profile = JSON.parse(localStorage.getItem("profile"));
        let userId = profile && profile.userId && profile.userId.length > 0 ? profile.userId : "";
        
        if (wishList.value && wishList.value.length > 0) {

            if (id && id.length > 0) {
                let hasItem = wishList.value.filter(i => i.itemId == id && i.skuCode == sku && i.userId == userId);
                if (hasItem.length > 0) {
                    exists = true;
                }
            }

        }
        return exists;
    };

    const initialize = () => {
        isLoading.value = true;
        fetchRequestItem();
        
    }

    /** RETURN */
    return { 
        wishList,
        totalCount,
        isLoading,
        updateList,
        isExists,
        initialize, 
    };

});
