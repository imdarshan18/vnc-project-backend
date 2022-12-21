var cron = require('node-cron');

const Pool = require('pg').Pool;

var allData = {};

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const dateTime = new Date();

module.initCron = () => {
    const nodeCron = cron.schedule('0 * * * * *', () => {
        console.log('node cron running');
        const allTrees = pool.query(`SELECT * FROM trees where created_at < ${dateTime}`, (error, result) => {
            if(error) throw error;
            allData = allTrees
        });
    });
    
    return true;
}
