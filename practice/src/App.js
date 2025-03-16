import Comp1 from './components/Comp1';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './components/Main';
import Comp2 from './components/Comp2';
import Comp3 from './components/Comp3';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import TopicSelection from './components/TopicSelection';

function App() {
  return (
    <>
    <Router>
        <Routes>
            {/* <Route path="/" element={<Main/>}> */}
               {/* <Route path="comp1" element={<Comp1/>}/>
               <Route path="comp2" element={<Comp2/>}/>
               <Route path="comp3" element={<Comp3/>}/> */}
            {/* </Route> */}
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/comp' element={<TopicSelection/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
