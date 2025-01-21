import Button from "./Button";
import Modal from "./Modal";
import Tasks from "./Tasks";
import { useRef } from "react";

export default function SelectedProject({ project, onDelete,onAddTask, onDeleteTask,tasks }) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const modal = useRef();

  return (
    <>
      <Modal ref={modal} buttonCaption="Yes" cancel buttonCaption2="No" onDelete={onDelete}>
        <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">
          Warning!
        </h2>
        <p className="text-stone-600 mb-4">
          Are you sure you want to delete this project?
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">
              {project.title}
            </h1>
            <Button onClick={()=>modal.current.open()}>Delete</Button>
          </div>
          <p className="mb-4 text-stone-400">{formattedDate}</p>
          <p className="text-stone-600 whitespace-pre-wrap">
            {project.description}
          </p>
        </header>
        <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks.filter((task) => task.projectId === project.id)}/>
      </div>
    </>
  );
}
