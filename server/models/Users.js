module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userName: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
    })
    return Users;  
}