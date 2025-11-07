import React from "react";
import { useNavigate } from "react-router-dom";

const BranchPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-4xl font-bold mb-10">View / Manage Branch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="p-6 shadow-xl bg-white rounded-xl w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">View Branch</h2>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-md"
            onClick={() => navigate("/branches/view")}
          >
            OPEN
          </button>
        </div>

        <div className="p-6 shadow-xl bg-white rounded-xl w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">Manage Branch</h2>
          <button
            className="bg-green-600 text-white px-5 py-2 rounded-md"
            onClick={() => navigate("/branches/manage")}
          >
            OPEN
          </button>
        </div>

      </div>
    </div>
  );
};

export default BranchPage;
