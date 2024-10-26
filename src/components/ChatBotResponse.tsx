import React, { useState } from 'react';
import Modal from './Modal';

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const ChatbotModal: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      // Agregar la pregunta del usuario al historial de mensajes
      setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
      
      // Realizar la solicitud al backend
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();

      // Agregar la respuesta del bot al historial de mensajes
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: data.response }]);
      
      // Limpiar el campo de entrada
      setInput('');
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} style={{
        position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#007bff', color: 'white',
        borderRadius: '50%', width: '60px', height: '60px', fontSize: '24px', textAlign: 'center',
      }}>
        💬
      </button>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Asistente AI</h2>
          <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            {/* Renderizar la conversación */}
            {messages.map((message, index) => (
              <div key={index} style={{ textAlign: message.type === 'user' ? 'right' : 'left' }}>
                <p style={{
                  backgroundColor: message.type === 'user' ? '#007bff' : '#f1f1f1',
                  color: message.type === 'user' ? 'white' : 'black',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  display: 'inline-block',
                  maxWidth: '80%',
                  margin: '5px 0',
                }}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              style={{ padding: '10px', width: '94%' }}
              required
            />
            <button type="submit" style={{
              marginTop: '10px', padding: '10px', width: '100%', backgroundColor: '#007bff',
              color: 'white', border: 'none', borderRadius: '4px',
            }}>
              Enviar
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ChatbotModal;
