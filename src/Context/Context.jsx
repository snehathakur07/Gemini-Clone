import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [extended, setExtended] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResponse((prev) => prev + nextWord);
    }, 75 * index);
  };

  const sendPrompt = async (prompt) => {
    setPrompt("");
    setLoading(true);
    setRecentPrompt(prompt);
    setShowResult(true);

    if (!prevPrompts.includes(prompt)) {
      setPrevPrompts((prev) => [...prev, prompt]);
    }
    console.log(prevPrompts);

    const rawResponse = await run(prompt);
    let responseArray = rawResponse.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    newResponse = newResponse.split("*").join("<br/><br/>");
    let newResponseArray = newResponse.split(" ");

    setResponse("");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
  };

  return (
    <Context.Provider
      value={{
        sendPrompt,
        extended,
        setExtended,
        prompt,
        setPrompt,
        setShowResult,
        setResponse,
        showResult,
        loading,
        response,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;
