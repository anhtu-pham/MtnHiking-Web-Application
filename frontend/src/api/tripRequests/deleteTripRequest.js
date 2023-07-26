import API_URL from '../config';

async function deleteTripRequest(trip) {
    return fetch(`${API_URL}/profile/trips/${trip.tripID}`, {
        method: 'DELETE',
        header: {
            "Content-type": 'application/json'
        }
    })
}

export default deleteTripRequest;