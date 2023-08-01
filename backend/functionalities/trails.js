const crud = require("./crud.js");

async function getAssociatedTrails(mountainID, orderBy) {
    try {
        let trails = await crud.select(
            ["Trail", "Mountain_Trail"],
            ["Trail.trail_ID", "trail_name", "difficulty", "trail_length", "water_station", "trail_description"],
            ["Trail.trail_ID = Mountain_Trail.trail_ID", "Mountain_Trail.mountain_ID = " + mountainID],
            orderBy);
        return trails;
    }
    catch (error) {
        console.log("Cannot retrieve trail list");
        throw(error);
    }
}

async function getFinishedTrails(formattedCurrentTime) {
    try {
        let trails = await crud.select(
            ["Trail T", "Trip_Trail R1"],
            ["T.trail_ID", "T.trail_name", "T.difficulty", "T.trail_length", "T.water_station", "T.trail_description"],
            ["T.trail_ID = R1.trail_ID",
                "NOT EXISTS (SELECT DISTINCT R2.trip_ID FROM Trip_Trail R2 WHERE R2.trail_ID = R1.trail_ID EXCEPT SELECT DISTINCT trip_ID FROM Trip WHERE ending_time < \'" + formattedCurrentTime + "\')"],
            "T.trail_name");
        return trails;
    }
    catch (error) {
        console.log(error);
        console.log("Cannot retrieve trail list");
        throw(error);
    }
}

async function getSpanningTrails() {
    try {
        let trails = await crud.select(
            ["Trail T", "Mountain_Trail M1"],
            ["T.trail_ID", "T.trail_name", "T.difficulty", "T.trail_length", "T.water_station", "T.trail_description"],
            ["T.trail_ID = M1.trail_ID",
                "2 <= (SELECT COUNT(DISTINCT M2.mountain_ID) FROM Mountain_Trail M2 WHERE M2.trail_ID = M1.trail_ID)"],
            "T.trail_name");
        return trails;
    }
    catch (error) {
        console.log(error);
        console.log("Cannot retrieve trail list");
        throw(error);
    }
}

const trailFunctions = {
    getAssociatedTrails: getAssociatedTrails,
    getFinishedTrails: getFinishedTrails,
    getSpanningTrails: getSpanningTrails
};

module.exports = trailFunctions;