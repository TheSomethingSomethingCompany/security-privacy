"use client"
import Image from "next/image";
import ChatBubble from "../components/conversations/ChatBubble";
import Img from "../images/ExamplePenguin.jpeg";
import retrieveChats from "./api/retrieveChatsFromServer";
import { get } from "http";
import { use, useEffect, useState } from "react";

export default function Chats() {
  
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    async function getChats() {
    let res = await retrieveChats();
    console.log("RESPONSE FROM SERVER:")
    console.log(res);
    console.log(res.data);
    setResponse(res.data);
    }
    getChats();
  }, []);




  return (
    <section className="m-4 mt-40 grid grid-cols-4 grid-rows-1 rounded-lg shadow-md drop-shadow-md w-screen h-full bg-purple-100">
      {/* First, we need to make an api call to the RetrieveChats route */}
      <div className = "flex flex-col itmes-center col-span-1">

        {
        response.map((chat) => {
          return (
            <div data-chat-id = {chat.chatID} className="m-2 rounded-lg shadow-md drop-shadow-md flex flex-row justify-evenly bg-white h-fit w-full"> {/* A single chat */}
              <div className="flex flex-row justify-between flex-1 p-4 bg-blue-500">
                <div className="p-2">
                  <img
                    src={Img.src}
                    alt="Example"
                    className="w-24 rounded-full object-scale-down"
                  />
                </div>
                <div className="flex flex-col flex-1 w-full bg-red-500 items-start justify-center p-2"> 
                  <span className="text-center">{chat.name}</span>
                  <span className="text-center">@{chat.username}</span>
                </div>
              </div>
              <div className="flex flex-col justify-between p-2">
                <span className="p-1 rounded-full bg-pink-600 w-8 h-8 text-center text-white font-normal">
                  2
                </span>
              </div>
            </div>
          )
        })
        
      }
      </div>
     
  
  
      <section className="m-2 rounded-lg shadow-md drop-shadow-md col-span-3 flex flex-col justify-evenly">
        <div className="flex-1 p-2">
          <ChatBubble
            id={"1"}
            name={"Satanshu Mishra"}
            message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            profilePicture={""}
            hasAttachment={false}
            isYou={true}
          />
          <ChatBubble
            id={"2"}
            name={"Satanshu Mishra"}
            message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            profilePicture={""}
            hasAttachment={true}
            isYou={false}
          />
        </div>
        <div className="p-2">
          <div className="flex flex-row justify-between items-center p-2">
            <input
              type="text"
              className="w-full h-12 rounded-lg shadow-md drop-shadow-md p-2 m-2"
              placeholder="Type a message..."
            />
            <button className="w-12 h-12 rounded-lg shadow-md drop-shadow-md bg-blue-600 text-white m-2">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
