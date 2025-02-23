const userService = require('../service/user.service');
const Invoice = require('../models/invoice.model');
const Client = require('../models/client.model');

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
        res.status(200).json(response);
        if(!response.success) {
            console.log(response)
            throw new Error(response.message);
            // res.status(400).json({
            //     success: false,
            //     message: "Error creating new invoice!"
            // })
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: err
        })
    }
}

const editInvoiceOrClient = async(req,res) => {
    try{
        const response = await userService.editInvoiceOrClients(req.body)    
        res.status(200).json(response);
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
        res.status(200).json(response);
        if(!response.success) {
            throw new Error(response.message);
        }
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

const getInvoices = async(req,res) => {
    try {
        const allInvoices = await Invoice.find();
        res.status(200).json({
            success: true,
            message: "Invoices fetched",
            data: allInvoices
        })
    } catch (error) {
        res.status(400).json({
            message: "Error getting invoices!!"
        })
    }
}

const getClients = async(req,res) => {
    try {
        const allClients = await Client.find();
        res.status(200).json({
            success: true,
            message: "Clients fetched!!",
            data: allClients
        })
    } catch (error) {
        res.status(400).json({
            message: "Error getting clients!!, Error: "+error
        })
    }
}

module.exports = {
    addNewUser,
    addInvoiceOrClient,
    editInvoiceOrClient,
    deleteInvoiceOrClient,
    getInvoices,
    getClients
};
