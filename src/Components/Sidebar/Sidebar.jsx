import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../Context/Context";
export default function Sidebar() {
  const {
    extended,
    setExtended,
    prevPrompts,
    sendPrompt,
    setRecentPrompt,
    setShowResult,
    setResponse,
  } = useContext(Context);

  const {
    menu_icon,
    plus_icon,
    history_icon,
    message_icon,
    setting_icon,
    question_icon,
  } = assets;

  const handleExtend = () => {
    setExtended(!extended);
    console.log(extended);
  };

  const showPrompt = async (item) => {
    setRecentPrompt(item);
    await sendPrompt(item);
  };
  const newChat = () => {
    setRecentPrompt("");
    setShowResult(false);
    setResponse("");
  };
  return (
    <div className="sidebar" style={{ width: extended == true ? "390px" : "" }}>
      <div className="top">
        <div className="expand-menu" onClick={handleExtend}>
          <img src={menu_icon} alt="menu" />
        </div>
        <div className="plus item" onClick={() => newChat()}>
          <div className="icon" >
            <img src={plus_icon} />
          </div>
          {extended == true ? "New Chat" : ""}
        </div>

        {extended == true ? (
          <div className="recent-searches">
            <h2>Recent</h2>
            <div className="items">
              {prevPrompts.map((item) => {
                return (
                  <div onClick={() => showPrompt(item)} className="item">
                    <div className="msg-icon icon">
                      <img src={message_icon} />
                    </div>
                    <p>
                      {(item.charAt(0).toUpperCase() + item.slice(1)).slice(
                        0,
                        16
                      )}{" "}
                      ...
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bottom">
        <div className="bottom-btn item">
          <div className="icon">
            <img src={question_icon} />
          </div>
          {extended == true ? <p>Help</p> : ""}
        </div>
        <div className="bottom-btn item">
          <div className="icon">
            <img src={history_icon} />
          </div>
          {extended == true ? <p>Activity</p> : ""}
        </div>
        <div className="bottom-btn item">
          <div className="icon">
            <img src={setting_icon} />
          </div>
          {extended == true ? <p>Settings</p> : ""}
        </div>
      </div>
    </div>
  );
}
