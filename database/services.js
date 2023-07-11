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
        db.run(sql, (error) => {
            if(error) {
                console.log(error.message);
                console.log("Cannot insert");
                throw(error);
            }
        });
    }

    select(db, table, isAll, attributeList) {
        let attributes = attributeList.join(", ");
        let sql = isAll ? "SELECT * FROM " + table : "SELECT " + attributes + " FROM " + table;
        console.log(sql);
        db.all(sql, (error, rows) => {
            if(error) {
                console.log(error.message);
                console.log("Cannot select");
            }
            return rows;
        });
    }

    selectConditionally(db, table, isAll, attributeList, conditionList) {
        let attributes = attributeList.join(", ");
        let conditions = conditionList.join(" AND ");
        let sql = isAll ? "SELECT * FROM " + table + " WHERE " + conditions : "SELECT " + attributes + " FROM " + table + " WHERE " + conditions;
        console.log(sql);
        db.all(sql, (error, rows) => {
            if(error) {
                console.log(error.message);
                console.log("Cannot select conditionally");
                throw(error);
            }
            return rows;
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
                throw(error);
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