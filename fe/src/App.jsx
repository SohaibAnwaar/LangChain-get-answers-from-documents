import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import ChatBox from "./components/Content/ChatBox";

import { useState } from "react";
import Facts from "./components/Content/Facts";
import PdfViewer from "./components/PdfViewer";

const App = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [activeContent, setActiveContent] = useState("chat");
  const [facts, setFacts] = useState([]);
  const [document, setDocument] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleReplyClick = (msg) => {
    setFacts(msg);
    setActiveContent("facts");
  };

  const handleCardClick = (reference) => {
    setDocument(null);
    setActiveTab("facts");
    setActiveContent("documents");
    // After a short delay, set the new selected file
    setTimeout(() => {
      setDocument(reference);
    }, 100);
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeContent={activeContent}
            setActiveContent={setActiveContent}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-1/2 flex flex-col">
            <div className="flex-grow border-t">
              {activeTab === "chat" && (
                <ChatBox
                  onReplyClick={handleReplyClick}
                  messages={messages}
                  setMessages={setMessages}
                />
              )}
              {activeTab === "facts" && (
                <Facts info={facts} onCardClick={handleCardClick} />
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col max-h-screen">
            {activeContent === "facts" && (
              <Facts info={facts} onCardClick={handleCardClick} />
            )}
            {activeContent === "documents" && document && (
              <PdfViewer fileMeta={document} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
