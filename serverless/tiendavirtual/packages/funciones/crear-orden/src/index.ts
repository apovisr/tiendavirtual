import { EventBridgeEvent } from 'aws-lambda';

export const handler = async (
  event: EventBridgeEvent<string, any>
): Promise<void> => {
  const baseUrl = process.env.URL_BASE_SERVICIO;
  
  if (!baseUrl) {
    console.error('SERVICE_BASE_URL no está definida en las variables de entorno.');
    return;
  }

  console.log('Evento Recibido:', JSON.stringify(event, null, 2));

  try {
    const response = await fetch(`${baseUrl}/ordenes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.detail),
    });

    const responseBody = await response.json();
    console.log('Respuesta API:', responseBody);
  } catch (error) {
    console.error('No se pudo llamar al servicio ECS:', error);
  }
};
