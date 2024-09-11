import { useState } from 'react';
import styles from '../styles/Chatbot.module.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      // Simple bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `You said: ${input}`, user: false }]);
      }, 500);
      setInput('');
    }
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.user ? styles.user : styles.bot}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Send</button>
      </form>
    </div>
  );
}