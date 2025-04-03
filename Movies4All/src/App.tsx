
import { Route, Routes } from 'react-router-dom';
import './css/App.css'

import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import NavBar from './Components/NavBar';
import { MovieProvider } from './Contexts/MovieContext';
import MovieDetails from './Pages/MovieDetails';

function App() {

 //   const movieNumber =1;
  return (
    <MovieProvider>
      <NavBar />
   <main className='main-content'>
      <Routes>
        <Route path="MoviesWebsite/" element = {<Home />} />
        <Route path="/favourites" element = {<Favourites />}/>
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
   </main>
   </MovieProvider>
  )
}

export default App;
