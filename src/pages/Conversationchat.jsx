import React, { useState, useEffect } from 'react';

const Conversationchat = ({ activeConversation, name }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      // Simulating fetch messages
      const newMessages = await activeConversation.getMessages();
      setMessages([...messages, ...newMessages.items]);
    };

    const onMessageAdded = (message) => {
      setMessages([...messages, message]);
    };

    fetchMessages();

    // Simulating adding event listener
    activeConversation.on('messageAdded', onMessageAdded);

    return () => {
      // Simulating cleanup
      activeConversation.off('messageAdded', onMessageAdded);
    };
  }, [activeConversation, messages]);

  const sendMessage = async () => {
    await activeConversation.sendMessage(messageText);
    setMessageText('');
  };

  return (
    <div id="conversation">
      <div className="conversation-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`bubble-container ${message.state.author === name ? 'myMessage' : ''}`}
          >
            <div className="bubble">
              <div className="name">{`${message.state.author}:`}</div>
              <div className="message">{message.state.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  );
};

export default Conversationchat;
