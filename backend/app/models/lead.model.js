module.exports = (sequelize, Sequelize) => {
    const Lead = sequelize.define("lead", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Lead;
};