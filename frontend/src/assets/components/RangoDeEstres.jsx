import React, { useState } from "react";
import YouTube from "react-youtube";

export default function RangoDeEstresYouTube() {
  const [nivelEstres, setNivelEstres] = useState(0);

  const videos = {
    bajo: "Z0eJ4k5fO7k",
    medio: "a3AunHr47r4",
    alto: "jrTMMG0zJyI",
  };

  const obtenerVideo = () => {
    if (nivelEstres <= 30) return videos.bajo;
    if (nivelEstres <= 70) return videos.medio;
    return videos.alto;
  };

  return (
    <div className="div-stress" style={{ textAlign: "center", margin: "20px" }}>
      <h1>Stress meter</h1>
      <input
        type="range"
        min="0"
        max="100"
        value={nivelEstres}
        className="stress-meter"
        onChange={(e) => setNivelEstres(Number(e.target.value))}
      />
      <p>Stress level: {nivelEstres}%</p>
      <YouTube
        videoId={obtenerVideo()} 
        opts={{
          height: "390",
          width: "640",
          playerVars: {
            autoplay: 1, 
          },
        }}
      />
    </div>
  );
}
