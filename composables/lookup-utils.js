class LookupUtils {
    groupLookupsByType(lookups) {
        let groups = {};
        for (let i = 0; i < lookups.length; i++) {
            if (groups[lookups[i].type]) {
                groups[lookups[i].type].push(lookups[i]);
            } else {
                groups[lookups[i].type] = [lookups[i]];
            }
        }
        return groups;
    }
}
let lookupUtils = new LookupUtils();
export default lookupUtils;