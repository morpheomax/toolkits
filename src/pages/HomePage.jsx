import { AudioRecorder } from "../components/AudioRecorder";
import { ScreenshotCapture } from "../components/ScreenshotCapture";
import { Task } from "../components/Tasks";
import { Timer } from "../components/Timer";
import { VideoAudioRecorder } from "../components/VideoRecorder";
import { Card, Button } from 'flowbite-react';

export const HomePage = () => {
  return (
    <>
      <div className="bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
        <Card className="text-center mx-auto max-w-4xl p-8 shadow-lg border border-gray-200 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Optimiza tu Trabajo con Herramientas Efectivas</h1>
          <p className="text-lg text-gray-700 mb-6">
            Descubre nuestras herramientas diseñadas para facilitar tu vida diaria. Desde grabaciones de audio y video hasta captura de pantallas y gestión de tareas, cada herramienta está pensada para maximizar tu productividad y eficiencia.
          </p>
          <Button color="blue" className="mt-4">Explorar Herramientas</Button>
        </Card>
      </div>

      <VideoAudioRecorder />
      <ScreenshotCapture />
      <AudioRecorder />
      <Task />
      <Timer />
    </>
  );
};
