import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Side';
import { BrowserRouter,Routes,Route, } from 'react-router-dom';
import Mathematic from './components/math/Mathematic';
import English from './components/english/English';
// import Physics from './components/physics/Physics';
// import Chemistry from './components/chemistry/Chemistry';
import Biology from './components/biology/Biology';
import Crs from './components/crs/Crs';
import Economics from './components/economics/Economics';
// import Commerce from './components/commerce/Commerce';
// import Government from './components/government/Government'
import MathQuiz from './components/MathQuiz/MathQuiz';
import EnglishQuiz from './components/EnglishQuiz/EnglishQuiz';
// import PhysicsQuiz from './components/PhysicsQuiz/PhysicsQuiz';
// import ChemistryQuiz from './components/ChemistryQuiz/ChemistryQuiz';
import BiologyQuiz from './components/BiologyQuiz/BiologyQuiz';
import CrsQuiz from './components/CrsQuiz/CrsQuiz';
import EconomicsQuiz from './components/EconomicsQuiz/EconomicsQuiz';
// import CommerceQuiz from './components/CommerceQuiz/CommerceQuiz';
// import GovernmentQuiz from './components/GovernmentQuiz/GovernmentQuiz';
import Countdowntimer from './components/Countdowntimer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Scoreboard from './components/Scoreboard/Scoreboard';
// import Email from './components/Email/Email';
// import Answer from './components/Answer/Answer';
import data from './components/Data';





function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// <<<<<<< HEAD
// =======
  

// >>>>>>> 0219c00903cd454be62c341e78861fc9c808a543
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  

  
  return (
    <BrowserRouter>
    <div className="quiz">
     <ToastContainer position="top-center" autoClose={1000}/>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <div className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Routes>
        
          <Route element={<Mathematic/>} path='/'></Route>
          <Route element={<English/>} path='/CA'></Route>
          <Route element={<EnglishQuiz/>} path='/englishquiz'></Route>
          <Route element={<MathQuiz/>} path='/mathquiz'></Route>
          <Route element={<BiologyQuiz/>} path='/biologyquiz'></Route>
          <Route element={<Biology/>} path='/Biology'></Route>
          <Route element={<Crs/>} path='/Crs'></Route>
          <Route element={<CrsQuiz/>} path='/crsquiz'></Route>
          <Route element={<Economics/>} path='/Economics'></Route>
          <Route element={<EconomicsQuiz/>} path='/economicsquiz'></Route>


          {/* <Route element={<Physics/>} path='/Physics'></Route>
          <Route element={<Chemistry/>} path='/Chemistry'></Route>
         
          
         
          <Route element={<Commerce/>} path='/Commerce'></Route>
          <Route element={<Government/>} path='/Government'></Route>
          
        
          <Route element={<PhysicsQuiz/>} path='/physicsquiz'></Route>
          <Route element={<EnglishQuiz/>} path='/englishquiz'></Route>
         
          <Route element={<CommerceQuiz/>} path='/commercequiz'></Route>
          <Route element={<GovernmentQuiz/>} path='/governmentquiz'></Route> */}

          {/* <Route element={<GovernmentQuiz/>} path='/governmentquiz'></Route> */}
          {/* <Route element={<Scoreboard/>} path='/scoreboard'></Route>
          <Route element={<Email/>} path='/email'></Route>
          <Route element={<Answer/>} path='/answer'></Route> */}
        </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
