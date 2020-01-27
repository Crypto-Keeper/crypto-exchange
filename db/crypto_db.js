const { Pool } = require('pg');

const PG_URI = 'postgres://zfvxzluy:tUjnz9ecL3dw-x-jq1-DnqzIbSzymPRI@rajje.db.elephantsql.com:5432/zfvxzluy'

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
})

// insert queries

// INSERT INTO accounts (username,password,usd,eth) VALUES ('David','David',10000,100);

// INSERT INTO orders (user_id,txn_type,rate,eth) VALUES (1,'ASK',1600000.87,1);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}