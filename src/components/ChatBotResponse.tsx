import React, { useState } from 'react';
import Modal from './Modal'; // Reutilizamos el componente Modal
import { getAIResponse } from '../pages/Api/conexiongpt'; // Importamos la función para obtener la respuesta de OpenAI

const ChatbotModal: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const aiResponse = await getAIResponse(input);
      setResponse(aiResponse);
    }
  };

  return (
    <div>
      {/* Botón flotante para abrir el modal del chatbot */}
      <button
        onClick={() => setModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        💬
      </button>

      {/* Modal del chatbot */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Chatbot AI</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hazme una pregunta..."
              style={{ padding: '10px', width: '94%' }}
              required
            />
            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '10px',
                width: '100%',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Enviar
            </button>
          </form>
          {response && (
            <div style={{ marginTop: '20px' }}>
              <strong>Respuesta:</strong>
              <p>{response}</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ChatbotModal;
