import React, { useContext } from "react";
import { assets } from "../../../assets/assets";
import "./Prompt.css";
import { Context } from "../../../Context/Context";
export default function Prompt() {
  const { prompt, setPrompt, sendPrompt } = useContext(Context);
  const handleChange = (event) => {
    // console.log("before "+prompt)
    setPrompt(event.target.value);
    // console.log("after "+prompt)
  };
  const { gallery_icon, mic_icon, send_icon } = assets;
  return (
    <div className="prompt">
      <div className="bar">
        <input
          type="text"
          placeholder="Enter a prompt here"
          value={prompt}
          onChange={handleChange}
        />
        <div className="btns">
          <div className="btn">
            <img src={gallery_icon} alt="gallery"/>
          </div>
          <div className="btn">
            <img src={mic_icon} alt="mic"/>
          </div>
          {prompt === "" ? null : (
            <div className="btn" onClick={() => sendPrompt(prompt)}>
              <img src={send_icon} alt="send"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
