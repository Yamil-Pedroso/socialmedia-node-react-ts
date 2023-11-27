import { useState, useEffect } from "react";
import socket from "../../services/IoSocket";
import FlexBetween from "../FlexBetween";
import Form from "./Form";

import { Container, MessagesContainer, Message, ChatHeader } from "./styles";

const MyChat = () => {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    socket.on("chat-message", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => prevMessages + message + "\n");
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  return (
    <FlexBetween
        flexDirection="column"
        padding="3rem"
    >
      <Container>
        <MessagesContainer>
          <ChatHeader>
            
          <h2>Chat</h2>
          </ChatHeader>

          <Message>
            <ul>
              {messages &&
                messages.split("\n").map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
            </ul>
          </Message>

          <Form />
        </MessagesContainer>
      </Container>
    </FlexBetween>
  );
};

export default MyChat;
