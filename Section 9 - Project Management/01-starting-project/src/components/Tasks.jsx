import NewTask from "./NewTask";
import Modal from "./Modal";

import { useState, useRef } from "react";

export default function Tasks({ tasks, onAdd, onDelete }) {
  const modal = useRef();
  const [ taskToDelete, setTasktoDelete] = useState(null);
  
  function handleDelete() {
    onDelete(taskToDelete);
    setTasktoDelete(null);
    modal.current.close();
  }

  function confirmDelete(id) {
    modal.current.open();
    setTasktoDelete(id);
  }

  return (
    <>
      <Modal
        ref={modal}
        buttonCaption="Yes"
        cancel
        buttonCaption2="No"
        onDelete={handleDelete}
      >
        <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Warning!</h2>
        <p className="text-stone-600 mb-4">
          Are you sure you want to delete this project?
        </p>
      </Modal>
      <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <NewTask onAdd={onAdd} />
        {tasks.length === 0 && (
          <p className="text-stone-800 my-4">
            This project does not have any tasks yet.
          </p>
        )}
        {tasks.length > 0 && (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {tasks.map((task) => (
              <li key={task.id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button
                  className="text-stone-700 hover:text-red-500"
                  onClick={()=> confirmDelete(task.id)}
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
