import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tab, setTab] = useState<"hide" | "reveal">("hide");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ttlHours, setTtlHours] = useState(24); 

  const API_URL = "http://localhost:8000/api";

  const handleHide = async () => {
    if (!input.trim()) {
      setResult("Please enter a secret.");
      setIsError(true);
      return;
    }
    setLoading(true);
    setIsError(false);
    try {
      const res = await axios.post(`${API_URL}/hide/`, { 
        secret: input,
        ttl_hours: ttlHours 
      });
      setResult(`Your unique key: ${res.data.key}`);
      setInput("");
      setIsError(false);
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        setResult(error.response.data.error);
      } else {
        setResult("Error hiding secret. Please try again.");
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReveal = async () => {
    if (!input.trim()) {
      setResult("Please enter a key.");
      setIsError(true);
      return;
    }
    setLoading(true);
    setIsError(false);
    try {
      const res = await axios.post(`${API_URL}/reveal/`, { key: input });
      setResult(`Hidden message: ${res.data.secret}`);
      setInput("");
      setIsError(false);
    } catch {
      setResult("Invalid or expired key. This secret may have already been revealed.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newTab: "hide" | "reveal") => {
    setTab(newTab);
    setInput("");
    setResult("");
    setCopied(false);
    setIsError(false);
  };

  const copyToClipboard = async () => {
    if (result) {
      const textToCopy = result.replace(/Your unique key: |Hidden message: /g, '');
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const ttlOptions = [
    { value: 1, label: "1 hour" },
    { value: 6, label: "6 hours" },
    { value: 12, label: "12 hours" },
    { value: 24, label: "24 hours" },
    { value: 48, label: "2 days" },
    { value: 168, label: "1 week" },
    { value: 720, label: "30 days" }
  ];

  return (
    <div className="app-container">
      <div className="app-card">
        <header className="app-header">
          <div className="logo-container">
            <div className="logo-icon">
              <div className="lock-shackle"></div>
              <div className="lock-body"></div>
            </div>
            <h1>Secret Vault</h1>
          </div>
          <p className="subtitle">One-time secure secret sharing</p>
        </header>

        <div className="tab-container">
          <div className="segment-control">
            <button
              className={`segment-button ${tab === "hide" ? "active" : ""}`}
              onClick={() => handleTabChange("hide")}
            >
              Hide Secret
            </button>
            <button
              className={`segment-button ${tab === "reveal" ? "active" : ""}`}
              onClick={() => handleTabChange("reveal")}
            >
              Reveal Secret
            </button>
            <div className={`segment-slider ${tab === "hide" ? "left" : "right"}`}></div>
          </div>
        </div>

        {tab === "hide" && (
          <div className="ttl-container">
            <label className="ttl-label">Expires after:</label>
            <select 
              value={ttlHours} 
              onChange={(e) => setTtlHours(Number(e.target.value))}
              className="ttl-select"
            >
              {ttlOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="input-container">
          <textarea
            placeholder={
              tab === "hide" 
                ? "Enter your confidential message here..." 
                : "Paste your unique key here..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="secret-input"
          />
        </div>

        <div className="action-section">
          <button 
            onClick={tab === "hide" ? handleHide : handleReveal}
            disabled={loading || !input.trim()}
            className="primary-button"
          >
            {loading ? (
              <div className="button-loading">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Processing...
              </div>
            ) : tab === "hide" ? "Generate Secure Link" : "Reveal Message"}
          </button>
        </div>

        {result && (
          <div className="result-container">
            {isError ? (
              <div className="error-message">
                {result}
              </div>
            ) : (
              <>
                <div className="result-header">
                  <span className="result-title">
                    {result.includes("Your unique key") ? "Secure Key Generated" : "Secret Revealed"}
                  </span>
                  <button onClick={copyToClipboard} className={`copy-button ${copied ? "copied" : ""}`}>
                    {copied ? (
                      <>
                        <svg className="check-icon" viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="copy-icon" viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="result-content">
                  <div className="result-text">
                    {result.includes("Your unique key") ? (
                      <div className="key-display">
                        <span className="key-label">Your key:</span>
                        <code className="key-value">{result.replace("Your unique key: ", "")}</code>
                      </div>
                    ) : (
                      <div className="secret-display">
                        <span className="secret-label">Secret message:</span>
                        <div className="secret-value">{result.replace("Hidden message: ", "")}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="security-notice">
                  {result.includes("Your unique key") 
                    ? `This key will self-destruct after ${ttlOptions.find(opt => opt.value === ttlHours)?.label.toLowerCase() || '24 hours'}` 
                    : "This secret has been permanently deleted from the server"}
                </div>
              </>
            )}
          </div>
        )}

        <footer className="app-footer">
          <div className="footer-content">
            <span>Miguel Salguero — Assessment 3, Web Programming</span>
            <div className="security-badge">
              <div className="shield-icon"></div>
              End-to-End Secure
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;