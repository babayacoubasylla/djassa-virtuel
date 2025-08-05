// src/pages/Chat.js
import React, { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour, le téléphone est-il toujours disponible ?", sender: "user", time: "10:30" },
    { id: 2, text: "Oui, en excellent état.", sender: "other", time: "10:32" }
  ]);
  const chatBoxRef = useRef(null);

  const envoyer = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
    // Simule une réponse
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Merci pour votre message.",
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') envoyer();
  };

  // Scroll automatique
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <h2>💬 Messagerie</h2>
      <p>Échangez avec les vendeurs sans partager votre numéro.</p>

      <div style={styles.chatBox} ref={chatBoxRef}>
        {messages.map(m => (
          <div key={m.id} style={m.sender === 'user' ? styles.myMsg : styles.theirMsg}>
            <div style={styles.msgText}>{m.text}</div>
            <div style={styles.msgTime}>{m.time}</div>
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Taper un message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
        />
        <button onClick={envoyer} style={styles.sendBtn}>➡️</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  chatBox: { height: '400px', overflowY: 'scroll', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' },
  myMsg: { backgroundColor: '#007A3D', color: 'white', padding: '10px 15px', borderRadius: '18px', margin: '5px 0', maxWidth: '80%', alignSelf: 'flex-end', marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  theirMsg: { backgroundColor: '#f1f1f1', color: '#333', padding: '10px 15px', borderRadius: '18px', margin: '5px 0', maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  msgText: { wordBreak: 'break-word' },
  msgTime: { fontSize: '0.8em', opacity: 0.7, marginTop: '4px' },
  inputBox: { display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' },
  sendBtn: { backgroundColor: '#E76F00', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' }
};