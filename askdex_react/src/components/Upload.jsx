import React, { useState } from "react";
import { uploadText } from "../service/UploadService";
import { useNavigate } from "react-router-dom";

function Upload() {
    const [userText, setUserText] = useState("");
    var [uploadComplete, setUploadComplete] = useState(false);
    var [loading, setLoading] = useState(false);
    var [uploadAlert, setUploadAlert] = useState(false);
    const navigator = useNavigate();

    function uploadUserText() {
        const userTextJson = { userText };
        setLoading(true);
        uploadText(userTextJson)
            .then((response) => {
                console.log("Api Response: ", response);
                setUploadComplete(true);
                setUploadAlert(true);
                setLoading(false);
                setTimeout(() => {
                    setUploadAlert(false);
                }, 3000);
            })
            .catch((e) => {
                console.error(e);
                setUploadComplete(false);
                setUploadAlert(true);
                setTimeout(() => {
                    setUploadAlert(false);
                }, 3000);
            });
    }

    function goToChat() {
        navigator("/chat");
    }

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center">
                {/* Welcome Box */}
                <div className="grid grid-cols-8 items-center w-3/4 mb-4 justify-center">
                    <div className="flex flex-col items-center col-span-8 border border-[#0a4070] shadow-[4px_4px_0px_0px_#000000] bg-[#b8deff] p-4 rounded-2xl">
                        <img src="/askdex.png" className="h-20" alt="AskDex" />
                        <div className="font-extrabold text-2xl text-center text-[#0a4070]">
                            Welcome to <br />
                            <span className="text-4xl">AskDex</span>
                        </div>
                    </div>
                </div>

                {/* Center Container */}
                <div className="grid grid-cols-8 gap-2 min-h-1/2 w-3/4 md:min-h-1/2 bg-white border rounded-2xl shadow-[4px_4px_0px_0px_#000000] p-6">
                    {/* Input Box */}
                    <textarea
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        placeholder="Paste your document text here..."
                        className="border-2 border-gray-300 border-dashed rounded-lg col-span-8 row-span-7 p-2 focus:outline-none"
                    />

                    {/* Upload Button */}
                    <button
                        onClick={uploadUserText}
                        className="col-span-8 flex items-center justify-center text-lg font-bold rounded-lg bg-[#0a4070] border-2 border-[#0a4070] text-[#b8deff] hover:bg-[#b8deff] hover:text-[#0a4070] transition-all duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                            />
                        </svg>
                        &nbsp; Upload &nbsp;
                        {loading && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 animate-spin"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Go to Chat Button */}
                    {uploadComplete && (
                        <button
                            onClick={goToChat}
                            className="col-span-8 flex items-center justify-center text-lg font-bold rounded-lg bg-[#0a4070] border-2 border-[#0a4070] text-[#b8deff] hover:bg-[#b8deff] hover:text-[#0a4070]  hover:border-[#0a4070] transition-all duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                                />
                            </svg>
                            &nbsp; Ask Questions &nbsp;
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Upload Alert */}
            {uploadAlert && (
                <div className="fixed right-2 bottom-2">
                    {uploadComplete ? (
                        <div className="flex justify-center items-center bg-green-200 text-green-800 font-medium border rounded px-4 py-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                />
                            </svg>
                            &nbsp;
                            <div>Upload Successful!</div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center bg-red-200 text-red-800 font-medium border rounded px-4 py-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                />
                            </svg>
                            &nbsp;
                            <div>Upload Failed! Try again.</div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Upload;
