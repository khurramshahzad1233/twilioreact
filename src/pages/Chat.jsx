import React, { useState, useEffect } from 'react';
import Conversationchat from './Conversationchat';
import { Client as ConversationsClient } from "@twilio/conversations";

const Chat = () => {
  const [statusString, setStatusString] = useState('');
  const [activeConversation, setActiveConversation] = useState();
  const [name, setName] = useState('');
  const [nameRegistered, setNameRegistered] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [conversationclient, setConversationclient]=useState();
  const [message,setMessage]=useState("");

  const initConversationsClient = async () => {
    // Simulating async fetch for token
    const token = await getToken(name);

    // Simulating ConversationsClient.create
    const conversationsClient = await createConversationsClient(token);

    setStatusString('Connecting to Twilio...');

    conversationsClient.on('connectionStateChanged', (state) => {
      switch (state) {
        case 'connected':
          setStatusString('You are connected.');
          setIsConnected(true);
          break;
        case 'disconnecting':
          setStatusString('Disconnecting from Twilio...');
          break;
        case 'disconnected':
          setStatusString('Disconnected.');
          break;
        case 'denied':
          setStatusString('Failed to connect.');
          break;
        default:
          break;
      }
    });
  };

  const getToken = async (identity) => {
    // Simulating async fetch for token
    const response = await fetch(`http://localhost:5000/api/twilight/token/${identity}`);
    const responseJson = await response.json();
    return responseJson.token;
  };

  const registerName = async () => {
    setNameRegistered(true);
    await initConversationsClient();
  };

  const createConversation = async () => {
    // Simulating async check for existing client sessions
    // try {
    //   await checkClientSession('User1');
    //   await checkClientSession('User2');
    // } catch (error) {
    //   console.error('Waiting for User1 and User2 client sessions');
    //   return;
    // }
    // console.log("khurram")

    try {
      // Simulating conversation creation
      // const newConversation = await conversationclient.createConversation({ uniqueName: 'chat' });
      const newConversation = await conversationclient.createConversation();
      await newConversation.join();
      await newConversation.add("khalid");

      
      await newConversation.sendMessage("hellow worldm, my name is khurram shahzad");
      
      setActiveConversation(newConversation)

      

      let participantsall=await newConversation.getParticipants();

      const conversationPaginator=await conversationclient.getSubscribedConversations();;

      // console.log(conversationPaginator)
      const conversationslist=conversationPaginator.items;
      console.log(conversationslist)

      let messagesPaginator = await newConversation.getMessages(30, 0, "backwards");

// get messages
console.log(messagesPaginator)
const messages = messagesPaginator.items;
console.log(messages)


      newConversation.on("participantJoined",(Participant)=>{
        console.log("user1 has joined the event")
      })
    
      // const message=joinedConversation.sendMessage("hellow world");
      // console.log(message)
      // setActiveConversation(joinedConversation);
      
    } catch {
      // Simulating conversation join if already exists
      setActiveConversation(await getConversationByUniqueName('chat'));
      console.log("khrran")
    }
  };

  const checkClientSession = async (user) => {
    try {
      conversationclient.getUser("User1")
      conversationclient.getUser("User2")
      
    } catch (error) {
      console.log("waiting for both user client session")
    }
  };

  const createConversationsClient = async (token) => {
    window.conversationsClient=ConversationsClient;
    const client=new ConversationsClient(token);
    setConversationclient(client)
    return client;
  };



  const getConversationByUniqueName = async (uniqueName) => {
    // Simulating getConversationByUniqueName
    return { /* Conversation object */ };
  };

console.log(activeConversation)
  const sendmessage=async()=>{
    try {
      const sendMessageDetail = await activeConversation.sendMessage("Hello world");
      console.log(sendMessageDetail);
    } catch (error) {
      console.error("Error sending message:", error);
    }

  
  }

  const getallmessages=async()=>{
    let messagesPaginator = await activeConversation.getMessages(30, 0, "backwards");

// get messages
console.log(messagesPaginator)
const messages = messagesPaginator.items;
console.log(messages)


  }

  return (
    <div id="chat">
      <h1>
        Welcome to the React chat app
        {nameRegistered && `, ${name}`}!
      </h1>
      <p>{statusString}</p>
      {!nameRegistered && (
        <div>
          <input
            onKeyUp={(e) => e.key === 'Enter' && registerName()}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={registerName}>Register name</button>
        </div>
      )}
      {nameRegistered && !activeConversation && isConnected && (
        <div>
          <button onClick={createConversation}>Join chat</button>
        </div>
      )}
      {/* {activeConversation && (<Conversationchat activeConversation={activeConversation} name={name} />
      )} */}

      <div>
        <input type="text"
        placeholder='sendmessage'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}

        />
        <button onClick={sendmessage}>send</button>
      </div>


      <div onClick={getallmessages}>get all messages</div>
    </div>

    
  );
};

export default Chat;
