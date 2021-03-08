import { useEffect, useState } from "react";
import { v4 } from "uuid";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle === "") {
      alert("Digite o nome do todo");
      return;
    }

    const id = v4();

    const newTask = {
      id,
      title: newTaskTitle,
      isComplete: false,
    };

    setNewTaskTitle('')

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  useEffect(() => {}, [tasks]);

  function handleToggleTaskCompletion(id: string) {
    const newTasks = Array.from(tasks);

    const selectedTask = newTasks.findIndex((t) => t.id === id);

    newTasks[selectedTask].isComplete = true;

    setTasks(newTasks);
  }

  function handleRemoveTask(id: string) {
    const selectedTask = tasks.findIndex((t) => t.id === id);

    const newTasks = Array.from(tasks);

    newTasks.splice(selectedTask, 1);

    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
