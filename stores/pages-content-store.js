import { ref } from "vue";
import { defineStore } from "pinia";
import { snippetsClient } from "~/libs/gandalf/apis/config";

export const usePagesContentStore = defineStore("pagesContentStore", () => {

    
    const pagesContents = ref([]);
    const isLoading = ref(false);

    const fetchPagesContent = async () => {
        isLoading.value = true;
        let params = {
            textParams: [{
                field: 'code',
                value: 'pages-content',
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
    
        let res = await snippetsClient.search(params);
    
        if (res.status == 200 && !res.networkError && res?.body?.list) {
            pagesContents.value = res?.body?.list.sort((x,y) => x.sortOrder - y.sortOrder);
        }
        isLoading.value = false;
    }

    function initialize(){
        fetchPagesContent();
    }

    return { pagesContents, isLoading, initialize };

});
