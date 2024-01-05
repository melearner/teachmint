import {  Link } from 'react-router-dom';
import { useAPI } from "../context/UserContext";

const UserDirectory = () => {
  
  const { users } = useAPI();
  const { posts } = useAPI();
 
    return (
      <div className='flex justify-center items-center w-full h-full bg-gradient-to-b from-blue-600 ...'>
      <div className='flex flex-col lg:justify-center lg:w-full lg:m-20 sm:m-6'>
        <h1 className='text-center text-white font-bold rounded-lg text-3xl mb-5 md:mb-6 md:mt-0 mt-4'>User Directory</h1>
          {users.map(user => (
            <li key={user.id} className='flex m-2 bg-purple-200 p-2 rounded-lg text-blue-800'>
              <Link to={`/user/${user.id}`} className='flex justify-between w-full'>
                
                  <p>{"Name: "+user.name}</p>
                  <p>{"Posts: "+posts.filter(post=>post.userId==user.id).length}</p>
                
              </Link>
            </li>
          ))}
        </div>
      
        
        
      </div>
    );
  };
  export default UserDirectory;