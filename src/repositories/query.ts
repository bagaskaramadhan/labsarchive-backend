const query = {
    insertUser: () => {
        return `
        INSERT INTO
        access_tools.users
        (id_user, name, nisn, password, role)
        VALUES
        ($1, $2, $3, $4, $5);`;
    },
    checkUserByNISN: () => {
        return `
        SELECT nisn, password, role
        FROM access_tools.users
        WHERE nisn = $1
        LIMIT 1`;
    }
}

export = query;