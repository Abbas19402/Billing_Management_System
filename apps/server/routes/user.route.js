const express = require("express");
const userController = require('../controllers/user.controller')

const router = express.Router();

router.post('/create', userController.addNewUser);
router.post('/create-client', userController.addInvoiceOrClient);
router.post('/create-invoice', userController.addInvoiceOrClient);
router.post('/update-client', userController.editInvoiceOrClient);
router.post('/update-invoice', userController.editInvoiceOrClient);
router.post('/delete-client', userController.deleteInvoiceOrClient);
router.post('/delete-invoice', userController.deleteInvoiceOrClient);
router.get('/invoices',userController.getInvoices),
router.get('/clients',userController.getClients)

module.exports = router;
