module.exports = func => {
    return (req, res, next) => {
        fn(req, res, next).catch(e => next(e));
    }
}