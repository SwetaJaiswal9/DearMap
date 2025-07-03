import React, { useState } from "react";

const AddPinForm = ({ location, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title,
      description: desc,
      lat: location.lat,
      lng: location.lng,
    });

    onClose();
  };

  return (
    <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl w-[90%] max-w-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a New Memory!</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g. Coffee Date ☕"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="What happened here?"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="3"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
          >
            Save Pin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPinForm;
