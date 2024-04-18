import { ref } from 'vue';
import { useHedwig } from '@/libs/fuel-station/useHedwig';
import { useFuelController } from '@/libs/fuel-station/useFuelController';
import { useSearchPagination } from '@/libs/fuel-station/useSearchPagination';
import { kvpsClient } from '~/libs/gandalf/apis/config';

const smaugAccessoriesState = {
    isFetching: ref(false),
    isSending: ref(false),
    isDeleting: ref(false),
    all: ref([]),
    page: ref([]),
    paginator: null,
    paginationParams: ref({}),
    paginationParamsRaw: ref({}),
};

export function useSmaugAccessoriesController(
    news = {
        tag: '',
        fetch: false,
        refetchIfExists: false,
        extras: {},
        callbacks: {
            successCallback: null,
            errorCallback: null,
            warningCallback: null,
        },
        size: 20,
    }
) {
    const hedwig = useHedwig({
        tag: '',
        fields: ['name'],
        callbacks: news.callbacks,
    });

    const newsErrorStatusMapping = {
        409: {
            validationErrors: [
                {
                    field: 'name',
                    errorCode: 'conflict',
                },
            ],
        },
    };

    const defaultPaginationParams = {
        textParams: [{
            field: 'type',
            value: news?.extras?.type,
            matchType: 'REGEX',
        }],
        nestedParams: [],
        sortParams: [
            {
                field: 'title',
                type: 'ASCENDING',
            },
        ],
        page: 1,
        size: news.size > 0 ? news.size : 20,
    };

    function constructPaginationParams(params) {
        let obj = JSON.parse(JSON.stringify(defaultPaginationParams));
        if (!params) {
            params = { page: 1 };
        } else {
            if (params.page) {
                obj.page = Number(params.page);
            }
            if (params.query) {
                obj.textParams.push({
                    field: 'title',
                    value: params.query,
                    matchType: 'REGEX',
                });
            }
        }
        return obj;
    }

    function validate(data) {
        if (!data.title || data.title.length == 0) {
            hedwig.setValidationError('title', 'missing_title_news');
            return false;
        }

        if (data.title.length < 2 || data.title.length > 100) {
            hedwig.setValidationError('title', 'length_mismatch_title_news');
            return false;
        }
        return true;
    }

    const base = useFuelController({
        tag: news.tag,
        state: smaugAccessoriesState,
        client: kvpsClient,
        errorStatusMapping: newsErrorStatusMapping,
        hedwig: hedwig,
        defaultPaginationParams: defaultPaginationParams,
        validate,
    });

    const create = async (data) => {
        if (!validate(data)) return;
        let res = await base.create(data);
        if (!res.networkError && res.body && res.body.id) {
            let newNews = JSON.parse(JSON.stringify(data));
            newNews.id = res.body.id;
            let pageClone = JSON.parse(JSON.stringify(smaugAccessoriesState.page.value));
            pageClone = [newNews].concat(pageClone);
            smaugAccessoriesState.page.value = pageClone;
        }
    };

    const update = async (data) => {
        if (!validate(data)) return;
        let res = await base.update(data);
        console.log('news res');
        console.log(res);
        if (!res.networkError && res.status == 202) {
            let index = smaugAccessoriesState.page.value.findIndex((b) => b.id == data.id);
            if (index > -1) {
                let pageClone = JSON.parse(JSON.stringify(smaugAccessoriesState.page.value));
                pageClone[index] = data;
                smaugAccessoriesState.page.value = pageClone;
            }
        }
    };

    if (!smaugAccessoriesState.paginator || news.fetch || news.refetchIfExists)
        smaugAccessoriesState.paginator = useSearchPagination(
            smaugAccessoriesState,
            kvpsClient.search,
            constructPaginationParams,
            'unit'
        );

    /* TODO: check if duplicate, how to elemenate duplicate if any */
    return {
        ...smaugAccessoriesState,
        ...base,
        create,
        update,
        ...smaugAccessoriesState.paginator,
        ...hedwig,
    };
}
