import { ref, watch } from 'vue';

export function useHedwig(options = {
    tag: '',
    fields: [],
    callbacks: {
        successCallback: null,
        errorCallback: null,
        warningCallback: null
    }
}) {

    const _constructMessageSource = () => {
        let obj = {
            fields: {},
            error: '',
            success: '',
            warning: ''
        };

        if (options.fields)
            options.fields.forEach(f => obj.fields[f] = '');

        return obj;
    };

    const messageSource = ref(_constructMessageSource());

    const setSuccess = (msg) => {
        let obj = _constructMessageSource();
        obj.success = msg;
        messageSource.value = obj;
    };

    const setError = (msg) => {
        let obj = _constructMessageSource();
        obj.error = msg;
        messageSource.value = obj;
    };

    const setWarning = (msg) => {
        let obj = _constructMessageSource();
        obj.warning = msg;
        messageSource.value = obj;
    };

    const setValidationError = (field, msg) => {
        let obj = _constructMessageSource();
        obj.fields[field] = msg;
        messageSource.value = obj;
    };

    const setValidationErrors = (errors) => {
        let obj = _constructMessageSource();
        errors.forEach(e => {
            obj.fields[e.field] = e.errorCode;
        });
        messageSource.value = obj;
    };

    const handleResponseErrorsIfAny = (res, requestTag, successStatus, bodyNeeded = true, statusMapping) => {


        if (res.networkError) {
            setError('network_error_' + requestTag);
            return true;
        }

        if (res.status != successStatus) {
            let mapping = statusMapping && statusMapping[res.status + ''];
            if (mapping) {
                setValidationErrors(mapping.validationErrors);
                if (mapping.error)
                    setError(mapping.error);
            } else {
                setError('error_' + requestTag)
            }
            return true;
        }

        if (bodyNeeded && !res.body) {
            setError('error_' + requestTag);
            return true;
        }

        return false;
    };

    const hasRegisteredCallbacks = () => {
        return true;
        // return (options.callbacks && (options.callbacks.successCallback != null || options.callbacks.errorCallback != null || options.callbacks.warningCallback != null));
    };


    if (hasRegisteredCallbacks()) {
        watch(messageSource, (newVal) => {
            if (newVal.success.length > 0 && options.callbacks.successCallback) {
                options.callbacks.successCallback(newVal);
            }

            if (newVal.error.length > 0 && options.callbacks && options.callbacks.errorCallback) {
                options.callbacks.errorCallback(newVal)
            }

            if (newVal.warning.length > 0 && options.callbacks && options.callbacks.warningCallback) {
                options.callbacks.warningCallback(newVal);
            }
        });
    }

    return  {
        messageSource,
        setSuccess,
        setWarning,
        setError,
        setValidationError,
        setValidationErrors,
        handleResponseErrorsIfAny
    };
}
