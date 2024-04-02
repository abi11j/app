import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTask from "../page/taskPage/EditTask";
import DeleteTask from "../page/taskPage/DeleteTask";
import { formatDistanceToNow } from "date-fns";

function SingleItem({ task }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDel, setIsDel] = useState(false);

  const handleEdit = () => {
    setIsEdit((e) => !e);
  };
  const handleDel = () => {
    setIsDel((e) => !e);
  };

  return (
    <>
      {isEdit && task && <EditTask setIsEdit={setIsEdit} task={task} />}
      {isDel && task && <DeleteTask setIsDel={setIsDel} task={task} />}
      <div className="w-full border transition-colors border-zinc-300 rounded-md px-3 py-2 grid grid-flow-col my-2 shadow-sm">
        <div className="">
          <h2 className="text-[20px] font-medium">{task.title}</h2>
          <p className="text-zinc-500">{task.description}</p>
        </div>
        <div className="flex items-center">
          {" "}
          <p
            className={`px-2 text-[14px]
         ${
           task.status === "OPEN" && "bg-blue-300 border-blue-600 text-blue-600"
         }
         ${
           task.status === "PROGRESS" &&
           "bg-yellow-300 border-yellow-600 text-yellow-600"
         }
         ${
           task.status === "FINISH" &&
           "bg-green-300 border-green-600 text-green-600"
         }
           rounded-md border  font-medium `}
          >
            {task.status}
          </p>
        </div>
        <div className="flex items-center text-zinc-500">
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Link
            className="px-4  py-1 rounded-md  border border-zinc-500 bg-yellow-300 text-zinc-700 font-medium z-10 hover:scale-105 transition-all duration-150 ease-out"
            to={"/tasks/" + task._id}
          >
            See More
          </Link>
        </div>
      </div>
    </>
  );
}

export default SingleItem;
