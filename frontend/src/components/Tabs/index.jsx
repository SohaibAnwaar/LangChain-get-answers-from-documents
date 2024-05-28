import PropTypes from "prop-types";

const Tabs = ({ activeTab, setActiveTab, activeContent, setActiveContent }) => {
  return (
    <div className="w-1/2 mb-6">
      <div role="tablist" className="tabs tabs-boxed shadow-2xl gap-2">
        <button
          role="tab"
          className={`tab ${activeTab === "chat" && "tab-active !bg-cyan-500 !text-black"}`}
          onClick={() => {
            setActiveTab("chat");
            setActiveContent(null);
          }}
        >
          Chat
        </button>
        <button
          role="tab"
          className={`tab ${
            (activeTab === "facts" && "tab-active !bg-cyan-500 !text-black") ||
            (activeContent === "facts" && "tab-active !bg-cyan-900 !text-white")
          }`}
          onClick={() => {
            setActiveTab("facts");
            setActiveContent(null);
          }}
        >
          Facts Recieved
        </button>
        <button
          role="tab"
          className={`tab ${activeContent === "documents" && "tab-active !bg-cyan-900 !text-white"}`}
        >
          Source Document
        </button>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeContent: PropTypes.string,
  setActiveContent: PropTypes.func.isRequired,
};

export default Tabs;
