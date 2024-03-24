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

const getInvoiceOrClient = async(req,res) => {
    try {
        const response = await userService.getInvoiceOrClients(req.body);
        if(response.success) {
            res.status(200).json({
                success: response.success,
                message: response.message,
                data: response.data
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Error getting invoices or clients!!"
        })
    }
}

module.exports = {
    addNewUser,
    addInvoiceOrClient,
    editInvoiceOrClient,
    deleteInvoiceOrClient,
    getInvoiceOrClient
};