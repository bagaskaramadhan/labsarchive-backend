const query = {
    insertUser: () => {
        return `
        INSERT INTO
        access_tools.users
        (id_user, name, email, password, role, nisn)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        ;`
    }
}

export = query;