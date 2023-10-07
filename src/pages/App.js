import React, { useEffect, useState } from "react";
import "../css/App.css";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import {
  addTaskToDB,
  deleteTaskFromDB,
  getTasksFromDB,
  getUniqueId,
} from "../db/dbApi";
import TaskList from "../comps/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //creating tasks state, which bacially contains all task list addded
  const [tasks, setTasks] = useState([]);

  const addTaskOnEnter = (ev)=>{
    if (ev.key === 'Enter') {
      ev.preventDefault();
      addTask();
    }
  }
  
  //function to add task to the list, invoked on clicking the add task button
  const addTask = () => {
    const taskInputElem = document.getElementById("taskInput");
    const taskTitle = taskInputElem.value;
    taskInputElem.value = "";
    const taskId = getUniqueId();
    const task = { id: taskId, task: taskTitle };
    //console.log("App: addTask: task::", task);
    addTaskToDB(task);
    setTasks([...tasks, task]);
  };

  //fucntion which calls the function for deleting record
  //and then update the list to reflect changes in UI
  const deleteTask = async (task) => {
    const success = await deleteTaskFromDB(task);
    if (success) {
      setTasks(tasks.filter((obj) => task.id !== obj.id));
    } else {
      console.log("Appjs: Task could not be deleted from database");
    }
  };

  //Loading the tasks initially, when application starts
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTasksFromDB();
      console.log("TaskList: useEffect: Data::", data);
      setTasks(data);
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="App d-flex flex-column ">
      <p className="header">To Do List App</p>
      <Stack className="d-flex flex-grow-1 align-content-center justify-content-center ">
        <div>
          <Row>
            <Col sm={12} md={{ span: 8, offset: 2 }}>
              <Form>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Enter the Task</InputGroup.Text>
                  <Form.Control id="taskInput" onKeyDown={addTaskOnEnter}/>
                  <Button variant="success" onClick={addTask}>
                    Add Task
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <TaskList taskList={tasks} deleteTask={deleteTask} />
        </div>
      </Stack>
    </Container>
  );
}

export default App;
