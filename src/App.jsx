import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';

import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}/>

        <Route path='/technologies' element={<TechnologyList />} />

        <Route path='/technology/:techId' element={<TechnologyDetail />} />

        <Route path='/add-technology' element={<AddTechnology/>}/>

        <Route path='/statistics' element={<Statistics/>}/>

      </Routes>
    </div >
  );
}
export default App;