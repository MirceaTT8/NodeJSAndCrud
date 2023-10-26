const db = require('../db')

module.exports.getAllEmployees = async () => {
    const [records] = await db.query("SELECT * FROM employees")
    return records;
}

module.exports.getEmployeeById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM employees WHERE id = ?", [id])
    return record;
}

module.exports.deleteEmployee = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM employees WHERE id = ?", [id])
    return affectedRows;
}

module.exports.addOrEditEmployee = async (obj, id = 0) => {

    const name = obj.name || null;
    const employee_code = obj.employee_code || null;
    const salary = obj.salary || null;

    console.log(name,employee_code,salary)

    const sql = id
        ? 'UPDATE employees SET name=?, employee_code=?, salary=? WHERE id=?'
        : 'INSERT INTO employees (name, employee_code, salary) VALUES (?, ?, ?)';

    const params = id
        ? [name, employee_code, salary, id]
        : [name, employee_code, salary];

    const [result] = await db.execute(sql, params);

    if (id) {
        return result.changedRows; // Number of rows updated
    } else {
        return result.insertId; // ID of the newly inserted row
    }
}