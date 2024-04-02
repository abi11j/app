import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

function EditTask({ setIsEdit, task }) {
  const { user } = useAuthContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [upTask, setUpTask] = useState(null);
  const opt = ["OPEN", "PROGRESS", "FINISH"];
  const url = "https://app-api-sable.vercel.app/api/tasks/" + task._id;

  const handleExit = () => {
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status }),
    });

    const json = await res.json();

    if (res.ok) {
      setUpTask(json);
    }
  };

  return (
    <div className="w-full h-full fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] z-20">
      {upTask && <Navigate to="/tasks" />}
      <div className="mt-[70px]">
        <div className="flex flex-col max-w-xl mx-auto border border-zinc-300 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className="font-bold text-[25px]">Edit Task</h1>
            <button
              onClick={handleExit}
              className="font-medium text-[20px] border border-zinc-500 px-2 rounded-mdcd text-zinc-500"
            >
              x
            </button>
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
            <p className="text-zinc-500">Status</p>
            <select
              className="border border-zinc-300 rounded-md mb-5"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              {opt.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 border bg-blue-500 text-white font-medium rounded-md">
              Applay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
