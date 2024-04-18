import { ref } from "vue";
import { defineStore } from "pinia";
import { itemsClient } from "@/libs/gandalf/apis/config.js";

export const useGlobalDiscountStore = defineStore("globalDiscountStore", () => {
    const discounts = ref([]);
    const isLoading = ref(false);
    const TIMESTAMP = Date.now();

    const fetchGlobalDiscount = async () => {
        let totalCategories = ref(-1);
        const req = {
            page: 1,
            size: 100,
            textParams: [
                // { 
                //     field: "valid", 
                //     value: true, 
                //     matchType: "EXACT" 
                // }
            ],
        };

        let nextPageToken = "";

        do {
            let res = await itemsClient.fetchGlobalDiscount(req);

            if ((res.status = 200 && !res.networkError)) {
                if (res?.body?.list?.length) {
                    let resArr = [];
                    res.body.list.forEach((element) => {
                        if (element?.id?.length && element?.valid) {
                            resArr.push(element);
                        }
                    });

                    discounts.value = discounts.value.concat(resArr);
                    nextPageToken = res?.body?.nextPageToken;
                    totalCategories.value = res?.body?.total;
                    req.page++;
                }
            }
        } while (nextPageToken != "");
        isLoading.value = false;
        // console.log("discounts.value");
        // console.log(discounts.value);
    };

    function initialize() {
        isLoading.value = true;
        fetchGlobalDiscount();
    }

    return { discounts, isLoading, initialize };
});
