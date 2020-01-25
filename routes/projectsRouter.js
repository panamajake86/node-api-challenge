const express = require('express');
const Project = require('../data/helpers/projectModel');
const { validateProject, validateProjectId } = require('../middleware/middleware');

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

module.exports = router;