import axios from "axios";

const URL = "http://localhost:3006/api/todos";

export const changeDescription = event => ({
  type: "DESCRIPTION_CHANGED",
  payload: event.target.value
});

export const search = () => {
  return (dispatch, getState) => {
    const description = getState().todo.description;
    const search = description ? `&description__regex=/${description}/` : "";
    const request = axios
      .get(`${URL}?sort=-createdAt${search}`)
      .then(resp => dispatch({ type: "TODO_SEARCHED", payload: resp.data }));
  };
};

export const add = description => {
  return dispach => {
    axios
      .post(URL, { description })
      .then(resp => dispach(clear()))
      .then(resp => dispach(search()));
  };
};

export const markAsDone = todo => {
  return dispach => {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => dispach(search()));
  };
};
export const markAsPending = todo => {
  return dispach => {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(resp => dispach(search()));
  };
};

export const remove = todo => {
  return dispach => {
    axios.delete(`${URL}/${todo._id}`).then(resp => dispach(search()));
  };
};

export const clear = () => {
  return [{ type: "TODO_CLEAR" }, search()];
};
