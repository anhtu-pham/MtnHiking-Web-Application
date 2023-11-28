const crud = require("./crud.js");

const findUser = async (username, password) => {
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

const addUser = async (username, email, password) => {
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

const updateInformation = async (username, information) => {
}

const userFunctions = {
    findUser: findUser,
    addUser: addUser,
    updateInformation: updateInformation
}

module.exports = userFunctions;