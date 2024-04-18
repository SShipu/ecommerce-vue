import { usePagination } from "./usePagination";

export function useRouterQueryParams(options) {
    
    const {
        objForUrlEncodingQuery,
        objForUrlOtherQuery,
        routeMethodRef,
        routerMethodRef,
    } = options;

    const getRouteData = () => {
        let query = routeMethodRef.query;


        let decodeObj = null;

        if(process.client && routeMethodRef.products && routeMethodRef.products.length > 0) {
            decodeObj = JSON.parse(window.atob(routeMethodRef.products));
        }

        query.sortParams = [];

        usePagination(options).fetch(query);

        // updateRouteData(params);
        // return params
    }

    const updateRouteData = () => {

        let queryParams = {

        };
        
        // data.page = Number(data.page)
        // data.size = Number(data.size)

        routerMethodRef.push({
            name: routeMethodRef.name,
            query: data
        });
    }

    const genericMethod = async(params) => {

        if(routeMethodRef.query.isRouterBehavior) {
            getRouteData();
        } else {
            let res = await usePagination(options).fetch(params);

            if(res.status == 200) updateRouteData()

        }
    }

    return { getRouteData, updateRouteData, genericMethod };
}