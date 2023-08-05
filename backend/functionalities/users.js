const crud = require("./crud.js");

async function findUser(username, password) {
    return new Promise((resolve, reject) => {
        crud.select(
            ["User"], 
            null, 
            ["username = \'" + username + "\'", "password = \'" + password + "\'"], 
            null,
            1)
        .then((user) => {
            resolve(user);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

async function addUser(username, email, password) {
    return new Promise((resolve, reject) => {
        crud.insert(
            "User",
            ["username", "email", "password"],
            ["\'" + username + "\'", "\'" + email + "\'", "\'" + password + "\'"]
        )
        .then(() => {
            resolve();
        })
        .catch((error) => {
            console.log("Cannot add user");
            reject(error);
        });
    });
}

const userFunctions = {
    findUser: findUser,
    addUser: addUser
}

module.exports = userFunctions;