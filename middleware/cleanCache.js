const cleanCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
}

module.exports = cleanCache;