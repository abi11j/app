import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Spinner from "../components/Spinner";

function Home() {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/api/tasks/count", {
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
      <div className="max-w-[1200px] mx-auto p-10">
        <div className="flex gap-14 flex-wrap">
          <div className="w-[400px] h-[220px] border p-4 rounded-lg bg-slate-200 shadow-xl hover:scale-105 transition-all duration-150 ease-out">
            <p className="text-[25px] text-zinc-700 font-medium">
              Total tasks:
            </p>
            <h1 className="text-[45px]  font-bold text-center m-4">
              {isLoad ? tasks.totalTasks : <Spinner />}
            </h1>
          </div>
          <div className="w-[400px] h-[220px] border p-4 rounded-lg bg-blue-200 shadow-xl hover:scale-105 transition-all duration-150 ease-out">
            <p className="text-[25px] text-zinc-700 font-medium">OPEN tasks:</p>
            <h1 className="text-[45px]  font-bold text-center m-4">
              {isLoad ? tasks.openTasks : <Spinner />}
            </h1>
          </div>
          <div className="w-[400px] h-[220px] border p-4 rounded-lg bg-yellow-200 shadow-xl hover:scale-105 transition-all duration-150 ease-out">
            <p className="text-[25px] text-zinc-700 font-medium">
              PROGRESS tasks:
            </p>
            <h1 className="text-[45px]  font-bold text-center m-4">
              {isLoad ? tasks.progressTasks : <Spinner />}
            </h1>
          </div>
          <div className="w-[400px] h-[220px] border p-4 rounded-lg bg-green-200 shadow-xl hover:scale-105 transition-all duration-150 ease-out">
            <p className="text-[25px] text-zinc-700 font-medium">
              FINISH tasks:
            </p>
            <h1 className="text-[45px]  font-bold text-center m-4">
              {isLoad ? tasks.finishTasks : <Spinner />}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
