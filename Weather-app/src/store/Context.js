import { createContext, useState } from "react";

const Context = createContext({
  input: "",
  data: {},
  loading: Boolean,
  setInput: () => {},
  setData: () => {},
  setLoading: () => {},
});

export function AllContext({ children }) {
  const [element, setElement] = useState("Lucknow");
  const [result, setResult] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  const setInput = (cityName) => {
    setElement(cityName);
  };
  const setData = (data) => {
    setResult(data);
  };
  const setLoading = (value) => {
    setLoadingState(value);
  };
  const context = {
    input: element,
    data: result,
    loading: loadingState,
    setInput: setInput,
    setData: setData,
    setLoading: setLoading,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default Context;
