module.exports = (sequelize, DataTypes) => {
    const Emails = sequelize.define("Emails", {
        subject: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        emailText: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        senderEmail: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        receiEmail: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        replyToId: {
            type: DataTypes.INTEGER,
        }
    });

    return Emails;  
}