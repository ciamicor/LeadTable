const db = require("../models");
const Lead = db.lead;
const Op = db.Sequelize.Op;

/*-| Create and Save a new lead |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
exports.create = (req, res) => {
    // Validate request
    if (!reg.body.title) {
        res.status(400).send({
            message: "A message needs a body."
        })
        return;
    }

    // Create a lead
    const lead = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    // Save in database
    Lead.create(lead)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Uh-oh. Something went wrong."
            })
        })
};

/*-| Retrieve all leads from the database |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {title: { [Op.like]: '%{title}%' } } : null

    Lead.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Uh-oh. Something went wrong."
            })
        })
};

/*-| Find a single Tutorial with an id |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
exports.findOne = (req, res) => {
    const id = req.params.id;

    Lead.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Sorry, I can't find a lead with id ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Sorry, I can't find a lead with id ${id}`
            })
        })
};

/*-| Update a lead by the id in the request |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
exports.update = (req, res) => {
    const id = req.params.id;
    const title = req.params.title;

    Lead.update(req.body, {
        where: {id : id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: `${title} was updated successfully.`
                })
            } else {
                res.send({
                    message: `Sorry, I wasn't able to update ${title}. They may not exist.`
                })
            }
        })
};

/*-| Delete a lead with the specified id in the request |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
exports.delete = (req, res) => {
    const id = req.params.id
    const title = req.params.title

    Lead.destroy({
        where: {id : id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: `${title} was deleted successfully.`
                })
            } else {
                res.send({
                    message: `Sorry, I can't delete ${title}. They may not exist.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete ${title}.`
            })
        })
};

/*-| Delete all leads from the database |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
exports.deleteAll = (req, res) => {
    Lead.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} leads were successfully deleted.`
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'An error occurred while removing all leads.'
            })
        })
};

/*-| Find all published leads |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
exports.findAllPublished = (req, res) => {
    Lead.findAll({where: {published: true}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'An error occurred while finding all leads.'
            })
        })
};
