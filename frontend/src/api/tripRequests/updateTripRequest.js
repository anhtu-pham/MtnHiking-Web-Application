import API_URL from '../config';

async function updateTripRequest(trip, ratings) {
    return fetch(`${API_URL}/profile/trips/${trip.tripID}`, {
        method: 'PATCH',
        header: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({
            ratings: ratings
        })
    })
    .then((response) => response.json());
}

export default updateTripRequest;