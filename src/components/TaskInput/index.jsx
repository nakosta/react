import { Input, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setNewTask, clearNewTask } from "../../redux/slices/newTaskSlice";
import { useCreateTaskMutation } from "../../tasksApi";
import styles from "./index.module.css";

const TaskInput = ({ logAction }) => {
  const dispatch = useDispatch();
  const newTask = useSelector((state) => state.newTask.value);

  const [createTask] = useCreateTaskMutation();

  const handleAddTask = async () => {
    if (newTask.trim()) {
      await createTask(newTask);
      logAction("Добавлена задача", { title: newTask });
    }
    dispatch(clearNewTask());
  };

  return (
    <Space.Compact className={styles.space}>
      <Input
        placeholder="What is the task today?"
        value={newTask}
        onChange={(e) => dispatch(setNewTask(e.target.value))}
        onPressEnter={handleAddTask}
      />
      <Button type="primary" onClick={handleAddTask}>
        Add task
      </Button>
    </Space.Compact>
  );
};

export default TaskInput;
