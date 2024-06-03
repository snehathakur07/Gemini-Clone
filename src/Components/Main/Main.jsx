import React, { useContext } from "react";
import Card from "./Card/Card";
import { assets } from "../../assets/assets";
// import "./main.css";
import Prompt from "./Prompt/Prompt";
import { Context } from "../../Context/Context";

export default function Main() {
  const { response,showResult, recentPrompt,loading } = useContext(Context);
  // console.log(response)
  const { compass_icon, bulb_icon, message_icon, code_icon, user_icon,gemini_icon } =
    assets;
    
  return (
    <div className="main">
      <div className="top-bar">
        <div className="gemi-btn">
          <p>Gemini</p>
        </div>
        <div className="dp">
          <img src={user_icon} alt="user" />
        </div>
      </div>
      <div className="middle">
        {!showResult ? (
          <div className="inner">
            <div className="heading">
              <h1>
                <span>Hello, Sneha </span>
                <br /> How can I help you today?{" "}
              </h1>
            </div>
            <div className="cards">
              <Card 
                text="Suggest beautiful places to see on an upcoming road trip" 
                icon={compass_icon}
              />
              <Card
                text="Briefly summarize this concept: urban planning"
                icon={bulb_icon}
              />
              <Card
                text="Brainstorm team bonding activities for our work retreat"
                icon={message_icon}
              />
              <Card
                text="Tell me about React js and React native"
                icon={code_icon}
              />
            </div>
          </div>
        ) : (
          
          <div className="response-section">
            <div className="recent-prompt">
              <div className="icon"><img src={user_icon} alt="user"/></div>
              <div className="question">{recentPrompt}</div>
            </div>
            
            <div className="response">
            <div className={loading ? "spin" : ""}><img src={gemini_icon} alt="gemini"/></div>
              {loading?
              <div className="loading">
                <hr/>
                <hr/>
                <hr/>
              </div>
              :
              <div className="result"><p dangerouslySetInnerHTML={{__html:response}}></p></div>
                }
            </div>
          </div>
        )}
      </div>
      <Prompt />
    </div>
  );
}
