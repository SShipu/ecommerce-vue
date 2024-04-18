import { useRouterQueryParams } from "./useRouterQueryParams";

export function useMakeQueryParams(){

    const makeQueryParams = (params, options) => {
        return useRouterQueryParams(params, options).getRouteData();
    }

    return { makeQueryParams };
}