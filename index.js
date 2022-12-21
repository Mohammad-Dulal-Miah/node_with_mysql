
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = 4000;



app.use(cors());
app.use(express.json());

//mysql

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app1'
})

db.connect((err)=>{

    if(err){
        console.log(err);
    }
    else{
        console.log("Mysql connected.....")
    }

})


app.post('/addUser',(req , res)=>{
    const user = req.body;
    const sql = "insert into users set ?";
    let query = db.query(sql , user , (err , result)=>{
        if(err){
            throw err;
        }
        else{
            console.log(result);
            res.send({message:"user added"});
        }
    })
});


app.get('/getUser' , (req,res)=>{

    const sql = "select * from users";
    let query = db.query(sql , (err , results)=>{
        if(err){
            throw err;
        }
        else{
            //console.log(results);
            res.send(results);
        }
    })

})


app.delete('/deleteUser/:id' , (req , res)=>{

    const sql = `delete from users where id = ${req.params.id}`;
    const query = db.query(sql , (err , result)=>{
        if(err){
            throw err;
        }
        else{
            res.send({message:"delete successful"})
        }
    })
})




app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});