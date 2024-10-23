import axios from "axios";

export const getTaskList = async () => {
  return await axios
    .get(`http://localhost:8080/tasks`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const createTask = async (data) => {
  return await axios
    .post(`http://localhost:8080/task`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const updateTask = async (id, data) => {
  return await axios
    .patch(`http://localhost:8080/task/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const removeTask = async (id) => {
  return await axios
    .delete(`http://localhost:8080/task/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};
