import React from "react";
import { useNavigate } from "react-router-dom";

const ManageBranch: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Branch",
      description: "Create a new branch in your system.",
      color: "bg-green-600",
      link: "/branches/manage/add",
      symbol: "+",
    },
    {
      title: "Edit Branch",
      description: "Modify details of an existing branch.",
      color: "bg-blue-600",
      link: "/branches/manage/edit",
      symbol: "✎",
    },
    {
      title: "Delete Branch",
      description: "Remove a branch permanently.",
      color: "bg-red-600",
      link: "/branches/manage/delete",
      symbol: "✖",
    },
  ];

  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-4xl font-bold mb-10">Manage Branch</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {actions.map((item, index) => (
          <div
            key={index}
            className="w-80 bg-white shadow-xl rounded-xl p-6 border hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <div className="flex flex-col items-center">

              {/* Symbol Icon Replacement */}
              <div
                className={`${item.color} text-white text-4xl font-bold p-4 rounded-full mb-4 flex items-center justify-center w-20 h-20`}
              >
                {item.symbol}
              </div>

              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-500 text-sm text-center mt-2">
                {item.description}
              </p>

              <button
                className={`${item.color} mt-4 px-5 py-2 rounded-md text-white`}
              >
                OPEN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBranch;
