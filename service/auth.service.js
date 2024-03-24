const User = require('../models/user.model');
const Client = require('../models/client.model')
const Invoice = require('../models/invoice.model')

const bcrypt = require('bcrypt');

const login = async({ email, password }) => {
    try{
        const user = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new Error(`Incorrect password!!`);
        }

        // get clients of this user
        const associatedClients = await Client.find({ associatedWith: user._id.toString() });

        // get all invoices of every client under this user
        let allInvoices = [];
        for( var client of associatedClients ) {
            let invoice = await Invoice.find({ clientId: client._id });
            allInvoices.push(...invoice);    
        }

        return {
            success: true,
            message: "Authentication succesful!",
            user: {
                name: user.name,
                email: user.email,
                clients: associatedClients,
                invoice: allInvoices 
            }
        }
    } catch(error) {
        return {
            success: false,
            message: "Error authenticating user. Please check your credentials.",
            user: {}
        }
    }
}

module.exports = { login }
