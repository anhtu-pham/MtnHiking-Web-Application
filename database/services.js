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

    select(db, table, isAll, attributeList) {
        let records = [];
        let attributes = null;
        if(!isAll) {
            attributes = attributeList.join(", ");
        }
        let sql = isAll ? "SELECT * FROM " + table : "SELECT " + attributes + " FROM " + table;
        console.log(sql);
        db.each(sql, (error, row) => {
            if(error) {
                console.log(error.message);
                console.log("Cannot select");
            }
            records.push(row);
        });
        return records;
    }

    selectConditionally(db, table, isAll, attributeList, conditionList) {

        let attributes = null;
        if(!isAll) {
            attributes = attributeList.join(", ");
        }
        let conditions = conditionList.join(" AND ");
        let sql = isAll ? "SELECT * FROM " + table + " WHERE " + conditions : "SELECT " + attributes + " FROM " + table + " WHERE " + conditions;
        console.log(sql);
        return new Promise((resolve, reject) => {
            db.all(sql, (error, rows) => {
                if(error) {
                    console.log(error.message);
                    console.log("Cannot select conditionally");
                    reject(error);
                }
                resolve(rows);
            });
        });
    }

    update(db, table, toUpdateList, conditionList) {
        let conditions = conditionList.join(" AND ");
        let toUpdate = toUpdateList.join(", ");
        let sql = "UPDATE " + table + " SET " + toUpdate + " WHERE " + conditions;
        console.log(sql);
        db.run(sql, (error) => {
            if(error) {
                console.log(error.message);
                console.log("Cannot update");
            }
        });
    }

    delete(db, table, conditionList) {
        let conditions = conditionList.map((condition) => (condition)).join(" AND ");
        let sql = "DELETE FROM " + table + " WHERE " + conditions;
        console.log(sql);
        db.run(sql, (error) => {
            if(error) {
                console.log(error.message);
                console.log("Cannot delete");
            }
        });
    }
}

module.exports = Services;