import { xeroxClient } from '@/libs/gandalf/apis/config';

/* TODO: find a way to decouple xeroxClient */

/* TODO: Have modify silent query set */

export function useFuelController(options) {
    const {
        tag,
        state,
        client,
        errorStatusMapping,
        hedwig,
        defaultPaginationParams,
        validate,
    } = options;

    const create = async (data) => {
        if (validate && !validate(data)) return;
        state.isSending.value = true;
        let res = await client.create(data);
        state.isSending.value = false;
        if (
            hedwig.handleResponseErrorsIfAny(
                res,
                'create_' + tag,
                201,
                true,
                errorStatusMapping
            )
        ) {
            state.isSending.value = false;
            return res;
        }
        hedwig.setSuccess('success_create_' + tag);
        return res;
    };

    const update = async (data) => {
        if (validate && !validate(data)) return;
        state.isSending.value = true;
        let res = await client.update(data);
        state.isSending.value = false;
        if (
            hedwig.handleResponseErrorsIfAny(
                res,
                'update_' + tag,
                202,
                false,
                errorStatusMapping
            )
        ) {
            state.isSending.value = false;
            return;
        }
        hedwig.setSuccess('success_update_' + tag);
        return res;
    };

    const fetchAll = async (params = null) => {
        state.isFetching.value = true;
        state.all.value = [...Array(20)].map(() => {
            isLoading: true;
        });
        let searchReq;
        if (params) {
            searchReq = params;
            searchReq.size = 50;
        } else {
            searchReq = JSON.parse(JSON.stringify(defaultPaginationParams));
            searchReq.size = 50;
        }

        let all = [];
        let nextPageToken = '';

        do {
            let res = await client.search(searchReq);
            if (
                !hedwig.handleResponseErrorsIfAny(
                    res,
                    'fetch_' + options.tag,
                    200,
                    true,
                    errorStatusMapping
                )
            ) {
                all = all.concat(res.body.list);
                searchReq.page++;
                nextPageToken = res.body.nextPageToken;
            } else {
                nextPageToken = '';
            }
        } while (nextPageToken !== '');
        state.isFetching.value = false;
        state.all.value = all;
    };

    const deleteOne = async (params, page, index) => {
        state.isDeleting.value = true;

        let res = await client.delete(params);
        if (
            !hedwig.handleResponseErrorsIfAny(
                res,
                'delete_' + tag,
                202,
                false,
                errorStatusMapping
            )
        ) {
            state.paginator.deleteByIndex(index);
            hedwig.setSuccess('success_delete_' + options.tag);
        }

        state.isDeleting.value = false;
        return res;
    };

    const uploadAttachment = async (
        attachment,
        attachmentType,
        skipUpdateState = false
    ) => {
        if (!skipUpdateState) state.isSending.value = true;

        let imageUploadResponse = await xeroxClient.upload(attachment, attachmentType);
        if (
            hedwig.handleResponseErrorsIfAny(
                imageUploadResponse,
                'upload_attachment_' + tag,
                201,
                true,
                {}
            )
        ) {
            if (!skipUpdateState) state.isSending.value = false;
            return;
        }
        if (!skipUpdateState) state.isSending.value = true;

        return imageUploadResponse.body.url;
    };

    return {
        create,
        update,
        fetchAll,
        deleteOne,
        uploadAttachment,
    };
}
