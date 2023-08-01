const crud = require("./crud.js");

async function getMountains(cds, oB) {
    try {
        let mountains = await crud.select(["Mountain"], null, cds, oB);
        return mountains;
    } catch (error) {
        console.log("Cannot retrieve mountain list");
        throw(error);
    }
}

async function getSpecialPlaces(mountainID) {
    try {
        let specialPlaces = await crud.select(
            ["Mountain", "Contains_Special_place"],
            ["place_name", "Contains_Special_place.elevation", "special_quality"],
            [
                "Mountain.mountain_ID = Contains_Special_place.mountain_ID",
                "Mountain.mountain_ID = " + mountainID,
            ],
            null
        );
        return specialPlaces;
    } catch (error) {
        console.log("Cannot retrieve special places");
        throw(error);
    }
}

async function getConditions(mountainID) {
    try {
        let conditions = await crud.select(
            ["Mountain", "Faces_Condition"],
            ["condition_name", "description"],
            [
                "Mountain.mountain_ID = Faces_Condition.mountain_ID",
                "Mountain.mountain_ID = " + mountainID,
            ],
            null
        );
        return conditions;
    } catch (error) {
        console.log("Cannot retrieve conditions");
        throw(error);
    }
}

const mountainFunctions = {
    getMountains: getMountains,
    getSpecialPlaces: getSpecialPlaces,
    getConditions: getConditions
};

module.exports = mountainFunctions;