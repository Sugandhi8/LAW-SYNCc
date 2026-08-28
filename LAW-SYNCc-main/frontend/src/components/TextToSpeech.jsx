import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function TextToSpeech({ text, label = "Listen", className = "" }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleSpeak = (e) => {
    e.stopPropagation();
    if (!isSupported) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`speech-btn ${isSpeaking ? 'speaking' : ''} ${className}`}
      title={isSpeaking ? "Stop listening" : "Listen to audio pronunciation"}
      aria-label="Text to speech"
    >
      {isSpeaking ? (
        <>
          <VolumeX size={16} />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 size={16} />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
