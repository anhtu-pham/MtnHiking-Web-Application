const db = require("../database/database_connection.js");

// let instance = null;

// class Services {
//     static getInstance() {
//         instance = instance ? instance : new Services();
//         return instance;
//     }

async function insert(table, attributeList, valueList) {
    let attributes = attributeList.join(", ");
    let values = valueList.join(", ");
    let sql =
        "INSERT INTO " + table + " (" + attributes + ") VALUES (" + values + ")";
    console.log(sql);
    return new Promise((resolve, reject) => {
        db.run(sql, (error) => {
            if (error) {
                console.log(error.message);
                console.log("Cannot insert");
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

async function select(
    tableList,
    attributeList,
    conditionList,
    orderBy,
    rowConstraint = 0
) {
    let tables = tableList.join(", ");
    let attributes = attributeList == null ? "*" : attributeList.join(", ");
    let conditions =
        conditionList == null ? "" : " WHERE " + conditionList.join(" AND ");
    let orderByCmd = orderBy == null ? "" : " ORDER BY " + orderBy;
    let rows = rowConstraint == 0 ? "" : " LIMIT " + rowConstraint;
    let sql =
        "SELECT DISTINCT " +
        attributes +
        " FROM " +
        tables +
        conditions +
        orderByCmd +
        rows;
    console.log(sql);
    return new Promise((resolve, reject) => {
        db.all(sql, (error, rows) => {
            if (error) {
                console.log(error.message);
                console.log("Cannot select");
                reject(error);
            } else {
                resolve(rows);
            }
        });
    });
}

async function update(table, toUpdateList, conditionList) {
    let conditions = conditionList.join(" AND ");
    let toUpdate = toUpdateList.join(", ");
    let sql = "UPDATE " + table + " SET " + toUpdate + " WHERE " + conditions;
    console.log(sql);
    return new Promise((resolve, reject) => {
        db.run(sql, (error) => {
            if (error) {
                console.log(error.message);
                console.log("Cannot update");
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

async function remove(db, table, conditionList) {
    let conditions = conditionList.join(" AND ");
    let sql = "DELETE FROM " + table + " WHERE " + conditions;
    console.log(sql);
    return new Promise((resolve, reject) => {
        db.run(sql, (error) => {
            if (error) {
                console.log(error.message);
                console.log("Cannot delete");
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

const crud = {
    insert: insert,
    select: select,
    update: update,
    remove: remove,
};

module.exports = crud;
