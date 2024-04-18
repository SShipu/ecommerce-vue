import { ref } from "vue";
import { defineStore } from "pinia";
import { optionsClient } from "~/libs/gandalf/apis/config";

export const useAttributesStore = defineStore("attributesStore", () => {

    
    const attributes = ref([]);
    const isLoading = ref(false);
    const TIMESTAMP = Date.now();

    const fetchAllAttributes = async () => {
        let currentAttributes = ref(-1);
        let totalAttributes = ref(-1);
        const req = {
          page: 1,
          size: 50,
          fetchCount: true,
        };
        // textParams: [{"field":"parentId","value":"","matchType":"EXACT"}],
      
        let nextPageToken = "";

      
        do {
            let res = await optionsClient.search(req);

            if ((res.status = 200 && !res.networkError)) {
               if (res.body && res.body.list && res.body.list.length > 0) {
                
                    let resArr = [];
                    res.body.list.forEach((element) => {
                        if (element && element.id) {
                          resArr.push(element);
                        }
                    });

                    attributes.value = attributes.value.concat(resArr);

                    nextPageToken = res.body.nextPageToken;
                    currentAttributes.value = attributes.value.length;

                    if (res.body.total > -1) {
                        totalAttributes.value = res.body.total;
                        req.fetchCount = false;
                    }
                    req.page++;
                    
                    if (currentAttributes.value > 0) {

                        localStorage.setItem("all-attributes", JSON.stringify({ attributes: attributes.value, initial: TIMESTAMP,
                          // localStorage.setItem("all-attributes", JSON.stringify({ attributes: clonedattributes.value, initial: TIMESTAMP,
                              expiresOn: TIMESTAMP + 1000 * 60 * 60 * 24 * 1, // 7day
                          })
                        );
                    }
                }

                isLoading.value = false;
            }
        } while (nextPageToken != "");
        
    };

    function initialize(){
        // isLoading.value = true;
        // if (localStorage.getItem("all-attributes")) {
        //     let attributesVal = JSON.parse(localStorage.getItem("all-attributes"));
        //     let expireDate = attributesVal.expiresOn;
            
        //     attributes.value = attributesVal.attributes;

        //     // if (Date.now() > expireDate) {
        //     //     localStorage.removeItem("all-attributes");
        //     //     fetchAllAttributes();
        //     // } 
        //     // else {
        //     //     attributes.value = attributesVal.attributes;
        //     //     isLoading.value = false;
        //     // }
        //     fetchAllAttributes();
        // } else {
            fetchAllAttributes();
        // }
    }

    return { attributes, isLoading, initialize };

});
