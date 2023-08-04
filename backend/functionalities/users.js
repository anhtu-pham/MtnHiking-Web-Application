const crud = require("./crud.js");

async function findUser(username, password) {
    try {
        let user = await crud.select(
            ["User"], 
            null, 
            ["username = \'" + username + "\'", "password = \'" + password + "\'"], 
            null,
            1);
        return user;
    }
    catch(error) {
        console.log("Cannot find user");
        throw(error);
    }
}

async function addUser(username, email, password) {
    try {
        await crud.insert(
            "User",
            ["username", "email", "password"],
            [username, email, password]
        );
    }
    catch(error) {
        console.log("Cannot add user");
        throw(error);
    }
}

const userFunctions = {
    findUser: findUser,
    addUser: addUser
}

module.exports = userFunctions;