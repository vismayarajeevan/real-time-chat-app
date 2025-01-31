
import './App.css'
import Login from './components/Login'
import ChatPage from './components/ChatPage';
import { useSelector } from 'react-redux';

function App() {

  const username = useSelector((state) => state.authentication?.username);

  return (
    <>
 
      <div >
        {username ? <ChatPage /> : <Login />}
      </div>
   
    
    </>
  )
}

export default App


