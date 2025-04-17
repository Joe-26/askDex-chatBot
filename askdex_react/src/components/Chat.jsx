import React from "react";
import { useState, useEffect } from "react";
import { deleteVectorDb, getAnswer } from "../service/ChatService";
import { useNavigate } from "react-router-dom";

export default function Chat() {
    // User and Bot Input
    const [userInput, setUserInput] = useState("");

    // Chat History
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const navigator = useNavigate();

    function handleButtonClick() {
        setShowHistory(true);
        console.log("User Input: " + userInput);

        // Add user message to history
        setHistory([...history, { role: "user", content: userInput }]);

        // Clear the input field
        setUserInput("");
    }

    useEffect(() => {
        if (history.length > 0 && history[history.length - 1].role === "user") {
            // Simulate bot response (replace with actual API call)
            const userQuery = history[history.length - 1].content;
            getBotResponse(userQuery);
        }
    }, [history]);

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            handleButtonClick();
        }
    };

    const getBotResponse = async (query) => {
        try {
            const response = await getAnswer(query);
            setHistory([...history, { role: "bot", content: response.data }]);
        } catch (error) {
            console.error("Error fetching bot response:", error);
            // Handle error, e.g., display an error message to the user
            setHistory([
                ...history,
                {
                    role: "bot",
                    content: "Error getting response. Please try again.",
                },
            ]);
        }
    };

    function handelBack() {
      const userConfirmation = window.confirm("Are you Sure you want to go back?\nChat History won't be saved & you'll have to upload the document again");
      if (userConfirmation) {
        console.log("User confirmed going back. Deleting vector DB...");
        deleteVectorDb().then((response) =>{
          console.log(response);
          navigator('/');
        }).catch((e) => console.error(e))
      }
    }
    return (
        <>
            {/* Back Button */}
            <div className="flex items-center justify-start px-4 py-8 h-[5vh]">
                <button 
                  className="border shadow-[2px_2px_0px_0px_#000000] rounded-lg bg-slate-200 p-2"
                  onClick={handelBack}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                    </svg>
                </button>
            </div>

            {/* History Chatbox */}
            <div className="h-[80vh] flex flex-col">
                {showHistory ? (
                    // Show Chat History
                    <div className="flex-grow overflow-y-auto flex flex-col-reverse">
                        {/* Chat History */}
                        <div className="flex flex-col">
                            {history.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-2 my-1 flex ${
                                        item.role === "user"
                                            ? "flex-row-reverse text-right "
                                            : "flex-row"
                                    }`}
                                >
                                    <span
                                        className={`px-2 py-1 rounded-xl ${
                                            item.role === "user"
                                                ? "bg-[#b8deff] border border-r-3 border-b-3 border-[#006fcc]"
                                                : "bg-[#006fcc] border-2 border-[#b8deff] text-slate-200"
                                        }`}
                                    >
                                        {item.content}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center h-full justify-center">
                        <div className="flex flex-col items-center border border-[#0a4070] border-r-4 border-b-4 bg-[#b8deff] p-4 rounded-2xl">
                            <img
                                src="/askdex.png"
                                className="h-20"
                                alt="AskDex"
                            />
                            <span className="font-extrabold text-4xl text-[#0a4070]">
                                Welcome to AskDex
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="bottom-7 absolute w-full">
                <div className="bg-slate-200 mx-4 px-4 py-2 flex rounded-full justify-between">
                    <input
                        placeholder="Ask anything"
                        className="w-full focus:outline-none"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleEnterKeyPress}
                    />
                    <button onClick={handleButtonClick}>
                        <img src="/send.png" className="h-7" alt="Send" />
                    </button>
                </div>
            </div>
        </>
    );
}
