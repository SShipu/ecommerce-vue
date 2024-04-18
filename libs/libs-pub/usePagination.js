import { ref } from "vue";
// import { useMakeQueryParams } from "./useMakeQueryParams";
import { useRouterQueryParams } from "./useRouterQueryParams";

// const { makeQueryParams } = useMakeQueryParams();

const state = {
    isFetching: ref(false),
    fetchError: ref(''),
    all: ref([]),
    totalItems: ref(0),
    totalPages: ref(0),
    nextPageToken: ref(''),
    currentPage: ref(1),
};

export function usePagination(options){

    const {
        methodRef,
        defaultPaginationParams,
        objForUrlEncodingQuery,
        objForUrlOtherQuery,
        isRouterBehavior,
        routeMethodRef,
        routerMethodRef,
    } = options;

    // const state = {
    //     isFetching: ref(false),
    //     fetchError: ref(''),
    //     all: ref([]),
    //     totalItems: ref(0),
    //     totalPages: ref(0),
    //     nextPageToken: ref(''),
    //     currentPage: ref(1),
    // };


    const fetch = async (params = null) => {

        state.isFetching.value = true;

        let res = await methodRef(params);
        
        if(!res.networkError) {
            if(res.status == 200) {

                state.isFetching.value = false;

                return res;
            } else {
                state.isFetching.value = false;
                state.fetchError.value = 'Server Side Problem';
            }
        } else {
            setTimeout(() => {
                state.isFetching.value = false;
            }, 2000);

            state.fetchError.value = 'Please check your Internate Connections';
        }

        return res;
    }

    const updateData = async (params = null) => {

        let searchReq;

        if(params) {
            searchReq = params;
        } else {
            searchReq = JSON.parse(JSON.stringify(defaultPaginationParams));
        }

        let res = await fetch(searchReq);

         if(res && res.status == 200) {

            if (isRouterBehavior) {

                state.all.value = res.body.list  && res.body.list.length ? res.body.list : [];
    
            }  else {
             
                state.all.value = state.all.value.concat(res.body.list);
            
            }

            state.currentPage.value = Number(searchReq.page);
            state.totalItems.value = res.body.total;
            state.nextPageToken.value = res.body.nextPageToken;
            state.totalPages.value = Math.ceil(state.totalItems.value / searchReq.size);
        } 

        return res;

    }

    return { fetch, updateData, ...state };
}