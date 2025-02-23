const authService = require('../service/auth.service');

const login = async(req,res) => {
    try{
        const authResponse = await authService.login({ email: req.body.email, password: req.body.password });
        res.status(200).json({
            success: authResponse.success,
            message: authResponse.message,
            user: authResponse.user
        })
        if(!authResponse.success) throw new Error(authResponse.message);
    } catch(error) {
        throw new Error(error)
    }
}

module.exports = { login }
