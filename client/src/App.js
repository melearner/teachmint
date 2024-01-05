import {Route, Routes} from 'react-router-dom';
import UserDirectory from './component/UserDirectory';
import UserProfile from './component/UserProfile';
import { APIContextProvider } from "../src/context/UserContext";
// App Component
const App = () => {
  return (
    <APIContextProvider>
    <Routes>
      
      
        <Route path="/" element={<UserDirectory/>} />
        <Route path="/user/:userId" element={<UserProfile/>} />
       
       
    </Routes>
    </APIContextProvider>
   
  );
};

export default App;
