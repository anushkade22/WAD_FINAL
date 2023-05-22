const express = require('express')
const mongoose = require('mongoose')
//const cors = require("cors");
const bodyParser = require('body-parser');
const app = express()

//app.use(bodyParser.json());
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1/student', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected to mongo")
}).catch((error)=>{
    console.log(error)
});

// Define the Student schema
const studentSchema = new mongoose.Schema({
    studentname: String,
    rollno: String,
    wadmarks: Number,
    ccmarks: Number,
    dsbdamarks: Number,
    cnsmarks: Number,
    aimarks:Number
});


  // Create the Student model
const Student = mongoose.model('student', studentSchema);


app.post('/student', (req, res) => {
    const studentData = req.body;
    console.log(JSON.stringify(req.body.studentname))
    Student.create(studentData)
      .then(() => {
        res.send('Student created successfully');
      })
      .catch((error) => {
        res.status(500).send('Error creating student');
      });
  });
  
//to get the students data
app.get('/students', (req, res) => {
    Student.find()
      .then((students) => {
        const formattedStudents = students.map((student) => ({
          studentname: student.studentname,
          rollno: student.rollno,
          wadmarks: student.wadmarks,
          ccmarks: student.ccmarks,
          dsbdamarks: student.dsbdamarks,
          cnsmarks: student.cnsmarks,
          aimarks:student.aimarks
        }));
        res.json(formattedStudents);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error retrieving students' });
  });
}); 

app.get('/students/marks',(req,res)=>{
  //const subject = 'DSBDA';
  const marksThreshold = 20;

  Student.find({ dsbdamarks: { $gt: marksThreshold } })
    .then((students) => {
      const studentNames = students.map((student) => student);
      res.json(studentNames);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving student names' });
    });
});

app.put('/student/:id', (req, res) => {
  const stuID = req.params.id;
  const marks = req.body;
  console.log(req.body);
  Student.findByIdAndUpdate(stuID, { marks })
    .then(() => {
      res.send('Student updated successfully');
    })
    .catch((error) => {
      res.status(500).send('Error updating');
    });
});

// Retrieve names of students who scored more than 25 marks in all subjects
// Retrieve names of students who scored more than 25 marks in all subjects
app.get('/students/more-than-25', (req, res) => {
  const marksThreshold = 25;

  Student.find({ $and: [{ wadmarks: { $gt: marksThreshold } }, { ccmarks: { $gt: marksThreshold } }, { dsbdamarks: { $gt: marksThreshold } }] })
    .then((students) => {
      const studentNames = students.map((student) => student);
      res.json(studentNames);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving student names' });
    });
});

// Retrieve names of students who scored less than 40 marks in both Maths and Science
app.get('/students/less-than-40', (req, res) => {
  const wadMarksThreshold = 40;
  const ccMarksThreshold = 40;

  Student.find({ $and: [{ wadmarks: { $lt: wadMarksThreshold } }, { ccmarks: { $lt: ccMarksThreshold } }] })
    .then((students) => {
      const studentNames = students.map((student) => student);
      res.json(studentNames);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving student names' });
    });
});

app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  Student.findByIdAndDelete(studentId)
    .then(() => {
      res.send('Student deleted successfully');
    })
    .catch((error) => {
      res.status(500).send('Error deleting');
    });
});


app.get('/', (req, res) => {
  Student.find()
    .then((student) => {
      const totalCount = student.length;

      // Create an HTML table to display the data
      let tableHTML = '<table>';
      tableHTML += '<tr><th>Student Name</th><th>Roll number</th><th>Wad marks</th><th>CC marks</th><th>DSBDA marks</th><th>CNS marks</th><th>AI marks</th></tr>';

      // Iterate through the songs and add each row to the table
      student.forEach((student) => {
        tableHTML += `<tr><td>${student.studentname}</td><td>${student.rollno}</td><td>${student.wadmarks}</td><td>${student.ccmarks}</td><td>${student.dsbdamarks}</td><td>${student.cnsmarks}</td><td>${student.aimarks}</td></tr>`;
      });

      tableHTML += '</table>';

      // Send the count and table HTML as the response
      res.send(`<h2>Total studentss: ${totalCount}</h2>${tableHTML}`);
    })
    .catch((error) => {
      res.status(500).send('Error retrieving students');
    });
});

app.listen(3000,()=>{
    console.log("Node app is running")
})
