import { useContext, createContext, useState } from "react";

const ResultsContext = createContext();
const baseURL = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [ results, setResults ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("Elon Musk");

  // /search /images /videos /news
  const getResults = async type => {
    setIsLoading(true);
    const response = await fetch(`${baseURL}${type}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    });
    const data = await response.json();

    if (type.includes("/news")) {
      setResults(data.entries);
    } else if (type.includes("/images")) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }

    setIsLoading(false);
  };

  return (
    <ResultsContext.Provider
      value={{ results, isLoading, searchTerm, setSearchTerm, getResults }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useResultsContext = () => useContext(ResultsContext);
