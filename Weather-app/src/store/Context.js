import { createContext, useState } from "react";

const Context = createContext({
  input: "",
  data: {},
  loading: Boolean,
  citiesList: [],
  cityLoading: Boolean,
  setInput: () => {},
  setData: () => {},
  setLoading: () => {},
  setCitiesList: () => {},
  setCityLoading: () => {},
});

export function AllContext({ children }) {
  const [element, setElement] = useState("NpeUV00HVI");
  const [result, setResult] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  const [cities, setCities] = useState([]);
  const [cityLoadingState, setCityLoading] = useState(false);
  const setInput = (cityName) => {
    setElement(cityName);
  };
  const setData = (data) => {
    setResult(data);
  };
  const setLoading = (value) => {
    setLoadingState(value);
  };
  const setList = (list) => {
    setCities(list);
  };
  const setCitiesLoading = (value) => {
    setCityLoading(value);
  };
  const context = {
    input: element,
    data: result,
    loading: loadingState,
    citiesList: cities,
    cityLoading: cityLoadingState,
    setInput: setInput,
    setData: setData,
    setLoading: setLoading,
    setCitiesList: setList,
    setCityLoading: setCitiesLoading,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default Context;
