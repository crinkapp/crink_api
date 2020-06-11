const NewsletterModel = (sequelize, type) => {
    return sequelize.define('newsletter', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email_newsletter: {
            type: type.STRING,
            validate: {
                isEmail: true,
            },
            notEmpty: true,
            unique: true
        }
    })
}

module.exports = NewsletterModel;
