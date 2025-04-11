import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";
import Markdown from "react-markdown";

export default function Main() {
  const {
    onSent,
    recentPropmt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How Can i help you today</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>sugggest a buitifull location for vacation</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Breiefyly summerize the concept of urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm activities for a work retreite</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>improve readerbility of this code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPropmt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                // <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                <div>
                  <Markdown>{resultData}</Markdown>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a propmt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini can make mistakes, so double-check it
          </p>
        </div>
      </div>
    </div>
  );
}
