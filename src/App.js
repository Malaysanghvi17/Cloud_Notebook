// app.js
import './App.css';
import Navbar from './components/navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Savednote from './components/Savednote';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Navbar title="Cloud Notebook" name1="Home" name2="Saved Notebooks" name3="About" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home TextAreaName="Your Notebooks secured on cloud...." Button1_name="Save Notebook" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/saved" element={<Savednote />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


// // import logo from './logo.svg';
// import './App.css';
// import Navbar from './components/navbar';
// import Home from './components/Home';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import About from './components/About';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// function App() {
//   return (
//     <>
//       <Navbar title="Cloud Notebooks..." name1="Home" name2="About" />
//       <div className='container'>
//         <Home TextAreaName="Your Notebooks secured on cloud...." Button1_name="Save Notebook" />
//       </div>
//     </>
//   );
// }


// export default App;
