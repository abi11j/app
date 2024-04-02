import React, { useState, useEffect } from "react";
import SingleItem from "../components/SingleItem";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Tasks() {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setTasks(json);
        setIsLoad(true);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, []);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto p-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <select
              className="border p-1 rounded-md shadow-md"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="ALL">ALL</option>
              <option value="OPEN">OPEN</option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="FINISH">FINISH</option>
            </select>
          </div>

          <div className="hover:scale-105 transition-all duration-150 ease-out">
            <Link
              to="/tasks/new"
              className="px-4 py-2 border bg-blue-500 text-white font-medium rounded-md"
            >
              Add Task
            </Link>
          </div>
        </div>

        {isLoad ? (
          <div className="py-5">
            {tasks.map((el, index) =>
              status !== "ALL" ? (
                status === el.status && <SingleItem key={index} task={el} />
              ) : (
                <SingleItem key={index} task={el} />
              )
            )}
          </div>
        ) : (
          <div className=" flex justify-center h-[50vh] items-center ">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
