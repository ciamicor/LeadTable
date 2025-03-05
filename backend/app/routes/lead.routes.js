module.exports = app => {
    const leads = require("../controllers/lead.controller.js");

    let router = require("express").Router()

    /*-| Create new lead |-*/
    router.post("/", leads.create);

    /*-| Retrieve all leads |-*/
    router.post("/", leads.findAll);

    /*-| Retrieve all published leads |-*/
    router.post("/published", leads.findAllPublished);

    /*-| Retrieve single lead by id |-*/
    router.post("/:id", leads.findOne);

    /*-| Update lead by ID |-*/
    router.post("/:id", leads.update);

    /*-| Delete all leads |-*/
    router.post("/", leads.deleteAll);

    app.use('/api/leads', router);
}