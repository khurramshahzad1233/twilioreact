import React, { useState, useEffect } from 'react';
import Conversationchat from './Conversationchat';
import { Client as ConversationsClient } from "@twilio/conversations";

const Allchat = () => {
  const [statusString, setStatusString] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);
  const [name, setName] = useState('');
  const [nameRegistered, setNameRegistered] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [conversationclient, setConversationclient]=useState()

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
    conversationsClient.on("conversationJoined",(conversation)=>{
      console.log(conversation)
    });

    conversationsClient.on("messageAdded",(message)=>{
      console.log(message)
    })
    
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
    

    try {
      
    //   const newConversation = await conversationclient.createConversation();
    //   await newConversation.join();
    //   await newConversation.add("khurram");

    //   await newConversation.sendMessage("hellow world");

      

    //   let participantsall=await newConversation.getParticipants();

      const conversationPaginator=await conversationclient.getSubscribedConversations();;

      console.log(conversationPaginator)
      const conversationslist=conversationPaginator.items;
      console.log(conversationslist);



      const selectedconversation=await conversationclient.getConversationBySid("CH1fbe045999574966aa7817816693852d")
      let messagesPaginator = await selectedconversation.getMessages(15,0,"forward");
      const messages = messagesPaginator.items;
      console.log(messages)


      
      
      
    } catch {
      // Simulating conversation join if already exists
      setActiveConversation(await getConversationByUniqueName('chat'));
      console.log("khrran")
    }
  };

//   const checkClientSession = async (user) => {
//     try {
//       conversationclient.getUser("User1")
//       conversationclient.getUser("User2")
      
//     } catch (error) {
//       console.log("waiting for both user client session")
//     }
//   };

console.log(conversationclient)
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
    </div>
  );
};

export default Allchat;
