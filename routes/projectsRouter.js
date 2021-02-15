const express = require('express');
const Project = require('../data/helpers/projectModel');
const Action = require('../data/helpers/actionModel');

const router = express.Router();

//////////////////////////////PROJECTS////////////////////////////////

////////////////////////////////HTTP requests//////////////////////////

router.post('/', validateProject, (req, res) => {
    const body = req.body;

    Project.insert(body)
        .then(pro => {
            res.status(201).json(pro);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/', (req, res) => {

    Project.get()
        .then(pro => {
            res.status(200).json(pro);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;

    Project.get(id)
        .then(pro => {
            res.status(200).json(pro);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params;

    Project.getProjectActions(id)
        .then(pro => {
            res.status(200).json(pro);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;

    Project.remove(id)
        .then(pro => {
            res.status(200).json({ message: 'Deleted successfully!'});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    const { id } = req.params;
    const body = req.body;

    Project.update(id, body)
        .then(pro => {
            res.status(200).json(body);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

////////////////////////////////middleware/////////////////////////////

function validateProjectId(req, res, next) {
    const { id } = req.params;

  Project.get(id)
    .then(pro => {
      if (pro) {
        req.id = pro.id
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "exception", err });
    });
};

function validateProject(req, res, next) {
    const body = req.body;
    const { name } = body;
    const { description } = body;

    if (!body) {
        res.status(400).json({ message: 'Please provide a project.' });
    }
    if (!name) {
        res.status(400).json({ message: 'Please provide a name for your project.' });
    }
    if (!description) {
        res.status(400).json({ message: 'Please provide a description of your project.' });
    }

    next();
};



//////////////////////////////ACTIONS////////////////////////////////

////////////////////////////////HTTP requests//////////////////////////

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    const body = req.body;

    Action.insert(body)
        .then(act => {
            res.status(200).json(act);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params;

    Action.get(id)
        .then(act => {
            res.status(200).json(act);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.delete('/:pid/actions/:aid', validateProjectId, (req, res) => {
    const { aid } = req.params;

    Action.remove(aid)
        .then(act => {
            res.status(200).json({ message: "Deleted successfully!"});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.put('/:pid/actions/:aid', validateProjectId, validateAction, (req, res) => {
    const { aid } = req.params;
    const body = req.body;

    Action.update(aid, body)
        .then(act => {
            res.status(200).json(body);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

////////////////////////////////middleware/////////////////////////////

function validateAction(req, res, next) {
    const body = req.body;
    const { project_id } = body;
    const { description } = body;
    const { notes } = body;

    if (!body) {
        res.status(400).json({ message: 'Please provide an action.' });
    }
    if (!project_id) {
        res.status(400).json({ message: 'Please select a projec.' });
    }
    if (!description) {
        res.status(400).json({ message: 'Please provide a description in your action.' });
    } 
    if (description.length > 128) {
        res.status(400).json({ message: 'Description is limited to 128 characters.'})
    }
    if (!notes) {
        res.status(400).json({ message: 'Please provide notes in your action.' });
    }

    next();
};

module.exports = router;