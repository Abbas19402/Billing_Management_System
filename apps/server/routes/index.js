const userRoutes = require('./user.route');
const authRoutes = require('./auth.routes');

const routes = {
    user: userRoutes,
    auth: authRoutes
};

module.exports = routes;