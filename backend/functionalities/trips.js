const crud = require("./crud.js");

async function getTrips(username, formattedCurrentTime) {
    let nextTrips = [];
    let pastTrips = [];
    try {
        let trips = await crud.select(
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
        );

        pastTrips = trips;
        let i = 0;
        while(trips[i]["ending_time"] > formattedCurrentTime) {
            let trip = pastTrips.shift();
            nextTrips.push(trip);
            i++;
        }
        return {pastTrips: pastTrips, nextTrips: nextTrips};

        // instance
        //     .select(db, 
        //             ["User", "Trail_trip", "Trail"], 
        //             ["Trail_trip.trip_ID", "Trail.trail_name", "Trail_trip.starting_time", "Trail_trip.ending_time", "Trail_trip.ratings"], 
        //             ["User.username = Trail_trip.username",
        //             "Trail_trip.trail_ID = Trail.trail_ID",
        //             "User.username = \'" + username + "\'"],
        //             "Trail_trip.starting_time DESC")
        //     .then((response) => {
        //         pastTripList = response;
        //         let i = 0;
        //         while(response[i]["Trail_trip.ending_time"] > formattedCurrentTime) {
        //             let trip = pastTripList.shift();
        //             nextTripList.push(trip);
        //             i++;
        //         }
        //         // res.json({trips: response});
        //         res.json({pastTripList: pastTripList, nextTripList: nextTripList});
        //     })
    } catch (error) {
        console.log(error);
        console.log("Cannot get trip list");
        throw(error);
    }
}

async function addTrip(username, trailID, startingTime, endingTime) {
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
        throw(error);
    }
}

async function updateTrip(username, tripID, trailID = "U", startingTime = "U", endingTime = "U") {
    try {
        let userTrip = await crud.select(
            ["User_Trip"],
            null,
            ["username = '" + username + "'", "trip_ID = " + tripID],
            null,
            1
        );
        if (userTrip.length == 1) {
            if (trailID != "U") {
                await crud.update(
                    "Trip_Trail",
                    ["trail_ID = " + trailID],
                    ["trip_ID = " + tripID]
                );
            }
            let toUpdate = [];
            if (startingTime != "U") {
                toUpdate.push("starting_time = \'" + startingTime + "\'");
            }
            if (endingTime != "U") {
                toUpdate.push("ending_time = \'" + endingTime + "\'");
            }
            await crud.update("Trip", toUpdate, ["trip_ID = " + tripID]);
        }
    } catch (error) {
        console.log("Cannot update trip");
        throw(error);
    }
}

async function removeTrip(username, tripID) {
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
        throw(error);
    }
}

const tripFunctions = {
    getTrips: getTrips,
    addTrip: addTrip,
    updateTrip: updateTrip,
    removeTrip: removeTrip
}

module.exports = tripFunctions;