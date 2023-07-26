import API_URL from '../config';

async function readTripsRequest() {
    return fetch(`${API_URL}/profile/trips`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(response => {
        response.json();
    })
}

export default readTripsRequest;