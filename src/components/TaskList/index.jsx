import React, { useEffect } from "react";
import { List } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/slices/tasksSlice";
import styles from "./index.module.css";
import TaskItem from "../TaskItem";
import withLogger from "../withLogger";

const LoggedTaskItem = withLogger(TaskItem);

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <List
      className={styles.list}
      bordered
      dataSource={tasks}
      renderItem={(item) => <LoggedTaskItem item={item} />}
    />
  );
};

export default TaskList;
