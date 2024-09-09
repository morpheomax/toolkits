import { useState } from 'react';
import { Button, Card } from "flowbite-react";
import ImgScreenshot from "../assets/img/screenshot.webp";

export const ScreenshotCapture = () => {
  const [screenshotURL, setScreenshotURL] = useState(null);

  const captureScreenshot = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const bitmap = await imageCapture.grabFrame();

      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext('2d');
      context.drawImage(bitmap, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      setScreenshotURL(dataURL);
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'screenshot.png';
      a.click();

      track.stop();
    } catch (err) {
      console.error('Error:', err);
      alert('No se pudo capturar la pantalla. Verifica los permisos.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-1/2 bg-gray-100 text-gray-900 p-6 lg:p-12">
      {/* Sección izquierda: Título, descripción y botón */}
      <div className="md:w-1/2 p-8">
        <Card className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600">
            Captura de Pantalla
          </h1>
          <p className="mb-8 text-gray-600 leading-relaxed">
            Captura una imagen de tu pantalla con un solo clic. Ideal para mostrar detalles específicos o guardar referencias visuales. La captura se descargará automáticamente en formato PNG.
          </p>
          <Button
            pill
            gradientMonochrome="teal"
            className="hover:scale-105 transition-transform duration-300"
            onClick={captureScreenshot}
          >
            Capturar Pantalla
          </Button>
        </Card>
      </div>

      {/* Sección derecha: Imagen referencial o captura realizada */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        {!screenshotURL ? (
          <img
            src={ImgScreenshot}
            alt="Imagen referencial de captura de pantalla"
            className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <img
            src={screenshotURL}
            alt="Captura de pantalla"
            className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
    </div>
  );
};

export default ScreenshotCapture;
