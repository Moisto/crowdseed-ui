'use client'

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";



const MessageItem = ({ message, pngFile, isLast }) => {
  const userImage = "/green-square.png";
  const botImage = `/${pngFile}.png`;
  const [showSources, setShowSources] = useState(false);

  return (
    <div className={`flex flex-col ${isLast ? "flex-grow" : ""}`}>
      <div className="flex items-center mb-4">
        <div className="rounded mr-4 h-8 w-8 relative overflow-hidden ">
          <Image
            src={message.type === "user" ? userImage : botImage}
            alt={`${message.type}'s profile`}
            width={100}
            height={100}
            className=" w-[3rem]"
            priority
            
          />
        </div>
        <p
          className={message.type === "user" ? "user" : "bot"}
          style={{ maxWidth: "90%" }}
        >
          {message.text}
        </p>
      </div>

      {message.sourceDocuments && (
        <div className="mb-6">
          <button
            className="text-gray-600 text-sm font-bold"
            onClick={() => setShowSources(!showSources)}
          >
            Source Documents {showSources ? "(Hide)" : "(Show)"}
          </button>
          {showSources &&
            message.sourceDocuments.map((document, docIndex) => (
              <div key={docIndex}>
                <h3 className="text-gray-600 text-sm font-bold">
                  Source {docIndex + 1}:
                </h3>
                <p className="text-gray-800 text-sm mt-2">
                  {document.pageContent}
                </p>
                <pre className="text-xs text-gray-500 mt-2">
                  {JSON.stringify(document.metadata, null, 2)}
                </pre>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};





const ChatResult = ({ messages, pngFile, maxMsgs }) => {
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  // E.g. Before we reach the max messages, we should add the justify-end property, which pushes messages to the bottom
  const maxMsgToScroll = maxMsgs || 5;

  return (
    <div
      ref={messagesContainerRef}
      className={`bg-white p-10 rounded-xl shadow-lg mb-6 overflow-y-scroll max-w-[30vw] h-[25rem]  flex flex-col space-y-4 ${
        messages.length < maxMsgToScroll && "justify-end"
      }`}
    >
      {messages &&
        messages.map((message, index) => (
          <MessageItem key={index} message={message} pngFile={pngFile} />
        ))}
    </div>
  );
};

export default ChatResult;
