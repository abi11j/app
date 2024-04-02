import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

function DeleteTask({ setIsDel, task }) {
  const { user } = useAuthContext();
  const [delTask, setDelTask] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const url = "http://localhost:5000/api/tasks/" + task._id;

  const handleExit = () => {
    setIsDel(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (res.ok) {
      setIsLoad(true);
      setDelTask(json);
    }
  };

  return (
    <div>
      <div className="w-full h-full fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] z-20">
        {delTask && <Navigate to="/tasks" />}
        <div className="mt-[170px]">
          <div className="flex flex-col max-w-xl mx-auto border border-zinc-300 bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-10">
              <h1 className="font-bold text-[25px] text-center">
                Are you sure to delete task?
              </h1>
            </div>
            <div className="flex gap-2 w-full">
              <button
                onClick={handleExit}
                className="px-4 w-full py-2 border bg-zinc-200 text-zinc-800 font-medium rounded-md"
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoad}
                className="px-4 w-full py-2 border bg-red-500 text-white font-medium rounded-md"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
