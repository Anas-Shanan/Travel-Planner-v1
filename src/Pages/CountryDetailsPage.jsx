import React, { useEffect, useState } from "react";
import CountryDetails from "../components/CountryDetails";
import { useParams } from "react-router-dom";
import { useFavorites } from "../Context/FavoritesContext";
///////////
import {
  fetchChatResponse,
  fetchChatBotResponse,
} from "../components/services/AiApi";

export default function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { name } = useParams();
  const { favorites, dispatch } = useFavorites();

  ////////  AI state
  const [travelSuggestions, setTravelSuggestions] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  ////////

  useEffect(() => {
    async function fetchCountry() {
      setIsLoading(true);
      try {
        const countriesData = localStorage.getItem("countries");
        if (!countriesData) throw new Error("No countries data found");
        const countriesArray = JSON.parse(countriesData);
        const foundCountry = countriesArray.find(
          (c) => c.name?.common?.toLowerCase() === name.toLowerCase()
        );
        if (!foundCountry) throw new Error("Country not found");
        setCountry(foundCountry);

        // welcome message for the country
        setChatMessages([
          {
            sender: "ai",
            text: `Hello! I'm your travel assistant for ${foundCountry.name.common}. Ask me anything about traveling to ${foundCountry.name.common} - from attractions and food to culture and practical tips!`,
          },
        ]);
      } catch (error) {
        setError(error.message);
        setCountry(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountry();
  }, [name]);
  /////////////////////// Ai Fetches

  const handleFetchTravelSuggestions = async () => {
    try {
      setIsAiLoading(true);
      setError(null);
      const result = await fetchChatResponse(name);
      setTravelSuggestions(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSendMessages = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;
    const currentInput = userInput;
    setChatMessages([...chatMessages, { sender: "user", text: currentInput }]);
    setUserInput("");
    try {
      setIsChatLoading(true);
      setError(null);
      const res = await fetchChatBotResponse(
        currentInput,
        country?.name?.common,
        chatMessages
      );
      setChatMessages((prev) => [...prev, { sender: "ai", text: res }]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsChatLoading(false);
    }
  };

  //////////////

  if (isLoading) {
    return (
      <div className="empty-state">
        <div className="loading-spinner"></div>
        <div className="empty-state-title">Loading country details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <div className="empty-state-title">Error</div>
        <div className="empty-state-text">{error}</div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🌍</div>
        <div className="empty-state-title">Country not found</div>
        <div className="empty-state-text">
          The country you're looking for doesn't exist.
        </div>
      </div>
    );
  }

  return (
    <div className="country-page-layout">
      {/* Left Column - Country Details */}
      <div className="country-details-section">
        <CountryDetails
          country={country}
          favorites={favorites}
          dispatch={dispatch}
          /////////
          travelSuggestions={travelSuggestions}
          onFetchTravelSuggestions={handleFetchTravelSuggestions}
          isAiLoading={isAiLoading}
        />
      </div>

      {/* Right Column - Travel Chatbot */}
      <div className="chatbot-section">
        <div className="chatbot-container">
          <div className="chatbot-header">
            Travel Assistant for {country.name.common}
          </div>

          <div className="chatbot-messages">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isChatLoading && (
              <div className="chatbot-message bot">
                <span className="loading-spinner"></span> Typing...
              </div>
            )}
            {error && (
              <div className="chatbot-message bot error">
                <span className="error-message">{error}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessages} className="chatbot-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about travel tips, attractions..."
              disabled={isChatLoading}
            />
            <button type="submit" disabled={isChatLoading}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
