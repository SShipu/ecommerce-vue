import { ref } from "vue";
import { defineStore } from "pinia";
import { lookupsClient } from "~/libs/gandalf/apis/config";

export const useLookupsStore = defineStore("lookupsStore", () => {

    
    const lookups = ref([]);
    const isLoading = ref(false);
    const TIMESTAMP = Date.now();

    const fetchAllLookups = async () => {
        let currentlookups = ref(-1);
        let totallookups = ref(-1);
        const req = {
          page: 1,
          size: 50,
          fetchCount: true,
        };
        // textParams: [{"field":"parentId","value":"","matchType":"EXACT"}],
      
        let nextPageToken = "";

      
        do {
            let res = await lookupsClient.search(req);

            if ((res.status = 200 && !res.networkError)) {
               if (res.body && res.body.list && res.body.list.length > 0) {
                
                    let resArr = [];
                    res.body.list.forEach((element) => {
                        if (element && element.id) {
                          resArr.push(element);
                        }
                    });

                    lookups.value = lookups.value.concat(resArr);

                    nextPageToken = res.body.nextPageToken;
                    currentlookups.value = lookups.value.length;

                    if (res.body.total > -1) {
                        totallookups.value = res.body.total;
                        req.fetchCount = false;
                    }
                    req.page++;
                    
                    if (currentlookups.value > 0) {

                        localStorage.setItem("all-lookups", JSON.stringify({ lookups: lookups.value, initial: TIMESTAMP,
                          // localStorage.setItem("all-lookups", JSON.stringify({ lookups: clonedlookups.value, initial: TIMESTAMP,
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
        // if (localStorage.getItem("all-lookups")) {
        //     let lookupsVal = JSON.parse(localStorage.getItem("all-lookups"));
        //     let expireDate = lookupsVal.expiresOn;
            
        //     lookups.value = lookupsVal.lookups;

        //     // if (Date.now() > expireDate) {
        //     //     localStorage.removeItem("all-lookups");
        //     //     fetchAllLookups();
        //     // } 
        //     // else {
        //     //     lookups.value = lookupsVal.lookups;
        //     //     isLoading.value = false;
        //     // }
        //     fetchAllLookups();
        // } else {
            fetchAllLookups();
        // }
    }

    return { lookups, isLoading, initialize };

});
