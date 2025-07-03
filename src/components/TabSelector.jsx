const TabSelector = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center gap-4 mt-6 mb-4">
      <button
        onClick={() => setActiveTab("discovery")}
        className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition-all duration-300 ${
          activeTab === "discovery"
            ? "bg-rose-400 text-white shadow-lg"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Wander
      </button>
      <button
        onClick={() => setActiveTab("memory")}
        className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition-all duration-300 ${
          activeTab === "memory"
            ? "bg-emerald-500 text-white shadow-lg"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Dear Spots
      </button>
    </div>
  );
};

export default TabSelector;
