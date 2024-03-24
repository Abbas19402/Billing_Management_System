const config = {
    dbUri: process.env.DB_CONN_URI | "mongodb+srv://abbasdalal19402:E4q4VSiNIYwrhlp6@cluster0.w96ligs.mongodb.net/billing_management" ,
    port: process.env.PORT | 5000,
}

module.exports = config;