import API_URL from '../config';
import SignUp from '../components/authentication/SignUp';

async function retrieveSignUp() {
    return fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(response => <SignUp />)
}

export default retrieveSignUp;