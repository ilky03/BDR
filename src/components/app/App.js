import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Nav from '../nav/Nav';
import MainPage from '../pages/MainPage';
import StatisticsPage from '../pages/StatisticsPage';
import SettingsPage from '../pages/SettingsPage';

import './app.scss';

function App() {
  return (
    <Router>
      <Nav />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/statistics' element={<StatisticsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
    </Router>
  );
}

export default App;
