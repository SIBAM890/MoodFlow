/**
 * ChatAssistant Component
 * "Mood Flow" themed AI companion interface
 */
import { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { PetalSpirit } from '../common/KawaiiCharacters';
import { chatAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function ChatAssistant() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi Spandan! ✨ I'm AutoFlow. How are you feeling right now?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showSos, setShowSos] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        const userText = inputText.trim();
        if (!userText) return;

        // 1. SOS Interceptor Check
        const sosPattern = /kill\s*myself|suicide|end\s*my\s*life|die|murder|hurt\s*myself/i;
        if (sosPattern.test(userText)) {
            setShowSos(true);
            // Optionally, we could block the AI from responding totally, but let's let the AI generate an empathetic response while the giant red overlay covers the screen.
        }

        // 2. Add User Message to UI
        const userMsg = {
            id: Date.now(),
            text: userText,
            sender: 'user',
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // 2. Real API Call to your Flask/Ollama backend
        try {
            const data = await chatAPI.sendMessage(userText); 
            
            const aiMsg = {
                id: Date.now() + 1,
                text: data.text, // Ensure your API returns { text: "..." }
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat Error:", error);
            
            const errorMsg = {
                id: Date.now() + 1,
                text: "I'm having a little trouble connecting to my brain. Please ensure the FastAPI backend is running and your Gemini API key is valid!",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-container slide-up" style={{
            height: 'calc(100vh - 300px)', 
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            margin: '0 auto',
            width: '100%',
            position: 'relative' // Needed for SOS Overlay
        }}>

            {/* SOS Overlay Triggered on Critical Keywords */}
            {showSos && (
                <div className="fade-in" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(239, 68, 68, 0.95)', zIndex: 1000,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: 'white', padding: '30px', textAlign: 'center',
                    backdropFilter: 'blur(5px)'
                }}>
                    <AlertTriangle size={64} color="white" style={{ marginBottom: '15px' }} />
                    <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>Emergency Protocol</h1>
                    <h2 style={{ margin: '0 0 30px 0', fontWeight: '400' }}>You are not alone. Immediate support is available.</h2>
                    
                    <div style={{ background: 'white', color: '#b91c1c', padding: '25px', borderRadius: '16px', width: '100%', maxWidth: '450px', marginBottom: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#7f1d1d' }}>National Crisis Helpline</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0' }}>Tele MANAS: 14416</p>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#991b1b' }}>Toll-Free | Available 24/7</p>
                    </div>

                    {/* Conditional render: If user is logged in, show their assumed university counselor hook */}
                    {user && (
                        <div style={{ background: '#fef2f2', color: '#991b1b', padding: '20px', borderRadius: '16px', width: '100%', maxWidth: '450px', border: '1px solid #fca5a5' }}>
                            <h4 style={{ margin: '0 0 5px 0', color: '#7f1d1d' }}>Campus Counselor On-Call</h4>
                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0' }}>Dr. Smith: +91 98765-43210</p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem' }}>An anonymous intervention ping has been logged.</p>
                        </div>
                    )}

                    <button 
                        onClick={() => setShowSos(false)} 
                        style={{ marginTop: '30px', background: 'transparent', border: '2px solid rgba(255,255,255,0.5)', color: 'white', padding: '12px 30px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s' }}
                        onMouseOver={(e) => { e.target.style.background = 'white'; e.target.style.color = '#ef4444'; }}
                        onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'white'; }}
                    >
                        I understand, close alert
                    </button>
                </div>
            )}

            {/* Header Area */}
            <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid var(--border-soft)', background: 'white' }}>
                <div style={{ margin: '0 auto 8px auto', width: '50px', height: '50px' }}>
                    <PetalSpirit size={50} />
                </div>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Mood Flow Chat</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI Wellness Companion</p>
            </div>

            {/* Messages Area */}
            <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
                        {msg.sender === 'ai' && (
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'white', border: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PetalSpirit size={20} />
                            </div>
                        )}
                        <div style={{
                            maxWidth: '80%',
                            padding: '10px 14px',
                            borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                            background: msg.sender === 'user' ? '#4F46E5' : 'white',
                            color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                            boxShadow: 'var(--shadow-sm)',
                            fontSize: '0.9rem'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="typing-dot">Thinking...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{ padding: '15px', background: 'white', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Message AutoFlow..."
                    style={{ flex: 1, padding: '10px 15px', borderRadius: '20px', border: '1px solid var(--border-medium)', outline: 'none' }}
                />
                <button type="submit" disabled={!inputText.trim() || isTyping} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4F46E5', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}

export default ChatAssistant;