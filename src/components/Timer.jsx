import { useState, useRef } from 'react';
import { Button, Card } from 'flowbite-react'; // Usamos los botones y card de Flowbite
import { FaPlay, FaRedo } from 'react-icons/fa'; // Iconos para mejorar la interfaz visual
import ImgTimer from "../assets/img/cronometro.webp"; // Imagen del cronómetro

export const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(0);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-1/2 bg-gray-900 text-white p-6 lg:p-12">
      {/* Sección izquierda: Controles y cronómetro */}
      <div className="md:w-1/2 p-8">
        <Card className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-4xl font-bold mb-4 text-white">Cronómetro</h1>
          <p className="text-5xl font-mono text-green-400 mb-8">{formatTime(seconds)}</p>

          <div className="flex space-x-4">
            <Button
              pill
              gradientMonochrome="green"
              className="flex items-center justify-center space-x-2 py-3 px-5 bg-green-600 hover:bg-green-700 transition-transform duration-200"
              onClick={startTimer}
            >
              <FaPlay className="inline-block mr-2" />
              <span>Iniciar</span>
            </Button>

            <Button
              pill
              gradientMonochrome="red"
              className="flex items-center justify-center space-x-2 py-3 px-5 bg-red-600 hover:bg-red-700 transition-transform duration-200"
              onClick={resetTimer}
            >
              <FaRedo className="inline-block mr-2" />
              <span>Reiniciar</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Sección derecha: Imagen de referencia o reloj */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        <img
          src={ImgTimer}
          alt="Imagen de cronómetro"
          className="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

