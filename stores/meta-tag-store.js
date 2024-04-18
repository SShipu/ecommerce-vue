import { ref } from "vue";
import { defineStore } from "pinia";
import { kvpsClient } from "~/libs/gandalf/apis/config";

export const useMetaTagStore = defineStore("metaTagStore", () => {

    
    const metaTags = ref([]);
    const isLoading = ref(false);

    const fetchMetaTags = async () => {
        isLoading.value = true;
        let params = {
            textParams: [{
                field: 'type',
                value: 'page-meta-tag',
                matchType: 'EXACT',
            }],
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
            metaTags.value = res?.body?.list.sort((x,y) => x.sortOrder - y.sortOrder);
        }
        isLoading.value = false;
    }

    function initialize(){
        fetchMetaTags();
    }

    return { metaTags, isLoading, initialize };

});
