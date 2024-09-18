import React from "react";

const Video = ({ link }) => (
    
    <div>
        <iframe
            width="319,875"
            height="180"
            src={`https://www.youtube.com/embed/${link}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

export default Video;