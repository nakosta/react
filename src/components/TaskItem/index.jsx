import { useSelector, useDispatch } from "react-redux";
import { Input, Button, List, Typography } from "antd";
import styles from "./index.module.css";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  setEditingText,
  clearEditingText,
} from "../../redux/slices/editingTextSlice";
import {
  setEditingTask,
  clearEditingTask,
} from "../../redux/slices/editingTaskSlice";
import {
  useEditTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskMutation,
} from "../../tasksApi";

const TaskItem = ({ item, logAction }) => {
  const dispatch = useDispatch();
  const editingText = useSelector((state) => state.editingText.value);
  const editingTask = useSelector((state) => state.editingTask.value);

  const [updateTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTask] = useToggleTaskMutation();

  // Переключение состояния "выполнено"
  const toggleComplete = async (id) => {
    await toggleTask(id);
    logAction("Изменен статус задачи", { id });
  };

  // Начало редактирования
  const startEditing = (id) => {
    dispatch(setEditingTask(id));
    dispatch(setEditingText(item.title));
    logAction("Начато редактирование", { id, title: item.title });
  };

  // Сохранение изменений задачи
  const updateTaskHandler = async (id) => {
    if (editingText.trim()) {
      await updateTask({ id, title: editingText });
      logAction("Обновлена задача", { id, title: editingText });
    }
    dispatch(clearEditingTask());
    dispatch(clearEditingText());
  };

  // Удаление задачи
  const deleteTaskHandler = async (id) => {
    await deleteTask(id);
    logAction("Удалена задача", { id });
  };

  return (
    <List.Item
      key={item.id}
      actions={[
        editingTask === item.id ? (
          <Button
            className={styles.buttonUpdate}
            type="primary"
            key="update"
            onClick={(e) => {
              e.stopPropagation();
              updateTaskHandler(item.id);
            }}
          >
            Update
          </Button>
        ) : (
          <FormOutlined
            key="edit"
            onClick={(e) => {
              e.stopPropagation();
              startEditing(item.id);
            }}
          />
        ),
        <DeleteOutlined
          key="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteTaskHandler(item.id);
          }}
        />,
      ]}
    >
      {editingTask === item.id ? (
        <Input
          value={editingText}
          onChange={(e) => dispatch(setEditingText(e.target.value))}
          onPressEnter={() => updateTaskHandler(item.id)}
        />
      ) : (
        <Typography.Text
          onClick={() => toggleComplete(item.id)}
          className={`${styles.text} ${
            item.isCompleted ? styles.textCompleted : ""
          }`}
        >
          {item.title}
        </Typography.Text>
      )}
    </List.Item>
  );
};

export default TaskItem;
