import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


export default function SimpleBottomNavigation() {
  
  const [value, setValue] = React.useState(0);
  const navigate= useNavigate();
  React.useEffect(() => {
     if(value===0) navigate("/");
     else if(value===1) navigate("/movies");
     else if(value===2) navigate("/series");
     else if(value===3) navigate("/search");
  }, [value,navigate])
  

  return (
    <Box style={{ width: "100%",
    position:"fixed",
    bottom:0,
    zIndex:100,
     }}  >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{backgroundColor: "#6d0404"}}
        
      >
        <BottomNavigationAction style={{color: "wheat"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color: "wheat"}} label="Movies" icon={<MovieCreationIcon />} />
        <BottomNavigationAction style={{color: "wheat"}} label="TV Series" icon={<LocalMoviesIcon />} />
        <BottomNavigationAction style={{color: "wheat"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}