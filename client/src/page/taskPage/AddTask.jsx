import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

function AddTask() {
  const { user } = useAuthContext();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [error, setError] = useState(null)
  const [isLoad, setIsLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://app-api-sable.vercel.app/api/tasks/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    const json = await res.json();

    if (res.ok) {
      setTask(json);
      setIsLoad(true);
    }
  };

  return (
    <div>
      {task && <Navigate to="/tasks" />}
      <div className="mt-[70px]">
        <div className="flex flex-col max-w-xl mx-auto border border-zinc-300 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className="font-bold text-[25px]">Add Task</h1>
            <h1 className="font-medium text-[20px] text-zinc-500">TaskFroge</h1>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <p className="text-zinc-500">Title</p>
            <input
              type="text"
              className="border border-zinc-300 rounded-md mb-5 h-8 pl-2"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-zinc-500">Description</p>
            <textarea
              type="textarea"
              rows="4"
              cols="50"
              className="border border-zinc-300 rounded-md mb-5  pl-2"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <button
              type="submit"
              className="px-4 py-2 border bg-blue-500 text-white font-medium rounded-md flex justify-center gap-5 items-center"
            >
              {isLoad && <Spinner />}
              <p>Add</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
