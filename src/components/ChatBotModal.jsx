import { useState } from 'react';
import axios from 'axios';

function ChatBotModal() {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual Gemini API key
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText';

    const sendMessage = async () => {
        if (!input) return;

        const userMessage = { sender: 'user', text: input };
        setConversation((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post(
                GEMINI_API_URL,
                {
                    prompt: { text: input }
                },
                { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } }
            );

            const botMessageText = response.data?.candidates?.[0]?.output || 'No response';
            const botMessage = { sender: 'bot', text: botMessageText };
            setConversation((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
            setConversation((prev) => [...prev, errorMessage]);
        }
        setInput('');
    };

    return (
        <div>
            <div>
                {conversation.map((msg, index) => (
                    <p key={index} className={msg.sender}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatBotModal;
