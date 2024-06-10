import React, { useState, useRef } from 'react';
import cancion from './Perfect.mp3'; // Asegúrate de que la ruta al archivo MP3 sea correcta

const ValentinesMessage = () => {
  const [envelopeVisible, setEnvelopeVisible] = useState(true);
  const [heartVisible, setHeartVisible] = useState(true);
  const [cardVisibility, setCardVisibility] = useState('hidden');
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.1);
  const [currentPage, setCurrentPage] = useState(1); // Nuevo estado para el control de la página
  const totalPages = 3; // Asumiendo que quieres tener 3 páginas, ajusta según sea necesario
  const audioRef = useRef(null);

  const handleClick = () => {
    setEnvelopeVisible(false);
    setHeartVisible(false);
    setTimeout(() => {
      setCardVisibility('visible');
      let animationFrame, start;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        setOpacity(Math.min(progress / 1000, 1));
        setScale(1 + Math.sin(Math.min(progress / 1000, 1) * Math.PI) * 0.1);
        if (progress < 1000) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 800);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Renderiza el contenido de la página actual
  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <p>
            Primera página de contenido... (personaliza este contenido según sea necesario)
          </p>
        );
      case 2:
        return (
          <p>
            Segunda página de contenido... (personaliza este contenido según sea necesario)
          </p>
        );
      case 3:
        return (
          <p>
            Tercera página de contenido... (personaliza este contenido según sea necesario)
          </p>
        );
      default:
        return <p>Contenido no encontrado.</p>;
    }
  };

  return (
    <div onClick={handleClick}>
      <div className="valentines-day" style={{ display: envelopeVisible ? 'block' : 'none' }}>
        <div className="envelope"></div>
        {heartVisible && <div className="heart"></div>}
        <div className="text">CON <br />MUCHO <br />AMOR</div>
        <div className="front"></div>
      </div>

      <div id="card" style={{ visibility: cardVisibility, opacity: opacity, transform: `scale(${scale})` }}>
        <div className="side one"></div>
        <div className="side two">
          {renderPageContent()}
          <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </div>

      <audio ref={audioRef} src={cancion} />
    </div>
  );
};

export default ValentinesMessage;