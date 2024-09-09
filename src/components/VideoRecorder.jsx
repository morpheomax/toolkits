import { useState } from 'react';
import { Button, Card } from "flowbite-react";
import videoimage from "../assets/img/grabarpantalla.webp";

export const VideoAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        const url = URL.createObjectURL(event.data);
        setVideoURL(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grabacion.webm';
        a.click();
      };

      setIsRecording(true);

      document.getElementById('stopRecording').onclick = () => {
        mediaRecorder.stop();
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (err) {
      console.error('Error:', err);
      alert('No se pudo acceder a la pantalla o al micrófono. Verifica los permisos.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-1/2 bg-gray-900 text-white p-6 lg:p-12">
      {/* Sección izquierda: Título, descripción y botones */}
      <div className="md:w-1/2 p-8">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-cyan-500/50">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
            Grabador de Pantalla y Audio
          </h1>
          <p className="mb-8 text-gray-400 leading-relaxed">
            Captura tu pantalla y audio con facilidad. Ideal para presentaciones, tutoriales o reuniones.
            Comienza a grabar y descarga el video en formato webm cuando hayas terminado.
          </p>
          <div className="flex space-x-6 justify-center">
            <Button
              pill
              gradientDuoTone="cyanToBlue"
              className="hover:scale-105 transition-transform duration-300"
              onClick={startRecording}
              disabled={isRecording}
            >
              Iniciar Grabación
            </Button>
            <Button
              pill
              gradientDuoTone="redToYellow"
              className="hover:scale-105 transition-transform duration-300"
              id="stopRecording"
              disabled={!isRecording}
            >
              Detener Grabación
            </Button>
          </div>
        </Card>
      </div>

      {/* Sección derecha: Imagen referencial o video grabado */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        {!videoURL ? (
          <img
            src={videoimage}
            alt="Imagen referencial de grabación de pantalla"
            className="w-full h-auto rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/50"
          />
        ) : (
          <video
            src={videoURL}
            controls
            className="w-full h-auto rounded-lg shadow-xl transition-transform duration-500 hover:scale-105 hover:shadow-cyan-500/50"
          />
        )}
      </div>
    </div>
  );
};

export default VideoAudioRecorder;
