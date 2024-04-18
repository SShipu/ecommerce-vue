# Pagination Library For Public Page...

## **1.** Import usePagination composable
> ### First of all we have to import usePagination composable file in a page .
>> **Example :**  **import** { usePagination } from "@/libs-pub/usePagination" .

## **2.** Define composable
> **Exapmle:** **const** { fetch, updateData, isFetching, fetchError, all, totalItems, totalPages, nextPageToken, currentPage  } = **usePagination**({
        methodRef: clientMethod, 
        defaultPaginationParams: defaultPaginationParams,
});

## **3.** Request to server
> **3.1.** Pass Params like methodRef and defaultPaginationParams .
>> - **methodRef:** Passing clientMethod like (serach, get etc) .
>>
>> - **defaultPaginationParams:** Default Param Object, whitch is define in setup method .
>>> - **Example:** **const** defaultPaginationParams = {
    query: "",
    categoryIds: [],
    categories: [],
    sortParams: [
        {
            field: 'title',
            type: 'ASCENDING',
        },
    ],
    minPrice: 0,
    maxPrice: 5000000,
    page: 1,
    size: 20,
    status: 'ACTIVE',
};

>
> **3.2.** **fetch** and **updateData** is a method whitch are controll state and request and pulling data from server .
>
> **3.3** If we handle with route, 

>> - When **onMounted** hook are trigger then call to **generic** method which are  check the route have routeBehavior .

>>> - If had a routeBehavior is true in route query then call to **readRouteData** method they are read to route **query** and format to request body or update **defaultPaginationParams** and then call **fetch** method with formating  or **defaultPaginationParams** param object which are updated .

>>>> - **Example:** Given below
>
    const generic = async (param) => {

        if(route.query && route.query.routeBehavior && Boolean(route.query.routeBehavior)) {
            readRouteData();
        } else {
            let res = await fetch(param );

            if(res.status == 200) updateRouteData(param)
        }
    }
>

    const readRouteData = async () => {
        let query = formateRouteData(route.query);
        await fetch(query);
    }

>

    const formateRouteData = (param) => {

        defaultPaginationParams.minPrice = param.minPrice;
        defaultPaginationParams.maxPrice = param.maxPrice;
        defaultPaginationParams.page = Number(param.page)
        defaultPaginationParams.size = Number(param.size);
        defaultPaginationParams.categories = [];

        if(param.categories && typeof(param.categories) == 'string') {

            defaultPaginationParams.categories.push(param.categories);

        } else if (param.categories && param.categories.length > 0){

            defaultPaginationParams.categories = [...param.categories];

        } else {

            defaultPaginationParams.categories = param.categories;

        }


        let parseSortParams = [];

        if(param.sortParams && typeof(param.sortParams) == 'string') {

            let srt = JSON.parse('{' + param.sortParams + '}');
            parseSortParams.push(srt);

            defaultPaginationParams.sortParams = parseSortParams;

        } else if (param.sortParams && param.sortParams.length > 0){

            param.sortParams.forEach((s) => {
                parseSortParams.push(JSON.parse('{' + s + '}'));
            });

            defaultPaginationParams.sortParams = parseSortParams;

        }

        return defaultPaginationParams;
    }

>>> - Else call to **fetch** method and then successfully call then call **updateRouteData**
>>>> - **Example:** Given below .

>

    const updateRouteData = (param) => {

        let data = {
            routeBehavior: true,
        };

        data.minPrice = param.minPrice;
        data.maxPrice = param.maxPrice;
        data.page = Number(param.page)
        data.size = Number(param.size);
        data.categories = [];
        data.query = param.query;

        if(param.categories && typeof(param.categories) == 'string') {

            data.categories.push(param.categories);
            
        } else {
            
            data.categories = param.categories;
        
        }

        if(param.sortParams && param.sortParams.length > 0) {
            data.sortParams = [];

            param.sortParams.forEach((s) => {
                let str = '';
                
                Object.keys(s).forEach((obj) => {

                    if(str && str.length > 0) {
                        str = str.concat((',' +  '"' + obj + '" ' + ':' +  '"' + s[obj] +  '"'));
                    } else {
                        str = '"' + obj + '" ' + ':' +  '"' +  s[obj] +  '"';
                    }
                });
                data.sortParams.push(str);
            });
        }

        router.push({
            name: route.query.name,
            query: data,
        })
    }


>

>> - Or when pagination component updated ad then call **updateData** methods and pass with updated **defaultPaginationParams** parametter and call **updateRouteData** pass parametter .

> **3.4.** If we handle with loadmore 
>> - we have to decleare an array variable.
>> - when call **onMounted** hook then we call **fetch** method and pass default params as parametter .
>> - Or when pagination component updated ad then call **updateData** methods and pass with updated **defaultPaginationParams** parametter and call **updateRouteData** pass parametter .
>> - and we set a watcher opposition **all** variable, if **all** variable are changes , all variable concat in decleared array variable .

> ### **N.B:** 
 - ***We don't update route with array of object . if we need update any array of object we have convert any    array of object to arry of string  Like sortParams in **updateRouteData** method and read a route formatting param what we need***.

## **4.** Get Data
>
> **4.1.** We get required **fetching Data**, **total pages**, **current page**  after Successfully service call and also update **isFetching** boolean and **fetchError** message. 
>
<!-- > **4.2.** **all** is variable where set server data . -->
