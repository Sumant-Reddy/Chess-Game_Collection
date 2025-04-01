import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAIModel } from '../store/gameSlice';

const AIModelSelector = () => {
  const dispatch = useDispatch();
  const selectedModel = useSelector((state) => state.game.aiModel);
  const [apiKeyStatus, setApiKeyStatus] = useState({
    gemini: false,
    chatgpt: false,
    cohere: false,
    deepseek: false
  });

  useEffect(() => {
    // Check for API keys in both environment variables and localStorage
    const checkApiKeys = () => {
      setApiKeyStatus({
        gemini: !!(import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key')),
        chatgpt: !!(import.meta.env.VITE_CHATGPT_API_KEY || localStorage.getItem('chatgpt_api_key')),
        cohere: !!(import.meta.env.VITE_COHERE_API_KEY || localStorage.getItem('cohere_api_key')),
        deepseek: !!(import.meta.env.VITE_DEEPSEEK_API_KEY || localStorage.getItem('deepseek_api_key'))
      });
    };

    checkApiKeys();
  }, []);

  const handleModelChange = (model) => {
    dispatch(setAIModel(model));
  };

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    localStorage.setItem(`${selectedModel}_api_key`, key);
    setApiKeyStatus(prev => ({
      ...prev,
      [selectedModel]: !!key
    }));
  };

  return (
    <div className="ai-model-selector">
      <h3>Select AI Model</h3>
      <div className="model-buttons">
        <button
          className={`model-button ${selectedModel === 'gemini' ? 'active' : ''}`}
          onClick={() => handleModelChange('gemini')}
        >
          Gemini {apiKeyStatus.gemini && '✓'}
        </button>
        <button
          className={`model-button ${selectedModel === 'chatgpt' ? 'active' : ''}`}
          onClick={() => handleModelChange('chatgpt')}
        >
          ChatGPT {apiKeyStatus.chatgpt && '✓'}
        </button>
        <button
          className={`model-button ${selectedModel === 'cohere' ? 'active' : ''}`}
          onClick={() => handleModelChange('cohere')}
        >
          Cohere {apiKeyStatus.cohere && '✓'}
        </button>
        <button
          className={`model-button ${selectedModel === 'deepseek' ? 'active' : ''}`}
          onClick={() => handleModelChange('deepseek')}
        >
          DeepSeek {apiKeyStatus.deepseek && '✓'}
        </button>
      </div>
      <div className="api-key-input">
        <label htmlFor="apiKey">
          API Key: {apiKeyStatus[selectedModel] ? '✓' : '✗'}
        </label>
        <input
          type="password"
          id="apiKey"
          placeholder={`Enter ${selectedModel} API key`}
          onChange={handleApiKeyChange}
          value={localStorage.getItem(`${selectedModel}_api_key`) || ''}
        />
        <small className="api-key-note">
          You can also set API keys in the .env file for better security
        </small>
      </div>
    </div>
  );
};

export default AIModelSelector; 