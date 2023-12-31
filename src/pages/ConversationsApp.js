// import React from "react";
// import { Badge, Icon, Layout, Spin, Typography } from "antd";
// import { Client as ConversationsClient } from "@twilio/conversations";

// import "./assets/Conversation.css";
// import "./assets/ConversationSection.css";
// import { ReactComponent as Logo } from "./assets/twilio-mark-red.svg";

// import Conversation from "./Conversation";
// import LoginPage from "./LoginPage";
// import { ConversationsList } from "./ConversationsList";
// import { HeaderItem } from "./HeaderItem";

// const { Content, Sider, Header } = Layout;
// const { Text } = Typography;

// class ConversationsApp extends React.Component {
//   constructor(props) {
//     super(props);

//     const name = localStorage.getItem("name") || "";
//     const loggedIn = name !== "";

//     this.state = {
//       name,
//       loggedIn,
//       token: null,
//       statusString: null,
//       conversationsReady: false,
//       conversations: [],
//       selectedConversationSid: null,
//       newMessage: ""
//     };
//   }

//   componentDidMount = () => {
//     if (this.state.loggedIn) {
//       this.getToken();
//       this.setState({ statusString: "Fetching credentials…" });
//     }
//   };

//   logIn = (name) => {
//     if (name !== "") {
//       localStorage.setItem("name", name);
//       this.setState({ name, loggedIn: true }, this.getToken);
//     }
//   };

//   logOut = (event) => {
//     if (event) {
//       event.preventDefault();
//     }

//     this.setState({
//       name: "",
//       loggedIn: false,
//       token: "",
//       conversationsReady: false,
//       messages: [],
//       newMessage: "",
//       conversations: []
//     });

//     localStorage.removeItem("name");
//     this.conversationsClient.shutdown();
//   };

//   getToken = () => {
//     // Paste your unique Chat token function
//     const myToken = "<Your token here>";
//     this.setState({ token: myToken }, this.initConversations);
//   };

//   initConversations = async () => {
//     window.conversationsClient = ConversationsClient;
//     this.conversationsClient = new ConversationsClient(this.state.token);
//     this.setState({ statusString: "Connecting to Twilio…" });

//     this.conversationsClient.on("connectionStateChanged", (state) => {
//       if (state === "connecting")
//         this.setState({
//           statusString: "Connecting to Twilio…",
//           status: "default"
//         });
//       if (state === "connected") {
//         this.setState({
//           statusString: "You are connected.",
//           status: "success"
//         });
//       }
//       if (state === "disconnecting")
//         this.setState({
//           statusString: "Disconnecting from Twilio…",
//           conversationsReady: false,
//           status: "default"
//         });
//       if (state === "disconnected")
//         this.setState({
//           statusString: "Disconnected.",
//           conversationsReady: false,
//           status: "warning"
//         });
//       if (state === "denied")
//         this.setState({
//           statusString: "Failed to connect.",
//           conversationsReady: false,
//           status: "error"
//         });
//     });
//     this.conversationsClient.on("conversationJoined", (conversation) => {
//       this.setState({ conversations: [...this.state.conversations, conversation] });
//     });
//     this.conversationsClient.on("conversationLeft", (thisConversation) => {
//       this.setState({
//         conversations: [...this.state.conversations.filter((it) => it !== thisConversation)]
//       });
//     });
//   };

//   render() {
//     const { conversations, selectedConversationSid, status } = this.state;
//     const selectedConversation = conversations.find(
//       (it) => it.sid === selectedConversationSid
//     );

//     let conversationContent;
//     if (selectedConversation) {
//       conversationContent = (
//         <Conversation
//           conversationProxy={selectedConversation}
//           myIdentity={this.state.name}
//         />
//       );
//     } else if (status !== "success") {
//       conversationContent = "Loading your conversation!";
//     } else {
//       conversationContent = "";
//     }

//     if (this.state.loggedIn) {
//       return (
//         <div className="conversations-window-wrapper">
//           <Layout className="conversations-window-container">
//             <Header
//               style={{ display: "flex", alignItems: "center", padding: 0 }}
//             >
//               <div
//                 style={{
//                   maxWidth: "250px",
//                   width: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 }}
//               >
//                 <HeaderItem style={{ paddingRight: "0", display: "flex" }}>
//                   <Logo />
//                 </HeaderItem>
//                 <HeaderItem>
//                   <Text strong style={{ color: "white" }}>
//                     Conversations
//                   </Text>
//                 </HeaderItem>
//               </div>
//               <div style={{ display: "flex", width: "100%" }}>
//                 <HeaderItem>
//                   <Text strong style={{ color: "white" }}>
//                     {selectedConversation &&
//                       (selectedConversation.friendlyName || selectedConversation.sid)}
//                   </Text>
//                 </HeaderItem>
//                 <HeaderItem style={{ float: "right", marginLeft: "auto" }}>
//                   <span
//                     style={{ color: "white" }}
//                   >{` ${this.state.statusString}`}</span>
//                   <Badge
//                     dot={true}
//                     status={this.state.status}
//                     style={{ marginLeft: "1em" }}
//                   />
//                 </HeaderItem>
//                 <HeaderItem>
//                   <Icon
//                     type="poweroff"
//                     onClick={this.logOut}
//                     style={{
//                       color: "white",
//                       fontSize: "20px",
//                       marginLeft: "auto"
//                     }}
//                   />
//                 </HeaderItem>
//               </div>
//             </Header>
//             <Layout>
//               <Sider theme={"light"} width={250}>
//                 <ConversationsList
//                   conversations={conversations}
//                   selectedConversationSid={selectedConversationSid}
//                   onConversationClick={(item) => {
//                     this.setState({ selectedConversationSid: item.sid });
//                   }}
//                 />
//               </Sider>
//               <Content className="conversation-section">
//                 <div id="SelectedConversation">{conversationContent}</div>
//               </Content>
//             </Layout>
//           </Layout>
//         </div>
//       );
//     }

//     return <LoginPage onSubmit={this.logIn} />;
//   }
// }

// export default ConversationsApp;



import React, { useState, useEffect, useCallback } from "react";
import { Badge, Layout, Spin, Typography } from "antd";
import { Client as ConversationsClient } from "@twilio/conversations";
import "../assets/Conversation.css";
import "../assets/ConversationSection.css";
import { ReactComponent as Logo } from "../assets/twilio-mark-red.svg";
import Conversation from "./Conversation";
import LoginPage from "./LoginPage";
import { ConversationsList } from "./ConversationsList";
import { HeaderItem } from "./HeaderItem";
import { PoweroffOutlined } from "@ant-design/icons";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

const ConversationsApp = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [loggedIn, setLoggedIn] = useState(name !== "");
  const [token, setToken] = useState(null);
  const [statusString, setStatusString] = useState(null);
  const [conversationsReady, setConversationsReady] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationSid, setSelectedConversationSid] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversationsClient,setConversationsClient]=useState("")

  // console.log(token)
  useEffect(() => {
    if (loggedIn) {
      getToken();
      setStatusString("Fetching credentials…");
    }
  }, [loggedIn]);

  const logIn = useCallback((newName) => {
    if (newName !== "") {
      localStorage.setItem("name", newName);
      setName(newName);
      setLoggedIn(true);
      getToken();
    }
  }, []);

  const logOut = useCallback((event) => {
    if (event) {
      event.preventDefault();
    }

    setName("");
    setLoggedIn(false);
    setToken("");
    setConversationsReady(false);
    setNewMessage("");
    setConversations([]);
    localStorage.removeItem("name");
    conversationsClient.shutdown();
  }, []);

  const getToken = useCallback(async(identity) => {
    const response = await fetch(`http://localhost:5000/api/twilight/token/${identity}`);
    // console.log(response)
    const responseJson = await response.json();
    const token= responseJson.token;
    const myToken = token;
    // console.log(myToken)
    setToken(myToken);
    initConversations(myToken);
  }, []);

  const initConversations = useCallback(async (mytoken) => {
    window.conversationsClient = ConversationsClient;
    console.log(token)
    const client = new ConversationsClient(mytoken);
    setConversationsClient(client)
    setStatusString("Connecting to Twilio…");

    console.log(client)
    client.on("connectionStateChanged", (state) => {
      if (state === "connecting")
        setStatusString("Connecting to Twilio…");
      if (state === "connected") {
        setStatusString("You are connected.");
      }
      if (state === "disconnecting")
        setStatusString("Disconnecting from Twilio…");
      if (state === "disconnected")
        setStatusString("Disconnected.");
      if (state === "denied")
        setStatusString("Failed to connect.");
    });

    client.on("conversationJoined", (conversation) => {
      setConversations([...conversations, conversation]);
    });

    client.on("conversationLeft", (thisConversation) => {
      setConversations([...conversations.filter((it) => it !== thisConversation)]);
    });
  }, [token, conversations]);

  const selectedConversation = conversations.find(
    (it) => it.sid === selectedConversationSid
  );

  let conversationContent;
  if (selectedConversation) {
    conversationContent = (
      <Conversation
        conversationProxy={selectedConversation}
        myIdentity={name}
      />
    );
  }
  //  else if (status !== "success") {
  //   conversationContent = "Loading your conversation!";
  // }
   else {
    conversationContent = "";
  }

  if (loggedIn) {
    return (
      <div className="conversations-window-wrapper">
        <Layout className="conversations-window-container">
          <Header style={{ display: "flex", alignItems: "center", padding: 0 }}>
            <div
              style={{
                maxWidth: "250px",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HeaderItem style={{ paddingRight: "0", display: "flex" }}>
                <Logo />
              </HeaderItem>
              <HeaderItem>
                <Text strong style={{ color: "white" }}>
                  Conversations
                </Text>
              </HeaderItem>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <HeaderItem>
                <Text strong style={{ color: "white" }}>
                  {selectedConversation &&
                    (selectedConversation.friendlyName ||
                      selectedConversation.sid)}
                </Text>
              </HeaderItem>
              <HeaderItem style={{ float: "right", marginLeft: "auto" }}>
                <span style={{ color: "white" }}>{` ${statusString}`}</span>
                <Badge
                  dot={true}
                  // status={status}
                  style={{ marginLeft: "1em" }}
                />
              </HeaderItem>
              <HeaderItem>
                <PoweroffOutlined
                  onClick={logOut}
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginLeft: "auto",
                  }}
                />
              </HeaderItem>
            </div>
          </Header>
          <Layout>
            <Sider theme={"light"} width={250}>
              <ConversationsList
                conversations={conversations}
                selectedConversationSid={selectedConversationSid}
                onConversationClick={(item) => {
                  setSelectedConversationSid(item.sid);
                }}
              />
            </Sider>
            <Content className="conversation-section">
              <div id="SelectedConversation">{conversationContent}</div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }

  return <LoginPage onSubmit={logIn} />;
};

export default ConversationsApp;

