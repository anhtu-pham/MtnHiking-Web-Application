import API_URL from '../../config';

async function readMtnsRequest() {
    return fetch(API_URL + "/mountains", {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.log("Cannot fetch mountains");
    })
}

export default readMtnsRequest;