import { Stack } from "react-bootstrap";

const TaskList = ({ taskList, deleteTask }) => {

  //It is just a simple list of paragraphs containing task
  return (
    <Stack id="taskList" className="col-md-5 mx-auto">
      {taskList.map((task) => (
        <Stack key={task.id} className="taskInList justify-content-between px-2" direction="horizontal">
          <span >
            {task.task}
          </span>
          <span className="trashIcon">
            <i className="bi bi-trash" onClick={()=>deleteTask(task)}></i>
          </span>
        </Stack>
      ))}
    </Stack>
  );
};

export default TaskList;
