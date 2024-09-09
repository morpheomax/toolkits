import { useState } from 'react';
import { Button, Card } from 'flowbite-react';
import { FaMicrophone, FaStop } from 'react-icons/fa'; // Iconos para los botones
import ImgAudioRecorder from "../assets/img/grabaraudio.webp";

export const AudioRecorder = () => {
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        const url = URL.createObjectURL(event.data);
        setAudioURL(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audio.webm';
        a.click();
      };

      setIsAudioRecording(true);

      document.getElementById('stopAudioRecording').onclick = () => {
        mediaRecorder.stop();
        setIsAudioRecording(false);
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (err) {
      console.error('Error:', err);
      alert('No se pudo acceder al micrófono. Verifica los permisos.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-1/2 bg-gray-800 text-white p-6 lg:p-12">
      {/* Sección izquierda: Contenido y controles */}
      <div className="md:w-1/2 p-8">
        <Card className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Grabación de Audio
          </h1>
          <p className="mb-8 text-gray-300 leading-relaxed">
            Graba el audio con un solo clic. Ideal para notas rápidas o grabaciones importantes. El archivo se descargará automáticamente en formato WEBM.
          </p>

          <div className="flex space-x-4 ">
            <Button
              pill
              gradientMonochrome="dark"
              className={`flex items-center justify-center space-x-2 py-3 px-5 ${isAudioRecording ? 'bg-red-500' : 'bg-gray-500'} transition-transform duration-200`}
              onClick={startAudioRecording}
              disabled={isAudioRecording}
            >
              <FaMicrophone className="inline-block mr-2" />
              <span>Iniciar Grabación</span>
            </Button>

            <Button
              pill
              gradientMonochrome="red"
              className="flex items-center justify-center space-x-2 py-3 px-5 bg-red-600 hover:bg-red-700 transition-transform duration-200"
              id="stopAudioRecording"
              disabled={!isAudioRecording}
            >
              <FaStop className="inline-block mr-2" />
              <span>Detener Grabación</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Sección derecha: Imagen referencial o grabación realizada */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        {!audioURL ? (
          <img
            src={ImgAudioRecorder}
            alt="Imagen referencial de grabación de audio"
            className="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <audio src={audioURL} controls className="w-full mt-4 rounded-lg" />
        )}
      </div>
    </div>
  );
};


