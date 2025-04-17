import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Upload from './components/Upload';
import Chat from './components/Chat';

function App() {

  return (
    <>
      <BrowserRouter>

      <Routes>
        <Route>
          <Route path='/' element={<Upload/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Route>
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
