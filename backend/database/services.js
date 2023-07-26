let instance = null;

class Services {
    static getInstance() {
        return instance ? instance : new Services();
    }

    insert(db, table, attributeList, valueList) {
        let attributes = attributeList.join(", ");
        let values = valueList.join(", ");
        let sql = "INSERT INTO " + table + "(" + attributes + ") VALUES(" + values +")";
        console.log(sql);
        return new Promise((resolve, reject) => {
            db.run(sql, (error) => {
                if(error) {
                    console.log(error.message);
                    console.log("Cannot insert");
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }

    // select(db, table, attributeList, orderBy) {
    //     let attributes = (attributeList == null) ? "*" : attributeList.join(", ");
    //     let orderByCmd = (orderBy == null) ? "" : " ORDER BY " + orderBy;
    //     let sql = "SELECT DISTINCT " + attributes + " FROM " + table + orderByCmd;
    //     console.log(sql);
    //     return new Promise((resolve, reject) => {
    //         db.all(sql, (error, rows) => {
    //             if(error) {
    //                 console.log(error.message);
    //                 console.log("Cannot select");
    //                 reject(error);
    //             }
    //             else {
    //                 resolve(rows);
    //             }
    //         });
    //     });
    // }

    select(db, tableList, attributeList, conditionList, orderBy) {
        let tables = tableList.join(", ");
        let attributes = (attributeList == null) ? "*" : attributeList.join(", ");
        let conditions = (conditionList == null) ? "" : "WHERE " + conditionList.join(" AND ");
        let orderByCmd = (orderBy == null) ? "" : " ORDER BY " + orderBy;
        let sql = "SELECT DISTINCT " + attributes + " FROM " + tables + conditions + orderByCmd;
        console.log(sql);
        return new Promise((resolve, reject) => {
            db.all(sql, (error, rows) => {
                if(error) {
                    console.log(error.message);
                    console.log("Cannot select");
                    reject(error);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    update(db, table, toUpdateList, conditionList) {
        let conditions = conditionList.join(" AND ");
        let toUpdate = toUpdateList.join(", ");
        let sql = "UPDATE " + table + " SET " + toUpdate + " WHERE " + conditions;
        console.log(sql);
        return new Promise((resolve, reject) => {
            db.run(sql, (error) => {
                if(error) {
                    console.log(error.message);
                    console.log("Cannot update");
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }

    delete(db, table, conditionList) {
        let conditions = conditionList.join(" AND ");
        let sql = "DELETE FROM " + table + " WHERE " + conditions;
        console.log(sql);
        return new Promise((resolve, reject) => {
            db.run(sql, (error) => {
                if(error) {
                    console.log(error.message);
                    console.log("Cannot delete");
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Services;