import React from 'react'; 
import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genres =  ({
    type,
    selectedGenres,
    genres,
    setGenres,
    setSelectedGenres,
    setPage
}) => {


    const handleAdd=(genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g) => g.id!==genre.id));
        setPage(1);
    } 

    const handleRemove=(genre)=>{
          setSelectedGenres(selectedGenres.filter((selected)=>selected.id!==genre.id));
          setGenres([...genres,genre])
          setPage(1);
    }

    const fetchGenres = async() => {
       const { data }= await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}`)
        
       setGenres(data.genres)
    };
     
    console.log(genres);

    useEffect(() => {
        fetchGenres();
        return ()=>{
            setGenres({})
        }
        // eslint-disable-next-line
      }, []);
    

    return  (
      <div style={{padding: "6px 0"}}>
          
           {selectedGenres && selectedGenres.map((genre)=>(
            <Chip label={genre.name} 
            style={{margin: 2 }} 
            size="small" color='primary' clickable key={genre.id}
            onDelete={()=>handleRemove(genre)}
            
            />

        ))}

        {genres && genres.map((genre)=>(
            <Chip label={genre.name} style={{margin: 2, color:"wheat" }} 
            size="small" 
            clickable 
            key={genre.id}
            onClick={()=>handleAdd(genre)}
            />
        ))}
      </div>
    )
};

export default Genres;
