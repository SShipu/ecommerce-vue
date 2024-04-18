class SkuUtils {
 
    extractAttributes (product) {
        let attributeLocal = {};

        if (process.client) {
            attributeLocal = JSON.parse(localStorage.getItem("all-attributes"))
        }
        if (product && product.skus && product.skus.length > 0) {

            let skus = product.skus;
            let foundValueIds = [];
            let flattenedObjs = [];
            let tempFlattenedObjs = {};
            
            for (let i = 0; i < skus.length; i++) {

                let sku = skus[i];

                for (let j = 0; j < sku.optionValues.length; j++) {
                    
                    let attributeValue = sku.optionValues[j];
                    
                    let option = attributeValue.option;

                    let extrasVal = {};
                    let extrasColor = '';

                    let hasAttr = attributeLocal.attributes.filter(i => i.discriminator == false && i.id == attributeValue.optionId);
                    if (hasAttr.length > 0) {
                        
                        let hasExtras = hasAttr[0].values.filter(i => i.id == attributeValue.id && i.optionId == attributeValue.optionId);
                        if (hasExtras[0].extras?.value?.length > 0) {
                            extrasVal = hasExtras[0].extras;
                            if (hasExtras[0].extras?.value != '#ffffff' || hasExtras[0].extras?.value != '#fff') {
                                extrasColor = '#ffffff';
                            } else {
                                extrasColor = '#000000';
                            }
                        }
                    }

                    // if (foundValueIds.includes(attributeValue.id)) continue; //is not working properly
                    if (foundValueIds.find(v => v.id == attributeValue.id && v.optionId == attributeValue.optionId)) continue; 

                    if (tempFlattenedObjs[attributeValue.optionName]) {

                        tempFlattenedObjs[attributeValue.optionName].values.push({
                            code: sku.code,
                            id: attributeValue.id,
                            optionId: option.id,
                            seq: attributeValue.sortOrder,
                            name: attributeValue.name,
                            optionName: option.displayLabel,
                            salesPrice: sku.salesPrice,
                            discountedSalesPrice: sku.discountedSalesPrice,
                            extras: extrasVal,
                            textColor: extrasColor,
                        });
                        // tempFlattenedObjs[attributeValue.optionName] = {
                        //     productCode: product.code,
                        // }
                    } else {

                        tempFlattenedObjs[attributeValue.optionName] = {

                            name: attributeValue.optionName,
                            // productCode: product.code,
                            values: [{ 
                                code: sku.code,
                                id: attributeValue.id, 
                                optionId: option.id,
                                seq: attributeValue.sortOrder, 
                                name: attributeValue.name,
                                optionName: option.displayLabel,
                                salesPrice: sku.salesPrice,
                                discountedSalesPrice: sku.discountedSalesPrice,
                                extras: extrasVal,
                                textColor: extrasColor,
                            }],

                        };
                    }
                    // foundValueIds.push(attributeValue.id);
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
            // if (skus[i].optionValues.length == attributeValues.length) {
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
                if (matchCount == attributeValues.length){
                    return JSON.parse(JSON.stringify(skus[i]));
                }
            // }
        }
        return null;
    }

    skuTotalQuantity (product,sku, locationId) {
        let stock = 0;
        let stockObject = product.stocks.find(s => s.skuCode === sku.code && s.locationId == locationId);
       
        if (sku && stockObject) {
            // for (let j = 0; j < sku.stocks.length; j++) {
            //     stock += Number(sku.stocks[j].total);
            // }
            stock = stockObject.ok;
        }
        
        return stock;
    }

    extractPrice (sku) {
        if (sku.discountedPrice > 0) return sku.discountedPrice;
        return sku.salesPrice;
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
                    // return sku;
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