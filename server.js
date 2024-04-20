const express = require('express');
const cors = require('cors');
const mySQL = require('mysql');
const app = express();


app.use(cors());
app.use(express.json());

const db = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'SSB'
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
       if(err) return res.json("Error")
       return res.json(data)
     })
    })

app.post('/create', (req, res) => {
      const sql = "INSERT INTO student (`shno`, `batch`, `rollno`, `name`, `dob`, `adharno`, `address`, `mobileno`, `email`, `qualification`, `yopass`, `marks`, `category`, `occupation`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const values = [
          req.body.shno,
          req.body.batch,
          req.body.rollno,
          req.body.name,
          req.body.dob,
          req.body.adharno,
          req.body.address,
          req.body.mobileno,
          req.body.email,
          req.body.qualification,
          req.body.yopass,
          req.body.marks,
          req.body.category,
          req.body.occupation
      ];
  
      db.query(sql, values, (err, data) => {
          if (err) {
              console.error("Error executing SQL:", err);
              return res.status(500).json({ error: "Error occurred while inserting data" });
          }
          console.log("Data inserted successfully:", data);
          return res.status(200).json({ success: true, message: "Data inserted successfully" });
      });
  });

  app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `shno`=?, `batch`=?, `rollno`=?, `name`=?, `dob`=?, `adharno`=?, `address`=?, `mobileno`=?, `email`=?, `qualification`=?, `yopass`=?, `marks`=?, `category`=?, `occupation`=? WHERE `ID`=?";
    const values = [
        req.body.shno,
        req.body.batch,
        req.body.rollno,
        req.body.name,
        req.body.dob,
        req.body.adharno,
        req.body.address,
        req.body.mobileno,
        req.body.email,
        req.body.qualification,
        req.body.yopass,
        req.body.marks,
        req.body.category,
        req.body.occupation
    ];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error("Error executing SQL:", err);
            return res.status(500).json({ error: "Error occurred while updating data" });
        }
        console.log("Data updated successfully:", data);
        return res.status(200).json({ success: true, message: "Data updated successfully" });
    });
});

  
app.delete('/student/:id', (req, res) => {
  const sql = "DELETE FROM student WHERE `ID`=?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
      if (err) {
          console.error("Error executing SQL:", err);
          return res.status(500).json({ error: "Error occurred while updating data" });
      }
      console.log("Data updated successfully:", data);
      return res.status(200).json({ success: true, message: "Data updated successfully" });
  });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM login WHERE `email`=? AND `password`=?";
    
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error("Error executing SQL:", err);
            return res.status(500).json({ error: "Error occurred while logging in" });
        }
        
        if (data.length > 0) {
            return res.status(200).json({ success: true, message: "Login Successfully" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    });
});

app.listen(8081, () => {
        console.log('Server is running on port 8081')
    })
