import { createContext, useState } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPropmt, setRecentPropmt] = useState("");
  const [prevPropmts, setPrevPropmts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextword) => {
    setTimeout(function () {
      setResultData((prevResult) => prevResult + nextword);
    }, 75 * index);
  };

  const onSent = async (propmt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (propmt !== undefined) {
      response = await run(propmt);
      setRecentPropmt(propmt);
    } else {
      setPrevPropmts((prev) => [...prev, input]);
      setRecentPropmt(input);
      response = await run(input);
    }

    let newResponseArray = response.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextword = newResponseArray[i];
      delayPara(i, nextword + " ");
    }
    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPropmts,
    setPrevPropmts,
    onSent,
    setRecentPropmt,
    recentPropmt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.object,
};
