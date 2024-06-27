const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const taskModel = require('./model/task');
require("./database");

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));


// View todo
app.get("/", async (req, res) => {
  //Fetch tasks from database
  try {
    const fetch_task = await taskModel.find();
    res.render("task.ejs", { fetch_task });
  } catch (error) {
    res.send(error);
  }
});

app.post('/add-task', async(req, res)=>{
  try {
    const obj = {
      task: req.body.task_name,
    };
    const post = await taskModel.create(obj);
    res.send("Task Added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding post");
  }
})



// Delete Request to delete task by ID
app.delete("/tasks/:id", async (req, res) => {
    const taskId = req.params.id;
    try {
      const deleteTask = await taskModel.findByIdAndDelete(taskId);
      if (!deleteCategory) {
        return res.status(404).send({ error: "Category Not Found" });
      }
      res.send(deleteCategory);
    } catch (error) {
      res.status(500).send({
        error: "Error deleting task",
        details: error,
      });
    }
});

app.listen(port, () => {
  console.log(`port is running at ${port}`)
})