import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      axios.get(`https://jsonplaceholder.typicode.com/posts/`)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
      axios.get('http://worldtimeapi.org/api/timezone')
          .then(response => setRegions(response.data))
          .catch(error => console.error(error));
      console.log(data);
      setUsers(data);
    }
    fetchData();
  }, []);
  return (
    <APIContext.Provider
      value={{
        users,posts,regions
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
