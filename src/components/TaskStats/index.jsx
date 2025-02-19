import { Typography, Spin } from "antd";
import { useGetTasksQuery } from "../../tasksApi";

const { Title } = Typography;

const TaskStats = () => {
  const { data: tasks = [], loading, error } = useGetTasksQuery();

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error: {error.message}</p>;

  const taskCount = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const incompleteTasks = taskCount - completedTasks;

  return (
    <>
      <Title level={5}>Общее количество задач: {taskCount}</Title>
      <Title level={5}>Количество выполненных задач: {completedTasks}</Title>
      <Title level={5}>Количество невыполненных задач: {incompleteTasks}</Title>
    </>
  );
};

export default TaskStats;
