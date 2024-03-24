const userService = require('../service/user.service');

const addNewUser = async(req,res) => {
    try{
        const response = await userService.addUser(req.body);    
        res.status(200).json({response});
        if(!response.success) {
            throw new Error(response.message);
        }
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

const addInvoiceOrClient = async(req,res) => {
    try{
        const response = await userService.addInvoiceOrClients(req.body);    
        res.status(200).json({response});
        if(!response.success) {
            throw new Error(response.message);
        }
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

const editInvoiceOrClient = async(req,res) => {
    try{
        const response = await userService.editInvoiceOrClients(req.body)    
        res.status(200).json({response});
        if(!response.success) {
            throw new Error(response.message);
        }
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

const deleteInvoiceOrClient = async(req,res) => {
    try{
        const response = await userService.deleteInvoiceOrClient(req.body);    
        res.status(200).json({response});
        if(!response.success) {
            throw new Error(response.message);
        }
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

module.exports = {
    addNewUser,
    addInvoiceOrClient,
    editInvoiceOrClient,
    deleteInvoiceOrClient
};