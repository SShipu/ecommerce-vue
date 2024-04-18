/* eslint-disable prettier/prettier */
import { ref, onMounted } from 'vue';

export function useDetailPage(fetchPromise = null) {

    const item = ref(null);

    const fetch = async (promiseCall) => {
        let res = await promiseCall;
        if (res.networkError) {
            /* TODO: show message */
            return;
        }

        if (res.status == 200 && res.body) {
            item.value = res.body;
        } else {
            return;
        }
    }

    if (fetchPromise) {
        onMounted(() => {
            fetch(fetchPromise);
        });
    }


    return {
        // cancel,
        fetch,
        item
    }
}
