import { useState, useEffect } from 'react';
import { Mic, MicOff, X, AlertCircle } from 'lucide-react';

export default function VoiceSearchModal({ isOpen, onClose, onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setErrorMsg('');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg("Voice search is not supported in your browser. Please type your search query instead.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setErrorMsg('');
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setErrorMsg(`Voice recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch {
      // Ignored
    }

    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignored
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (transcript.trim()) {
      onResult(transcript.trim());
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className="modal-close-btn" style={{ color: '#0f172a', background: '#f1f5f9' }} onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: isListening ? '#fee2e2' : '#f1f5f9',
              color: isListening ? '#dc2626' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              animation: isListening ? 'pulseGold 1.5s infinite' : 'none'
            }}
          >
            {isListening ? <Mic size={36} /> : <MicOff size={36} />}
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            {isListening ? 'Listening...' : 'Voice Search'}
          </h3>

          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            {isListening ? 'Say a legal term (e.g. "Bail", "Habeas Corpus", "Indemnity")' : 'Tap to search'}
          </p>

          {transcript && (
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '1.5rem'
              }}
            >
              "{transcript}"
            </div>
          )}

          {errorMsg && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                color: '#991b1b',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            {transcript && (
              <button className="btn-gold" onClick={handleConfirm}>
                Search Term
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
