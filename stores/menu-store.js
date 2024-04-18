import { ref } from "vue";
import { defineStore } from "pinia";
import { menusClient } from "~/libs/gandalf/apis/config";

export const useMenuStore = defineStore("menuStore", () => {

    
    const menus = ref([]);
    const parentMenus = ref([]);
    const allMenus = ref([]);
    const isLoading = ref(false);
    const TIMESTAMP = Date.now();
    
    const rearrange = (arr) => {
        const nest = (xs, id = null) =>
            xs
                .filter((x) => x && x.parentId == id)
                .map((x) => ({ ...x, children: nest(xs, x.id) }));
        return nest(arr);
    };

    const fetchAllMenu = async () => {
        isLoading.value = true;
        
        let currentMenus = ref(-1);
        let totalMenus = ref(-1);
        const req = {
			page: 1,
			size: 50,
			fetchCount: true,
        };
        // textParams: [{"field":"parentId","value":"","matchType":"EXACT"}],
      
        let nextPageToken = "";

        let cateArr = [];
        do {
			let res = await menusClient.search(req);

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
					// menus.value = menus.value.concat(list);

					parentMenus.value = [...new Set(parentMenus.value.concat(list.filter((l) => !l.parentId)))];

					// let clone = JSON.parse(JSON.stringify(menus.value));

					nextPageToken = res.body.nextPageToken;
					currentMenus.value = menus.value.length;

					if (res.body.total > -1) {
						totalMenus.value = res.body.total;
						req.fetchCount = false;
					}

					req.page++;

					
				}
				isLoading.value = false;
			}
        } while (nextPageToken != "");
        let listVal = await rearrange(cateArr);
        menus.value = listVal;
        allMenus.value = cateArr;
        if (currentMenus.value > 0) {
            localStorage.setItem("all-menus", JSON.stringify({ menus: menus.value, initial: TIMESTAMP,
                expiresOn: TIMESTAMP + 1000 * 60 * 60 * 24 * 1, // 7day
            }));
        }
        // menus.value.sort((x, y) => x.sortOrder - y.sortOrder);
    };

    function initialize(){
        fetchAllMenu();
    }

    return { menus, allMenus, parentMenus, isLoading, initialize };

});
