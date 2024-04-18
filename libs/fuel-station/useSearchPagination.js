import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHedwig } from './useHedwig';

export function useSearchPagination(
    pageContainerRef,
    clientMethodRef,
    constructParams,
    tag
) {
    const isFetchingPage = ref(false);
    const fetchPageError = ref('');
    const { handleResponseErrorsIfAny, messageSource } = useHedwig([], null);

    const route = useRoute();

    /* TODO: using route make optional/configurable */
    let initialParams = constructParams(route.query);
    pageContainerRef.paginationParamsRaw.value = route.query;
    const currentPage = ref(initialParams.page);
    pageContainerRef.paginationParams.value = initialParams;

    const totalPages = ref(0);
    const totalItems = ref(0);

    function nextPage() {}

    function prevPage() {}

    async function fetch() {
        pageContainerRef.page.value = [...Array(initialParams.size)].map(() => {
            isLoading: true;
        });
        isFetchingPage.value = true;
        fetchPageError.value = '';

        let res = await clientMethodRef(
            JSON.parse(JSON.stringify(pageContainerRef.paginationParams.value))
        );
        if (handleResponseErrorsIfAny(res, tag, 200, true, {})) {
            fetchPageError.value = messageSource.value.error;
        } else {
            totalPages.value = Math.ceil(
                res.body.total / pageContainerRef.paginationParams.value.size
            );
            totalItems.value = res.body.total;
            pageContainerRef.page.value = res.body.list;
            isFetchingPage.value = false;
        }
        isFetchingPage.value = false;
        if (process.client) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function deleteByIndex(index) {
        console.log('index :: ' + index);
        pageContainerRef.page.value = pageContainerRef.page.value.filter(
            (_, i) => i != index
        );
    }

    /* route part of pagination */
    const updatePaginationParam = (params) => {
        /* TODO: make route update optional/configurable */
        /* silently updating url */
        pageContainerRef.paginationParamsRaw.value = params;
        let qp = '';
        Object.keys(params).forEach((key) => {
            if (qp.length > 0) qp += '&';
            qp += key + '=' + params[key];
        });
        // window.history.pushState({}, null, window.location.pathname + '?' + qp);
        /* end silently updating url */

        let obj = constructParams(params);

        pageContainerRef.paginationParams.value = obj;
        currentPage.value = obj.page;

        fetch();
    };

    fetch();

    return {
        isFetchingPage,
        totalPages,
        totalItems,
        currentPage,
        fetchPageError,
        nextPage,
        prevPage,
        deleteByIndex,
        updatePaginationParam,
    };
}
