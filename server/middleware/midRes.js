function midRes(req, res) {
    res.render('first', {name: res.locals.name});
}

export default {
    midRes
}
