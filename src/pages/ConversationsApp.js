// import React, { useState, useEffect, useCallback } from "react";
// import { Badge, Layout, Spin, Typography } from "antd";
// import { Client as ConversationsClient } from "@twilio/conversations";
// import "../assets/Conversation.css";
// import "../assets/ConversationSection.css";
// import { ReactComponent as Logo } from "../assets/twilio-mark-red.svg";
// import Conversations from "./Conversations";
// import LoginPage from "./LoginPage";
// import { ConversationsList } from "./ConversationsList";
// import { HeaderItem } from "./HeaderItem";
// import { PoweroffOutlined } from "@ant-design/icons";

// const { Content, Sider, Header } = Layout;
// const { Text } = Typography;

// const ConversationsApp = () => {
//   const [name, setName] = useState(localStorage.getItem("name") || "");
//   const [loggedIn, setLoggedIn] = useState(name !== "");
//   const [token, setToken] = useState(null);
//   const [statusString, setStatusString] = useState(null);
//   const [conversationsReady, setConversationsReady] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversationSid, setSelectedConversationSid] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [conversationsClient,setConversationsClient]=useState("")

//   // console.log(token)
//   useEffect(() => {
//     if (loggedIn) {
//       getToken();
//       setStatusString("Fetching credentials…");
//     }
//   }, [loggedIn]);

//   const logIn = useCallback((newName) => {
//     if (newName !== "") {
//       localStorage.setItem("name", newName);
//       setName(newName);
//       setLoggedIn(true);
//       getToken();
//     }
//   }, []);

//   const logOut = useCallback((event) => {
//     if (event) {
//       event.preventDefault();
//     }

//     setName("");
//     setLoggedIn(false);
//     setToken("");
//     setConversationsReady(false);
//     setNewMessage("");
//     setConversations([]);
//     localStorage.removeItem("name");
//     conversationsClient.shutdown();
//   }, []);

//   const getToken = useCallback(async(identity) => {
//     const response = await fetch(`http://localhost:5000/api/twilight/token/${identity}`);
//     // console.log(response)
//     const responseJson = await response.json();
//     const token= responseJson.token;
//     const myToken = token;
//     // console.log(myToken)
//     setToken(myToken);
//     initConversations(myToken);
//   }, []);

//   const initConversations = useCallback(async (mytoken) => {
//     window.conversationsClient = ConversationsClient;
//     console.log(token)
//     const client = new ConversationsClient(mytoken);
//     setConversationsClient(client)
//     setStatusString("Connecting to Twilio…");

//     console.log(client)
//     client.on("connectionStateChanged", (state) => {
//       if (state === "connecting")
//         setStatusString("Connecting to Twilio…");
//       if (state === "connected") {
//         setStatusString("You are connected.");
//       }
//       if (state === "disconnecting")
//         setStatusString("Disconnecting from Twilio…");
//       if (state === "disconnected")
//         setStatusString("Disconnected.");
//       if (state === "denied")
//         setStatusString("Failed to connect.");
//     });

  
//     const newConversation=await client.createConversation({uniqueName:"chat"});
//     const joinedConversation=await newConversation.join().catch(err=>console.log(err))
//     await joinedConversation.add("user1").catch(err=>console.log("error",err))
//     await joinedConversation.add("user2").catch(err=>console.log("error",err))

    
//     // client.on("conversationJoined", (conversation) => {
//       setConversations([...conversations, newConversation]);
//     // });

//     // client.on("conversationLeft", (thisConversation) => {
//     //   setConversations([...conversations.filter((it) => it !== thisConversation)]);
//     // });
//   }, [token, conversations]);

//   const selectedConversation = conversations.find(
//     (it) => it.sid === selectedConversationSid
//   );

//   let conversationContent;
//   if (selectedConversation) {
//     conversationContent = (
//       <Conversation
//         conversationProxy={selectedConversation}
//         myIdentity={name}
//       />
//     );
//   }
//   //  else if (status !== "success") {
//   //   conversationContent = "Loading your conversation!";
//   // }
//    else {
//     conversationContent = "";
//   }

//   if (loggedIn) {
//     return (
//       <div className="conversations-window-wrapper">
//         <Layout className="conversations-window-container">
//           <Header style={{ display: "flex", alignItems: "center", padding: 0 }}>
//             <div
//               style={{
//                 maxWidth: "250px",
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <HeaderItem style={{ paddingRight: "0", display: "flex" }}>
//                 <Logo />
//               </HeaderItem>
//               <HeaderItem>
//                 <Text strong style={{ color: "white" }}>
//                   Conversations
//                 </Text>
//               </HeaderItem>
//             </div>
//             <div style={{ display: "flex", width: "100%" }}>
//               <HeaderItem>
//                 <Text strong style={{ color: "white" }}>
//                   {selectedConversation &&
//                     (selectedConversation.friendlyName ||
//                       selectedConversation.sid)}
//                 </Text>
//               </HeaderItem>
//               <HeaderItem style={{ float: "right", marginLeft: "auto" }}>
//                 <span style={{ color: "white" }}>{` ${statusString}`}</span>
//                 <Badge
//                   dot={true}
//                   // status={status}
//                   style={{ marginLeft: "1em" }}
//                 />
//               </HeaderItem>
//               <HeaderItem>
//                 <PoweroffOutlined
//                   onClick={logOut}
//                   style={{
//                     color: "white",
//                     fontSize: "20px",
//                     marginLeft: "auto",
//                   }}
//                 />
//               </HeaderItem>
//             </div>
//           </Header>
//           <Layout>
//             <Sider theme={"light"} width={250}>
//               <ConversationsList
//                 conversations={conversations}
//                 selectedConversationSid={selectedConversationSid}
//                 onConversationClick={(item) => {
//                   setSelectedConversationSid(item.sid);
//                 }}
//               />
//             </Sider>
//             <Content className="conversation-section">
//               <div id="SelectedConversation">{conversationContent}</div>
//             </Content>
//           </Layout>
//         </Layout>
//       </div>
//     );
//   }

//   return <LoginPage onSubmit={logIn} />;
// };

// export default ConversationsApp;

