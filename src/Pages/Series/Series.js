import { useEffect, useState } from "react";
import useGenres from "../../Hooks/useGenre";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleComponent/SingleContent";
import axios from "axios";

const Series =  () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL=useGenres(selectedGenres);


  const fetchMovies=async() =>{
      const { data }= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreforURL}`)
  
         setContent(data.results);
         setNumOfPages(data.total_pages);
    };
   
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page,genreforURL])
  
    return  (
      <div>
         <span className="pageTitle">Series</span>
         <Genres
         type="tv"
         selectedGenres={selectedGenres}
         genres={genres}
         setGenres={setGenres}
         setSelectedGenres={setSelectedGenres}
         setPage={setPage}
       />
         <div className="trending">
              {
                content && content.map((c) => (
                  <SingleContent key={c.id} id={c.id} 
                  poster={c.poster_path} 
                  title={c.title || c.name} 
                  date={c.first_air_date || c.release_date}
                  media_type="tv"
                  vote_average={c.vote_average}
                  overview={c.overview}
                  popularity={c.popularity}></SingleContent>
                ))
              }
         </div>
         {numOfPages > 1&&(
         <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
         )}
      </div>
    )
};

export default Series;
