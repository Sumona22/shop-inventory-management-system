// src/components/RoleButtonGrid.tsx
import React from "react";

interface RoleButtonGridProps {
  functions: string[];
}

const RoleButtonGrid: React.FC<RoleButtonGridProps> = ({ functions }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {functions.map((fn, idx) => (
        <button
          key={idx}
          className="p-4 bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-105 transition-transform text-indigo-700 font-medium"
        >
          {fn}
        </button>
      ))}
    </div>
  );
};

export default RoleButtonGrid;