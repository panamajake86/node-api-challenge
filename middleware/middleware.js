module.exports = {
    validateProjectId,
    validateProject,
    validateAction
};

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