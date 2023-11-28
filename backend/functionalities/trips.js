const crud = require("./crud.js");

const getTrips = async (username, formattedCurrentTime) => {
    return new Promise((resolve, reject) => {
        crud.select(
            ["User_Trip", "Trip", "Trip_Trail", "Trail"],
            [
                "Trip.trip_ID",
                "trail_name",
                "starting_time",
                "ending_time",
                "finished"
            ],
            [
                "User_Trip.trip_ID = Trip.trip_ID",
                "Trip.trip_ID = Trip_Trail.trip_ID",
                "Trip_Trail.trail_ID = Trail.trail_ID",
                "username = \'" + username + "\'",
            ],
            "ending_time DESC"
        )
        .then((trips) => {
            let nextTrips = [];
            let pastTrips = trips;
            let i = 0;
            while(trips[i]["ending_time"] > formattedCurrentTime) {
                let trip = pastTrips.shift();
                nextTrips.push(trip);
                i++;
            }
            resolve({pastTrips: pastTrips, nextTrips: nextTrips});
        })
        .catch((error) => {
            console.log(error);
            console.log("Cannot get trip list");
            reject(error);
        });

    });
}

const addTrip = async (username, trailID, startingTime, endingTime) => {
    try {
        let associatedTrail = await crud.select(
            ["Trail"],
            null,
            ["trail_ID = " + trailID],
            null,
            1
        );
        if (associatedTrail.length == 1) {
            await crud.insert(
                "Trip",
                ["starting_time", "ending_time"],
                ["\'" + startingTime + "\'", "\'" + endingTime + "\'"]
            );
            let lastTrip = await crud.select(
                ["Trip"],
                ["trip_ID"],
                null,
                "trip_ID DESC",
                1
            );
            await crud.insert(
                "User_Trip",
                ["trip_ID", "username"],
                [lastTrip[0]["trip_ID"], "\'" + username + "\'"]
            );
            await crud.insert(
                "Trip_Trail",
                ["trip_ID", "trail_ID"],
                [lastTrip[0]["trip_ID"], trailID]
            );
        }
        else {
            console.log("There is no trail associated with the given trail ID");
        }
    } catch (error) {
        console.log(error);
        console.log("Cannot add trip");
        // throw(error);
    }
}

const updateTrip = async (username, tripID, ratings) => {
    try {
        let userTrip = await crud.select(
            ["User_Trip"],
            null,
            ["username = \'" + username + "\'", "trip_ID = " + tripID],
            null,
            1
        );
        if (userTrip.length == 1) {
            await crud.update("Trip", ["ratings = " + ratings], ["trip_ID = " + tripID]);
        }
    } catch (error) {
        console.log("Cannot rate trip");
    }
}

const removeTrip = async (username, tripID) => {
    try {
        let userTrip = await crud.select(
            ["User_Trip"],
            null,
            ["username = \'" + username + "\'", "trip_ID = " + tripID],
            null,
            1
        );
        if (userTrip.length == 1) {
            await crud.remove("User_Trip", ["trip_ID = " + tripID]);
            await crud.remove("Trip_Trail", ["trip_ID = " + tripID]);
            await crud.remove("Trip", ["trip_ID = " + tripID]);
        }
    } catch (error) {
        console.log("Cannot remove trip");
        // throw(error);
    }
}

const tripFunctions = {
    getTrips: getTrips,
    addTrip: addTrip,
    updateTrip: updateTrip,
    removeTrip: removeTrip
}

module.exports = tripFunctions;