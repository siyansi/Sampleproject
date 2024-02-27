import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { IoOptionsOutline } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { db } from "../../firebase/firebase.config";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Taskpage = () => {
  const [assignedValue, setAssignedValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [summaryValue, setSummaryValue] = useState('');
  const [dueValue, setDueValue] = useState('');
  const [projectValue, setProjectValue] = useState('');
  const [taskData, setTaskData] = useState([]);
  const [isAssignedInputVisible, setIsAssignedInputVisible] = useState(false);
  const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);
  const [isSummaryInputVisible, setIsSummaryInputVisible] = useState(false);
  const [isDueInputVisible, setIsDueInputVisible] = useState(false);
  const [isProjectInputVisible, setIsProjectInputVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  

  const handleEditTask = (task) => {
    setEditedTask(task);
    setEditModalVisible(true);
  };


  const handleDeleteTask = async (task) => {
    try {
      // Delete the task from the database
      await db.collection("tasks").doc(task.id).delete();
      console.log("Task deleted successfully!");
      // Update the task data state to reflect the deletion
      setTasks(tasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleApplyChanges = async (editedTask) => {
    try {
      // Update the task with the edited values in the database
      await db.collection("tasks").doc(editedTask.id).update(editedTask);
      console.log("Task updated successfully!");
      // Close the Edit modal
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };


  useEffect(() => {
  const fetchData = async () => {
    try {
      const q = query(collection(db, "tasks"));
      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskData(tasks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
  }, []);
  
  const handleAddTaskTable = async () => {
    try {
      const newTask = {
        assigned: assignedValue,
        status: statusValue,
        summary: summaryValue,
        due: dueValue,
        project: projectValue
      };
  
      await addDoc(collection(db, "tasks"), newTask);
      console.log("Task added successfully!");
   

      setTasks([...tasks, newTask]);
      // Clear input fields after adding the task
      setAssignedValue("");
      setStatusValue("");
      setSummaryValue("");
      setDueValue("");
      setProjectValue("");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <div className="lg:ml-72 md:-ml-64 mt-28 w-full">
      <div>
        {/* Task Heading */}
        <h1 className="text-4xl font-bold  underline p-1 text-cyan-100">Task</h1>
      </div>

      {/* Project Dropdown */}
      <div className="mt-16 flex justify-between italic">
        <div>
          <div role="tablist" className="tabs tabs-bordered ">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab ml-6"
              aria-label="Projects creats"
            />
            <div role="tabpanel" className="tab-content p-10">
              <div className="flex items-center space-x-2">
                <button className="rounded-full bg-gray-300 px-3 py-1 text-sm">
                  Status
                </button>
                <button className="rounded-full bg-gray-300 px-3 py-1 text-sm">
                  Assigned
                </button>
                <button className="rounded-full bg-gray-300 px-3 py-1 text-sm">
                  Due Date
                </button>
                <button className="rounded-full bg-gray-300 px-3 py-1 text-sm">
                  Project
                </button>
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Board"
              checked
            />
            <div role="tabpanel" className="tab-content p-10">
              Tab content 2
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab flex"
              aria-label="All Task"
            />
            <div role="tabpanel" className="tab-content p-10">
              Tab content 3
            </div>
          </div>
        </div>

        {/* Filter and Sort Buttons */}
        <div className="flex items-center gap-1 mr-10">
          {/* Filter Button */}
          <button className="rounded-full  w-20 h-8 mr-4 border-2 border-cyan-300 cursor-pointer ">
            Filter
          </button>
          {/* Sort Button */}
          <button className="rounded-full w-20 h-8 border-2 border-cyan-300 cursor-pointer">
            Sort
          </button>
          <button className="btn-icon hover:text-red-300">
            <CiSearch className="w-10 h-6 text-cyan-200" />
          </button>
          <button>
            <IoMdSettings className="w-10 h-6 text-cyan-200" />
          </button>
          <div>
            {/* <button className="" onClick={fetchData}>Fetch Data</button> */}
          </div>
          <button className="h-10 w-24 rounded-xl border-cyan-400 border-2" onClick={() => document.getElementById('my_modal_3').showModal()}>Add New</button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <div><h1 className="text-3xl border-b-2">Create Task </h1></div>
              <div className="py-4 flex mt-4">
                <h4 className="font-bold text-md flex gap-2" onClick={() => setIsAssignedInputVisible(!isAssignedInputVisible)}> <MdGroup className="mt-1" />Assigned</h4>
                <input
                  type="text"
                  className={`ml-6 border  p-1 border-cyan-400 rounded-lg ${isAssignedInputVisible ? 'block' : 'hidden'}`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setAssignedValue(e.target.value)}
                />
              </div>
              <div className="py-4 flex">
                   <h4 className="font-bold text-md flex gap-2" onClick={() => setIsStatusInputVisible(!isStatusInputVisible)}> <CiLight className="mt-1" />Status</h4>
               {/* Dropdown select for status */}
                  <select
                      className={`ml-6 border w-44 rounded-lg border-cyan-400 p-1 ${isStatusInputVisible ? 'block' : 'hidden'}`}
                  onClick={(e) => e.stopPropagation()}
                 onChange={(e) => setStatusValue(e.target.value)}
               value={statusValue} // Set the selected value
               >   
              <option value="Nothing " className="text-orange-200">.Nothing</option>
              <option value="In process " className="text-blue-400">.In process</option>
              <option value="Archived" className="text-yellow-600  "> <span className=" border-2 bg-yellow-20 w-6 bg-yellow-200">.Archived</span></option>
              <option value="Done" className="text-green-300">.Done</option>
               </select>
               </div>
              <div className="py-4 flex">
                <h4 className="font-bold text-md flex gap-2" onClick={() => setIsSummaryInputVisible(!isSummaryInputVisible)}> <IoOptionsOutline className="mt-1" />Summary</h4>
                <input
                  type="text"
                  className={`ml-6 border rounded-lg  border-cyan-400 p-1 ${isSummaryInputVisible ? 'block' : 'hidden'}`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setSummaryValue(e.target.value)}
                />
              </div>
              <div className="py-4 flex">
                <h4 className="font-bold text-md flex gap-2" onClick={() => setIsDueInputVisible(!isDueInputVisible)}> <BsCalendarDate className="mt-1" />Due</h4>
                <input
                  type="date"
                  className={`ml-6 border rounded-lg border-cyan-400 p-1 ${isDueInputVisible ? 'block' : 'hidden'}`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setDueValue(e.target.value)}
                />
              </div>
              <div className="py-4 flex">
                <h4 className="font-bold text-md flex gap-2" onClick={() => setIsProjectInputVisible(!isProjectInputVisible)}> <FaBookReader className="mt-1" />Project</h4>
                <input
                  type="text"
                  className={`ml-6 border rounded-lg border-cyan-400 p-1 ${isProjectInputVisible ? 'block' : 'hidden'}`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setProjectValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="border-2 border-cyan-400 w-32 h-10 rounded-xl hover:w-36 hover:text-white hover:h-12 " onClick={handleAddTaskTable}>
                Add Task Table
              </button>
            </div>
          </dialog>
        </div>
      </div>

      {/* Filter Component */}
      <div className="flex justify-between items-center rounded-full py-2 px-4 mt-4">
        {/* Filter Buttons */}
        {/* Add Filter Button */}
        <button className="btn-icon">
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="overflow-x-auto w-[80%]">
      {tasks.map((task, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-2xl font-semibold">Task {index + 1}</h2>
          <table className="table mt-2">
            <thead>
              <tr className="border-b border-cyan-300">
                <th>Assigned</th>
                <th>Status</th>
                <th>Summary</th>
                <th>Due</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              <tr key={task.id}>
                <td>{task.assigned}</td>
                <td>{task.status}</td>
                <td>{task.summary}</td>
                <td>{task.due}</td>
                <td>{task.project}</td>
                <td>
                <button className="border border-cyan-300 w-14 h-6 rounded-lg" onClick={() => document.getElementById('my_modal_4').showModal()}>Edit</button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <div><h1 className="text-3xl border-b-2">Create Task </h1></div>
              <div className="py-4 flex mt-4">
              <input
            type="text"
            className=" border  p-1 border-cyan-400 rounded-lg"
            value={editedTask.assigned}
            onChange={(e) => setEditedTask({ ...editedTask, assigned: e.target.value })}
          />
              </div>

              <div className="py-4 flex">
              <select
                   onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                   className=" border  w-32 p-1 border-cyan-400 rounded-lg"
                 value={editedTask.status} // Set the selected value
               >   
              <option value="Nothing " className="text-orange-200">.Nothing</option>
              <option value="In process " className="text-blue-400">.In process</option>
              <option value="Archived" className="text-yellow-600  "> <span className=" border-2 bg-yellow-20 w-6 bg-yellow-200">.Archived</span></option>
              <option value="Done" className="text-green-300">.Done</option>
               </select>
               </div>
              <div className="py-4 flex">
              <input
            type="text"
            value={editedTask.summary}
            className=" border  p-1 border-cyan-400 rounded-lg"
            onChange={(e) => setEditedTask({ ...editedTask, summary: e.target.value })}
          />
              </div>
              <div className="py-4 flex">
              <input
            type="date"
            value={editedTask.due}
            className=" border  p-1 border-cyan-400 rounded-lg"
            onChange={(e) => setEditedTask({ ...editedTask, due: e.target.value })}
          />
              </div>
              <div className="py-4 flex">
              <input
            type="text"
            value={editedTask.project}
            className=" border  p-1 border-cyan-400 rounded-lg"
            onChange={(e) => setEditedTask({ ...editedTask, project: e.target.value })}
          />
              </div>
            </div>
            <div>
            <button className="border-2 border-cyan-400 w-32 h-10 rounded-xl hover:w-36 hover:text-white hover:h-12 " onClick={() => handleApplyChanges(editedTask)}>Apply Changes</button>           
              
            </div>
          </dialog>
                </td>
                <td><button className="border border-cyan-300 w-14 h-6 rounded-lg" onClick={() => handleDeleteTask(task)}>Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      </div>
       
    </div>
  );
};

export default Taskpage;


