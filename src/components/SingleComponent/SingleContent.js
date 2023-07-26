
import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../config/config";
import './SingleContent.css'
import ContentModal from "../ContentModal/ContentModal";

const SingleContent =  ({id,
poster,
title,
date,
media_type,
vote_average,
overview,
popularity}) => {
    return  (
      <ContentModal media_type={media_type} id={id}>
       <Badge badgeContent={vote_average} color={vote_average>7?"primary":"secondary"} position="fixed" />
        <img className="poster" src={poster? `${img_300}/${poster}` : unavailable} alt={title} />
        <b className="title">{title}</b>
        <span className="subTitle">
            {media_type==="tv"? "Tv Series" : "Movie"}
            <span className="subTitle">{date}</span>
        </span>
        
       
      </ContentModal>
    )
};

export default SingleContent;