import React, { useState } from "react";

const AddBranch: React.FC = () => {
  const [businessId, setBusinessId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const branchData = {
      businessId,
      branchName,
      branchAddress,
    };

    console.log("Branch Added:", branchData);

    alert("✅ Branch Added Successfully!");

    setBusinessId("");
    setBranchName("");
    setBranchAddress("");
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-4xl font-bold mb-10">Add New Branch</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-10 rounded-2xl w-[450px]"
      >
        {/* Business ID */}
        <label className="block mb-3 font-semibold">Branch Business ID</label>
        <input
          type="text"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
          className="w-full border p-2 rounded mb-6 focus:outline-blue-500"
          required
        />

        {/* Branch Name */}
        <label className="block mb-3 font-semibold">Branch Name</label>
        <input
          type="text"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          className="w-full border p-2 rounded mb-6 focus:outline-blue-500"
          required
        />

        {/* Branch Address */}
        <label className="block mb-3 font-semibold">Branch Address</label>
        <textarea
          value={branchAddress}
          onChange={(e) => setBranchAddress(e.target.value)}
          className="w-full border p-2 rounded mb-6 focus:outline-blue-500"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-700"
        >
          Add Branch
        </button>
      </form>
    </div>
  );
};

export default AddBranch;
