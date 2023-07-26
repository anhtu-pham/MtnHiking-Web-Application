import API_URL from '../config';

async function addTripRequest(trip) {
    return fetch(`${API_URL}/profile/trips`, {
        method: 'POST',
        header: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({
            trailID: trip.trailID,
            startingTime: trip.startingTime,
            endingTime: trip.endingTime,
            finished: trip.finished
        })
    })
    .then((response) => response.json());
}

export default addTripRequest;