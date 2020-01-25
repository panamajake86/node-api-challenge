const express = require('express');
const Action = require('../data/helpers/actionModel');
const { validateAction, validateProjectId } = require('../middleware/middleware');

const router = express.Router();

////////////////////////////////HTTP requests//////////////////////////

router.post('/:pid', validateProjectId, validateAction, (req, res) => {
    // const { id } = req.params;
    const body = req.body;

    Action.insert(body)
        .then(act => {
            res.status(200).json(act);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.get('/:pid', validateProjectId, (req, res) => {
    const { id } = req.params;

    Action.get(id)
        .then(act => {
            res.status().json(act);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.delete('/:pid/:aid', validateProjectId, (req, res) => {
    const { aid } = req.params;

    Action.remove(aid)
        .then(act => {
            res.status(200).json({ message: "Deleted successfully!"});
        })
        .catch(err => {
            res.status(500).json({ message: "Server error. Please try again later.", err });
        });
});

router.put('/:pid/:aid', validateProjectId, validateAction, (req, res) => {
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

module.exports = router;