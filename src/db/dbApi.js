import { addTaskURL, deleteTasksURL, getTasksURL, taskReqObj } from "../config";
import uniqid from 'uniqid';

//function to get the value of unique ID
export const getUniqueId = () => {
  return uniqid();
}

//function to send post request to add task to database
export const addTaskToDB = (task) => {
  //taskReqObj() basically contains configuration for post request
  fetch(addTaskURL, taskReqObj(task))
    .then((res) => console.log("data sucessfully added", res))
    .catch((err) => console.log("addTaskToDB: Error Occured::", err));
};

//function to send post request to add task to database
export const deleteTaskFromDB = async (task) => {
  const res = await fetch(deleteTasksURL, taskReqObj(task));
  if (res.status == 200) {
    console.log("data sucessfully deleted", res);
    return true;
  }
  console.log("delteTaskFromDB: Error Occured::", res);
  return false;
};

//function to send get request to server to fetch all the tasks
export const getTasksFromDB = async () => {
  const res = await fetch(getTasksURL, { method: "GET" });
  const data = await res.json();
  console.log("dbAPI: getTasksFromDB: data, data-length", data, data.length);
  return data;
};
