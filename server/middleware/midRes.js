export default function (req, res) {
    res.render('first', {name: res.locals.name});
}
