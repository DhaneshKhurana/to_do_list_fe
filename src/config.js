//This file has been create to keep all the configuration at one place
//So it gets easier to change whenever I change teh server port number.

export const addTaskURL = "http://localhost:5050/addTask";
export const getTasksURL = "http://localhost:5050/tasks";
export const deleteTasksURL = "http://localhost:5050/deleteTask";

//function create post request body with task as object
export const taskReqObj =  (task) => { 
    const taskObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        // Converting the task object to JSON
        body: JSON.stringify(task), 
      };
      console.log("taskobject being sent", taskObj);
      return taskObj;
};