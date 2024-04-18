import BaseClient from "./clients/BaseClient";
import SalesClient from "./clients/SalesClient";
import XeroxClient from "./http-commons/XeroxClient";
import AuthClient from "./clients/AuthClient.js";
import ItemsV2Client from "./clients/ItemsV2Client";
import ItemsV3Client from "./clients/ItemsV3Client";
import ItemsBundleClient from "./clients/ItemsBundleClient";
import ItemsClient from "./clients/ItemsClient";
import StocksClient from "./clients/StocksClient";
import OrdersPlaceClient from "./clients/OrdersPlaceClient";
import LookupsClient from "./clients/LookupsClient";
import CmsClient from "./clients/CmsClient";
import CmsV2Client from "./clients/CmsV2Client";

// const serverType = "LOCAL";
const serverType = "PRODUCTION";

const hostType = "http";
// const hostType = (serverType == "PRODUCTION") ? "https" : "http";

const serverIp = '[example].com';

const baseHost = serverType == "PRODUCTION" ? serverIp : '[ip]:44334';

const host = `${hostType}://${baseHost}`;

/*apiKey*/
const apiKey = '[api-keys]';

const authClient = new AuthClient(host, apiKey);
const cmsClient = new CmsClient(host, apiKey, '/api/v2/items/cms');
const cmsV2Client = new CmsV2Client(host, apiKey, '/api/cms');
const itemsClient = new ItemsClient(host, apiKey, '/api/items');
const itemsV2Client = new ItemsV2Client(host, apiKey, '/api/v2/items');
const itemsV3Client = new ItemsV3Client(host, apiKey, '/api/v3/items');
const itemBundlesClient = new ItemsBundleClient(host, apiKey, '/api/bundles');
const itemIndicesClient = new ItemsV3Client(host, apiKey, '/api/search/indices/items');
const stocksClient = new StocksClient(host, apiKey, '/api/stocks');

// const productsClient = new BaseClient(host, apiKey, '/api/v2/items');
const productsClient = new BaseClient(host, apiKey, '/api/v2/items/indices');
const categoriesClient = new BaseClient(host, apiKey, '/api/categories');
const menusClient = new BaseClient(host, apiKey, '/api/menus');
const collectionsClient = new BaseClient(host, apiKey, '/api/collections');
const lookupsClient = new LookupsClient(host, apiKey, '/api/lookups');
const optionsClient = new BaseClient(host, apiKey, '/api/options');
const salesClient = new SalesClient(host, apiKey, '/api/sales');
const ordersPlaceClient = new OrdersPlaceClient(host, apiKey, '/api/checkouts');
const kvpsClient = new BaseClient(host, apiKey, '/api/kvps');
const snippetsClient = new BaseClient(host, apiKey, '/api/snippets');
const companiesClient = new BaseClient(host, apiKey, '/api/companies');


const xeroxClient = new XeroxClient(host, apiKey);

export {
    host,
    apiKey,
    authClient,
    cmsClient,
    cmsV2Client,
    itemsClient,
    itemsV2Client,
    itemsV3Client,
    itemBundlesClient,
    itemIndicesClient,
    productsClient,
    stocksClient,
    categoriesClient,
    menusClient,
    collectionsClient,
    lookupsClient,
    optionsClient,
    salesClient,
    ordersPlaceClient,
    kvpsClient,
    snippetsClient,
    companiesClient,
    // uploadClient,
    xeroxClient,
}