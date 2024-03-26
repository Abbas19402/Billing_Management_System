const User = require('../models/user.model');
const Invoice = require('../models/invoice.model');
const Client = require('../models/client.model');
const bcrypt = require('bcrypt');

const addUser = async({ name, email, password }) => {
    try{
        const hash = await bcrypt.hash(password, 10);

        const userObj = {
            name,
            email,
            password: hash
        }
        
        const newUser = new User(userObj);
        await newUser.save();

        return {
            success: true,
            message: "New user created!"
        }
    } catch(error) {
        return {
            success: false,
            message: `Error creating a new user. Error: ${error}` 
        }
    }
}

const addInvoiceOrClients = async({ addType, payload }) => {
    try{
        if (addType === 'invoice') {
            console.log(addType, payload);
            const existingClient = await Client.findOne({ email: payload.email });
            const allInvoices = await Invoice.find();

            console.log(existingClient)

            if( !existingClient ) {
                return {
                    success: false,
                    message: `This client does'nt exist!`
                }
            }

            await Client.updateOne(
                { _id: existingClient._id },
                {
                  $set: {
                    associatedWith: existingClient.associatedWith,
                    name: existingClient.name,
                    email: existingClient.email,
                    address: existingClient.address
                  },
                  $inc: { totalAmount: payload.amount }
                }
            )
                .then(res => console.log("Updated client's response: ", res))
                .catch(err => console.log("Update's error: ", err))
            
            console.log("New invoice to be added: ",{
                number: allInvoices.length + 1,
                amount: payload.amount,
                date: payload.date,
                clientEmail: payload.email
            })
            const newInvoice = new Invoice({
                number: allInvoices.length + 1,
                amount: payload.amount,
                date: payload.date,
                clientEmail: payload.email
            });

            await newInvoice.save();

            return {
                success: true,
                message: `${addType} added!`,
                data: newInvoice
            }
        } else {
            const newClient = new Client(payload);
            await newClient.save();
            return {
                success: true,
                message: `${addType} added!`,
                data: newClient
            }
        }
    } catch(error) {
        return {
            success: false,
            message: `Error while updating ${editType}. Error: ${error}`
        }
    }
}

const editInvoiceOrClients = async({ editType, payload, payloadId }) => {
    try{
        if (editType === 'invoice') {
            const client = await Client.findOne({ email: payload.clientEmail });
            const existingInvoice = await Invoice.findOne({ number: payload.number });

            if( existingInvoice.amount != payload.amount ) {
                await Client.updateOne(
                    { _id: client._id },
                    { $set: {totalAmount: (client.totalAmount - existingInvoice.amount) + payload.amount} }
                )
            }
            await Invoice.updateOne(
                { number: payload.number },
                { $set: {amount: payload.amount} }
            );
        } else {
            await Client.updateOne({ _id: payloadId }, payload);
        }

        return {
            success: true,
            message: `${editType} edited!!`
        }
    } catch(error) {
        return {
            success: false,
            message: `Error while updating ${editType}. Error: ${error}`
        }
    }
}

const deleteInvoiceOrClient = async({ deleteType, payloadId }) => {
    try {
        if( deleteType == 'invoice' ) {
            const existingInvoice = await Invoice.findOne({ _id: payloadId });
            await Client.updateOne(
                { _id: existingInvoice.clientId },
                { $inc: {totalAmount: -existingInvoice.amount} }
            );
            await Invoice.deleteOne({ _id: payloadId });
        } else {
            console.log(payloadId)
            await Client.deleteOne({ _id: payloadId })
                .then(deleteRes => console.log("Deleted client: ",deleteRes))
                .catch(deleteErr => console.log("Deleted error: ",deleteErr))
        }

        return {
            success: true,
            message: `${deleteType} deleted!`
        }
    } catch(error) {
        return {
            success: false,
            message: `error while updating ${deleteType}. Error: ${error}`
        }
    }
}

// const getInvoiceOrClients = async({ getType }) => {
//     if(getType == 'invoice') {
//         const allInvoices = await Invoice.find();
//         console.log("Invoices fetched: ",allInvoices);
//         return {
//             success: true,
//             message: 'fetched all invoices!',
//             data: allInvoices
//         }
//     } else {
//         const clients = await Client.find();
//         return {
//             success: true,
//             message: 'fetched all clients!',
//             data: clients
//         }
//     }
// }

module.exports = { 
    addUser, 
    addInvoiceOrClients, 
    editInvoiceOrClients, 
    deleteInvoiceOrClient,
    // getInvoiceOrClients
};
