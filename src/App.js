
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import SimpleBottomNavigation from './components/MainNav.js';
import { Container } from '@mui/material';
import Trending from './Pages/Trending/Trending.js';
import Movies from './Pages/Movies/Movies.js';
import Series from './Pages/Series/Series.js';
import Search from './Pages/Search/Search.js';


function App() {
  return (
    <BrowserRouter>
     <Header></Header>
     <div className="app">
        <Container style={{backgroundColor:"#8f1f1f"}}>
           <Routes>
              <Route exact path='/' element={<Trending></Trending>}/>
              <Route exact path='/movies' element={<Movies></Movies>}/>
              <Route exact path='/series' element={<Series></Series>}/>
              <Route exact path='/search' element={<Search></Search>}/>
          </Routes>
        </Container>
     </div>

    
     <SimpleBottomNavigation style={{backgroundColor:"#6d0404"}}></SimpleBottomNavigation>
     </BrowserRouter>
  );
}

export default App;
