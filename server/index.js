console.log("HR EMPLOYEES")
// imports here for express and pg
const pg = require("pg"); // import postgres
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_hr_db')
const express = require('express');
const app = express();
//const path = require('path');//final create absolute path



// imports here for express and pg

// static routes here (you only need these for deployment)

// app routes here
app.get('/api/employees',async(req,res,next)=>{
  try{
    const SQL =`
    SELECT *
    FROM employees
    `;
      const response = await client.query(SQL);
      res.send(response.rows);
  }catch(ex){
      
      next(ex);
  }
    
})
// create your init function

// init function invocation
const init = async()=>{
    console.log("connecting to DATABASE");
    await client.connect();
    console.log("connected to DATABASE" );
    let SQL =`
    DROP TABLE IF EXISTS employees;
    CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE
    );
    INSERT INTO employees(name) VALUES('THOMAS');
    INSERT INTO employees(name, is_admin) VALUES('PERCY', true);
    INSERT INTO employees(name, is_admin) VALUES('JAME', false);
    `;
    await client.query(SQL);
    console.log("data seeded");
    
    const port = process.env.PORT || 3000;
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
        console.log(`curl localhost:${port}/api/employees`)
    })
}

init()