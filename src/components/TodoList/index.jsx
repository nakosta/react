import styles from "./index.module.css";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import TaskStats from "../TaskStats";
import LogoutButton from "../LogoutButton";
import withLogger from "../withLogger";

const LoggedTaskInput = withLogger(TaskInput);

const TodoList = () => (
  <>
    <div className={styles.container}>
      <LoggedTaskInput />
      <TaskList />
    </div>
    <LogoutButton />
    <TaskStats />
  </>
);

export default TodoList;
