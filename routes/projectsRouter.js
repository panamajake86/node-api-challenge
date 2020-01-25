const express = require('express');
const Project = require('../data/helpers/projectModel');
const Action = require('../data/helpers/actionModel');

const router = express.Router();

//////////////////////////////PROJECTS////////////////////////////////

////////////////////////////////HTTP requests//////////////////////////

router.post('/', validateProject, (req, res) => {

    Project.insert()
        .then(pro => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/', (req, res) => {

    Project.get()
        .then(pro => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/:id', validateProjectId, (req, res) => {

    Project.get()
        .then(pro => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/:id/actions', validateProjectId, (req, res) => {

    Project.getProjectActions()
        .then(pro => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.delete('/:id', validateProjectId, (req, res) => {

    Project.remove()
        .then(pro => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.put('/:id', validateProject, (req, res) => {

    Project.update()
        .then(pro => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

////////////////////////////////middleware/////////////////////////////

function validateProjectId(req, res, next) {
    const { id } = req.params;

  Project.getById(id)
    .then(pro => {
      if (req.id == pro.id) {
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

    Action.insert()
        .then(act => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/:id/actions', validateProjectId, (req, res) => {

    Action.get()
        .then(act => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.delete('/:id/actions/:id', validateProjectId, (req, res) => {

    Action.remove()
        .then(act => {
            res.status().json({ message: ""});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.put('/:id/actions/:id', validateProjectId, validateAction, (req, res) => {

    Action.update()
        .then(act => {
            res.status().json({ message: ""});
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

// '', (req, res) => {

//     Project.insert()
//         .then(pro => {
//             res.status().json({ message: ""});
//         })
//         .catch(err => {
//             res.status(500).json({ message: "Server error. Please try again later.", err });
//         });
// }