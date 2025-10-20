import React, {useState} from 'react'
import { Carousel } from 'react-bootstrap';
import '../styles/pages/inicio.css'
import ReactPlayer from "react-player"


function Inicio() {

  const slides = [
    {type : "image", url: "https://images.igdb.com/igdb/image/upload/t_720p/ar3vs2.webp"},
    {type : "image", url: "https://images.igdb.com/igdb/image/upload/t_720p/scy45o.webp"},
    {type : "image", url: "https://images.igdb.com/igdb/image/upload/t_720p/scy45p.webp"},
    {type : "image", url: "https://images.igdb.com/igdb/image/upload/t_720p/scy45n.webp"}
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };


  return (
    <>
      <h3>Nuevo Lanzamiento</h3>
      <div className='carrusel-wrapper'>
        <button className="carrusel-btn left" onClick={prevSlide}>
          ❮
        </button>

        <div className='contanier-item-carrusel'>
          {slides.map((item, index) => (
            <div 
              key={index} 
              className={`carrusel-slide ${ index === current ? "active" : ""}`} 
            >
            {item.type === "image" ? (
              <img 
                src={item.url} 
                alt={`slide-${index}`}  
                className='carrusel-media'
              />
            ) : (
              <ReactPlayer
                url={item.url}
                title={`video-${index}`}
                width="100%"
                height="400px"
                controls
                className='carrusel-media'
              />
            )}
            </div>
            ))} 
        </div>

        <button className="carrusel-btn right" onClick={nextSlide}>
          ❯
        </button>
      </div>
      
      {/*Form Contacto pasarlo al inicio y borrar contacto.jsx*/}
      
      {/*formas de pago */}

    </>
  );
}

export default Inicio