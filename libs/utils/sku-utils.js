class SkuUtils {
    extractAttributes (product) {
        if (product && product.skus && product.skus.length > 0) {

            let skus = product.skus;
            let foundValueIds = [];
            let flattenedObjs = [];
            let tempFlattenedObjs = {};
            
            for (let i = 0; i < skus.length; i++) {

                let sku = skus[i];

                for (let j = 0; j < sku.optionValues.length; j++) {
                    
                    let attributeValue = sku.optionValues[j];

                    if (foundValueIds.find(v => v.id == attributeValue.id && v.optionId == attributeValue.optionId)) continue; 

                    if (tempFlattenedObjs[attributeValue.optionName]) {

                        tempFlattenedObjs[attributeValue.optionName].values.push({
                            code: sku.code,
                            id: attributeValue.id,
                            optionId: attributeValue.optionId,
                            seq: attributeValue.sortOrder,
                            name: attributeValue.name,
                            optionName: attributeValue.optionName,
                            salesPrice: sku.salesPrice,
                            discountedSalesPrice: sku.discountedSalesPrice
                        });
                        
                    } else {

                        tempFlattenedObjs[attributeValue.optionName] = {

                            name: attributeValue.optionName,

                            values: [{ 
                                code: sku.code,
                                id: attributeValue.id, 
                                optionId: attributeValue.optionId,
                                seq: attributeValue.sortOrder, 
                                name: attributeValue.name,
                                optionName: attributeValue.optionName,
                                salesPrice: sku.salesPrice,
                                discountedSalesPrice: sku.discountedSalesPrice
                            }],

                        };
                    }
                    foundValueIds.push({id:attributeValue.id, optionId: attributeValue.optionId});
                }
            }

            //will update
            Object.keys(tempFlattenedObjs).forEach((key) => {
                tempFlattenedObjs[key].values = tempFlattenedObjs[key].values.sort((a,b) => a.seq - b.seq);
            });

            Object.keys(tempFlattenedObjs).forEach((key) => {
                flattenedObjs.push(tempFlattenedObjs[key]);
            });

            return flattenedObjs;
        }
        return [];
        
    }
    
    findSkuByAttributeValues (skus, attributeValues) {
        for (let i = 0; i < skus.length; i++) {
            if (skus[i].optionValues.length == attributeValues.length) {
                let matchCount = 0;

                for (let j = 0; j < skus[i].optionValues.length; j++) {

                    for (let k = 0; k < attributeValues.length; k++) {
                        let attrInSku = skus[i].optionValues[j];
                        let attrPassed = attributeValues[k];
                        
                        if (attrInSku.id == attrPassed.id && attrInSku.optionId == attrPassed.optionId) {
                            matchCount++;
                        }

                    }

                }

                if (matchCount == attributeValues.length)
                    return JSON.parse(JSON.stringify(skus[i]));
            }
        }
        return null;
    }

    skuTotalQuantity (product, sku, locationId) {
        let stock = 0;
        let stockObject = product.stocks.find(s => s.skuCode === sku.code && s.locationId == locationId);
       
        if (sku && stockObject) {
            stock = stockObject.ok;
        }
        
        return stock;
    }

    extractPrice (sku) {
        if (sku.discountedPrice > 0) return sku.discountedPrice;
        else if (sku.discountedSalesPrice > 0) return sku.discountedSalesPrice;
        return sku.salesPrice;
    }

    // save money
    skuTotalDiscount (sku) {
        if (sku.discountedPrice > 0) return Number(sku.salesPrice) - Number(sku.discountedPrice);
        else if (sku.discountedSalesPrice > 0) return Number(sku.salesPrice) - Number(sku.discountedSalesPrice);

        return 0;
    }

    extractDefaultSku (product) {
        if (product && product.skus && product.skus.length > 0) {
            let foundDefaultSkuCode = product.defaultSkuCode;

            if (!foundDefaultSkuCode || foundDefaultSkuCode.trim() == "") {
                return JSON.parse(JSON.stringify(product.skus[0]));
            }

            for (let i = 0; i < product.skus.length; i++) {
                let sku = product.skus[i];

                if (sku.code == foundDefaultSkuCode) {
                    return JSON.parse(JSON.stringify(sku));
                }
            }
        }
        
        return null;
    }

    extractDefaultSkuAttributes (product) {
        let defaultSku = this.extractDefaultSku(product);
        if (defaultSku)
            return defaultsku.optionValues;
        return [];
    }

    mergeSelection (selection, selectedAttribute) {
        for (let i = 0; i < selection.length; i++) {
            if (selection[i].name == selectedAttribute.name) {
                selection[i] = selectedAttribute;
                break;
            }
        }
        return JSON.parse(JSON.stringify(selection));
    }

    totalStock (product) {
        if (product && product.skus && product.skus.length > 0) {
            let skus = product.skus;
            let stock = 0;
            for (let i = 0; i < skus.length; i++) {
                let sku = skus[i];
              for (let j = 0; j < sku.stocks.length; j++) {
                stock += Number(sku.stocks[j].total);
              }
            }
            return stock;
        }
        return null;
    }
}

let skuUtils = new SkuUtils();
export default skuUtils;