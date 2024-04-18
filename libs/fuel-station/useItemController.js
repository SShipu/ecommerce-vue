import { xeroxClient } from '@/libs/gandalf/apis/config';

/* TODO: find a way to decouple xeroxClient */

export function useItemController() {
    const uploadAttachment = async (
        attachment,
        attachmentType,
        skipUpdateState = false
    ) => {
        if (!skipUpdateState) state.isSending.value = true;

        let imageUploadResponse = await xeroxClient.upload(attachment, attachmentType);
        // if (
        //     hedwig.handleResponseErrorsIfAny(
        //         imageUploadResponse,
        //         'upload_attachment_' + tag,
        //         201,
        //         true,
        //         {}
        //     )
        // ) {
        //     if (!skipUpdateState) state.isSending.value = false;
        //     return;
        // }
        if (!skipUpdateState) state.isSending.value = true;

        return imageUploadResponse.body.url;
    };

    return {
        uploadAttachment,
    };
}
