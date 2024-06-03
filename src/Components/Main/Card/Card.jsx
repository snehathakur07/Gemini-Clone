import React, { useContext } from "react";
import "./Card.css";
import { Context } from "../../../Context/Context";

export default function Card(props) {
  const {setRecentPrompt,sendPrompt}=useContext(Context)
  
  const searchCard=async (item)=>{
    setRecentPrompt(item)
    await sendPrompt(item)
  }
  return (
    <div className="card" onClick={()=>searchCard(props.text)}>
      <div className="card-text">
        <p>{props.text}</p>
      </div>
      <div className="icon">
        <img src={props.icon} alt="" />
      </div>
    </div>
  );
}
