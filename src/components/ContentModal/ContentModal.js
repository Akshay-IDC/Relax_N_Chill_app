import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { YouTube } from '@mui/icons-material';
import "./ContentModal.css";
import Carousel from './Carousel/Carousel.js';

const style = {
 
  transform: 'translate(5% , 15% )',
  width: "90%",
  height: "80%",
  bgcolor: '#39445a',
  border: '1px solid #282c234',
  boxShadow: 5,
  padding: "1px 1px 3px",
  color: "white",
  borderRadius: 5,
};

export default function ContentModal({children ,media_type,id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] =useState();
  const [Video, setVideo] = useState();

  const fetchData = async() =>{
    const { data }=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
    setContent(data); 
}
  const fetchVideo = async() =>{
    const { data }=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
    setVideo(data.results[0]?.key)  
}

   useEffect(() => {
       fetchData();
       fetchVideo();
   }, [])
   

  return (
    <>
      <div onClick={handleOpen} className="media" style={{cursor: "pointer"}} color="inherit">{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && (<Box sx={style}>
              
               <div className='ContentModal'>
               <img 
                 alt={content.name || content.title} className="ContentModal_portrait" 
                 src={content.poster_path?`${img_500}/${content.poster_path}`: unavailableLandscape}/>
                
                 <img 
                 alt={content.name || content.title} className="ContentModal_landscape" 
                 src={content.backdrop_path?`${img_500}/${content.backdrop_path}`: unavailableLandscape}/>
                 <div className="ContentModal_about">
                    <span className='ContentModal_title'> 
                         {content.name||content.title}(
                          {(
                            content.first_air_date || content.release_date || "------"
                          ).substring(0,4)}
                         )
                    
                    </span>
                     {content.tagline && (
                       <i className='tagline'>{content.tagline}</i>
                     )}
                     <span className='ContentModal_description'>
                        {content.overview}
                        </span>
                          <div>
                            <Carousel media_type={media_type} id={id}/>
                         </div>
                          <Button
                             variant="contained"
                             startIcon={<YouTube/>}
                             color='secondary'
                             target="__blank"
                             href={`https://www.youtube.com/watch?v=${Video}`}>
                               WATCH THE TRAILER HERE
                             </Button>
                     
                 </div>
               </div>
               
          </Box>)}
        </Fade>
      </Modal>
    </>
  );
}