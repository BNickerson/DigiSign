const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        let title = `Digital Sign for ${req.ip}`
        res.render('index', {
            title: title
        });
    } catch (e) {
        console.log(e);
        res.render('error', {
            error: 'Sorry, something went wrong!'
        });
    }
});

module.exports = router;