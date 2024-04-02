import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { formatDistanceToNow } from "date-fns";
import Spinner from "../../components/Spinner";

function OneTask() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [task, setTask] = useState(null);
  const url = "http://localhost:5000/api/tasks/" + id;
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();

      if (res.ok) {
        setTask(json);
        setIsLoad(true);
      }
    };
    if (user) {
      fetchTask();
    }
  }, []);

  const handleEdit = () => {
    setIsEdit((e) => !e);
  };
  const handleDel = () => {
    setIsDel((e) => !e);
  };

  return (
    <>
      <div>
        {isEdit && task && <EditTask setIsEdit={setIsEdit} task={task[0]} />}
        {isDel && task && <DeleteTask setIsDel={setIsDel} task={task[0]} />}
        <div className="max-w-[1200px] mx-auto p-5">
          <div className="flex justify-between items-center py-5">
            <div>details {id}</div>
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="px-4  py-1 rounded-md  border border-blue-700 text-blue-700 font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDel}
                className="px-4  py-1 rounded-md border border-red-500 bg-red-200 text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
          {isLoad ? (
            <div className="flex p-4 border gap-5 border-zinc-100 rounded-lg bg-[#fbfbfb] shadow-xl">
              <div className="w-[50%]">
                <div className="mb-10">
                  <p className="text-zinc-500 font-medium mb-[-5px]">Title:</p>
                  <h1 className="text-[25px] font-bold">{task[0].title}</h1>
                </div>
                <div>
                  <p className="text-zinc-500 font-medium">Descripton:</p>
                  <h1 className="text-[18px]">{task[0].description}</h1>
                </div>
              </div>
              <div className="w-[50%]">
                <div className="mb-5">
                  <p className="text-zinc-500 font-medium ">Statuse:</p>
                  <h1
                    className={`
                          ${
                            task[0].status === "OPEN" &&
                            "bg-blue-300 border-blue-600 text-blue-600"
                          }
                          ${
                            task[0].status === "PROGRESS" &&
                            "bg-yellow-300 border-yellow-600 text-yellow-600"
                          }
                          ${
                            task[0].status === "FINISH" &&
                            "bg-green-300 border-green-600 text-green-600"
                          }
                        px-4  text-[25px] font-bold 0 rounded-md border  w-fit `}
                  >
                    {task[0].status}
                  </h1>
                </div>
                <div className="mb-5">
                  <p className="text-zinc-500 font-medium ">Last update:</p>
                  <h1 className="text-[20px] font-bold   text-zinc-500">
                    {formatDistanceToNow(new Date(task[0].updatedAt), {
                      addSuffix: true,
                    })}
                  </h1>
                </div>
                <div className="">
                  <p className="text-zinc-500 font-medium ">Task crated:</p>
                  <h1 className="text-[20px] font-bold text-zinc-500">
                    {formatDistanceToNow(new Date(task[0].createdAt), {
                      addSuffix: true,
                    })}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex justify-center h-[50vh] items-center ">
              <Spinner />{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OneTask;
