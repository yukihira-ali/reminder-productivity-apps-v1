import { useState } from "react";

export default function Chatbot() {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Replace with your OpenAI API key

        const messagesToSend = [
            ...allMessages,
            {
                role: 'user',
                content: message
            }
        ];

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: messagesToSend
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API error:', errorData);
                return; // Exit if there is an error
            }

            const data = await response.json();
            console.log(data); // Log the API response for debugging

            let newAllMessages = [
                ...messagesToSend,
                data.choices[0].message
            ];
            setAllMessages(newAllMessages);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <div className="chatbot-modal">
            <div className="chatbot-header">
                <h4>AI Chatbot</h4>
            </div>
            <div className="chatbot-body">
                <div className="messages">
                    {allMessages.map((msg, index) => (
                        <p key={index}><strong>{msg.role}:</strong> {msg.content}</p>
                    ))}
                </div>

                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        placeholder="Ask chatbot something..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="chat-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
}
