import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../context/UserContext";
import axios from "axios";

const UserProfile = () => {
  const { users } = useAPI();
  const { posts } = useAPI();
  const { regions } = useAPI();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [clock, setClock] = useState({
    time: new Date(),
    isPaused: false,
  });

  const { userId } = useParams();
  const sposts = posts.filter((post) => post.userId == userId);

  useEffect(() => {
    if (selectedCountry) {
      const fetchTime = async () => {
        try {
          const response = await axios.get(
            `http://worldtimeapi.org/api/timezone/${selectedCountry}`
          );
          setClock((prevClock) => {
            prevClock.time = new Date(
              response.data.datetime.substring(
                0,
                response.data.datetime.length - 6
              )
            );
            return prevClock;
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchTime();
    }
  }, [selectedCountry]);

  useEffect(() => {
    let timer;

    if (!clock.isPaused) {
      timer = setInterval(() => {
        setClock((prevClock) => ({
          ...prevClock,
          time: new Date(prevClock.time.getTime() + 1000),
        }));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [clock]);

  const handlePauseToggle = (e) => {
    e.preventDefault();
    setClock((prevClock) => ({
      ...prevClock,
      isPaused: !prevClock.isPaused,
    }));
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-gradient-to-b from-blue-600 ... md:p-10 p-2">
      <div className="flex flex-col w-full  m-4 items-center justify-center">
        <div className="flex md:flex-row w-full justify-around flex-col">
            <div className="flex flex-row justify-center">
                <button
                className="text-center md:h-10 md:w-30 h-15 w-15 m-2 p-2 py-0 bg-purple-200 rounded-lg text-blue-800"
                onClick={() => window.history.back()}
                >
                    Back
                </button>
                <select
                    className="p-2 m-2 bg-purple-200 rounded-lg text-blue-800 text-center"
                    id="countrySelector"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Country Dropdown</option>
                    {regions.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-row justify-center">
                <h3 className="text-center bg-purple-200 text-blue-700 rounded-lg text-2xl m-2 w-60">
                {clock.time.toLocaleTimeString()}
                </h3>
                <button
                    className="text-center h-10 w-70 m-2 p-2 py-0 bg-purple-200 rounded-lg text-blue-800"
                    onClick={(e) => handlePauseToggle(e)}
                >
                    {clock.isPaused ? "Start " : "Pause"}
                </button>
            </div>
          
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col bg-purple-200 text-blue-800 rounded-lg p-3 m-4 font-bold md:w-1/2 w-full">
            {users[userId] && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <p >{users[userId].name}</p>
                    <div>
                        <p >{users[userId].address.street}</p>
                        <p>{users[userId].address.suite}</p>
                        <p>{users[userId].address.city}</p>
                        <p>{users[userId].address.zipcode}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p >{users[userId].username}</p>
                    <p >{users[userId].email}</p>
                </div>
               
              </div>
            )}
          </div>
          <div>
           
            
          </div>
          <div>
            {sposts.map((post) => (
              <div className="bg-purple-200 rounded-lg p-3 m-4" key={post.id}>
                <strong className='text-blue-800'>{post.title}</strong>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
