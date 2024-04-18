import { ref } from "vue";
import { defineStore } from "pinia";
import { categoriesClient } from "~/libs/gandalf/apis/config";

export const useCategoryStore = defineStore("categoryStore", () => {

    
    const categories = ref([]);
    const parentCategories = ref([]);
    const allCategories = ref([]);
    const isLoading = ref(false);
    const TIMESTAMP = Date.now();
    
    const rearrange = (arr) => {
        const nest = (xs, id = 0) =>
            xs
                .filter((x) => x && x.parentId == id)
                .map((x) => ({ ...x, children: nest(xs, x.id) }));
        return nest(arr);
    };

    const fetchAllCategory = async () => {
        isLoading.value = true;
        
        let currentCategories = ref(-1);
        let totalCategories = ref(-1);
        const req = {
			page: 1,
			size: 50,
			fetchCount: true,
        };
        // textParams: [{"field":"parentId","value":"","matchType":"EXACT"}],
      
        let nextPageToken = "";

        let cateArr = [];
        do {
			let res = await categoriesClient.search(req);

			if ((res.status = 200 && !res.networkError)) {
				if (res.body && res.body.list && res.body.list.length > 0) {
					let resArr = [];

					res.body.list.forEach((element) => {
						if (element && element.id.length > 0) {
							resArr.push(element);
						}
					});

					let list = resArr.sort((x, y) => x.sortOrder - y.sortOrder);

                    cateArr = cateArr.concat(list);
					// categories.value = categories.value.concat(list);

					parentCategories.value = [...new Set(parentCategories.value.concat(list.filter((l) => !l.parentId)))];

					// let clone = JSON.parse(JSON.stringify(categories.value));

					nextPageToken = res.body.nextPageToken;
					currentCategories.value = categories.value.length;

					if (res.body.total > -1) {
						totalCategories.value = res.body.total;
						req.fetchCount = false;
					}

					req.page++;

					
				}
				isLoading.value = false;
			}
        } while (nextPageToken != "");
        let listVal = await rearrange(cateArr);
        categories.value = listVal;
        allCategories.value = cateArr;
        if (currentCategories.value > 0) {
            localStorage.setItem("all-categories", JSON.stringify({ categories: categories.value, initial: TIMESTAMP,
                expiresOn: TIMESTAMP + 1000 * 60 * 60 * 24 * 1, // 7day
            }));
        }
        // categories.value.sort((x, y) => x.sortOrder - y.sortOrder);
    };

    function initialize(){
        // isLoading.value = true;
        // if (localStorage.getItem("all-categories")) {
        //     let categoriesVal = JSON.parse(localStorage.getItem("all-categories"));
        //     let expireDate = categoriesVal.expiresOn;
            
        //     categories.value = categoriesVal.categories;
		// 	parentCategories.value = categories.value.filter((cat) => !cat.parentId);

        //     // if (Date.now() > expireDate) {
        //     //     localStorage.removeItem("all-categories");
        //     //     fetchAllCategory();
        //     // } 
        //     // else {
        //     //     categories.value = categoriesVal.categories;
        //     //     isLoading.value = false;
        //     // }
        //     fetchAllCategory();
        // } else {
            fetchAllCategory();
        // }
    }

    return { categories, allCategories, parentCategories, isLoading, initialize };

});
