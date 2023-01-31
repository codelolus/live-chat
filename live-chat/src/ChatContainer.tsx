import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiSend } from 'react-icons/bi'
import * as io from "socket.io-client";

export const socket = io.connect("http://localhost:3000");

interface Message {
    nick: string;
    message: string;
    id: string;
}

export default function ChatContainer() {
    const { nick } = useParams<{ nick: string }>();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on("connect", () => {
            socket.emit("join", nick);
        });

        socket.on("message", (message: Message) => {
            console.log("receivedMessage");
            setMessages((messages) => [...messages, message]);

            setMessages((messages) => [
                ...messages.filter((m) => m.id != message.id),
                message,
            ]);
        });
    }, [socket]);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = e.currentTarget.message.value;
        socket.emit("message", { nick, message });
        e.currentTarget.message.value = "";
    };

    return (
        <div>
            {messages?.map((message: any) => {
                return (
                    <div className="flex text-black gap-[0.5rem]" key={message.id}>
                        <p className={`${message.nick == "System:" ? "text-red-500" : "text-sky-500"}`}>
                            <b>{message.nick}</b>
                        </p>
                        <p>{message.message}</p>
                    </div>
                );
            })}
            <div className="flex fixed bottom-0 left-[50%] translate-x-[-50%]">
                <form className="flex justify-center items-center" onSubmit={sendMessage}>
                    <input className="w-[30rem]" type="text" placeholder="Your message.." name="message"></input>
                    <button className="flex" type="submit"><BiSend size={32} fill={"Grey"} /></button>
                </form>
            </div>
        </div>
    );
}