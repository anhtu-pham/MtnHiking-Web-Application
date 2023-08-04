import API_URL from '../../config';

async function readTrailsRequest() {
    return fetch(`${API_URL}/trails`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())
}

export default readTrailsRequest;