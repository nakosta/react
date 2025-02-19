import React from "react";
import { List, Spin } from "antd";
import { useGetTasksQuery } from "../../tasksApi";
import styles from "./index.module.css";
import TaskItem from "../TaskItem";
import withLogger from "../withLogger";

const LoggedTaskItem = withLogger(TaskItem);

const TaskList = () => {
  const { data: tasks = [], loading, error } = useGetTasksQuery();

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error: {error.message}</p>;

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
