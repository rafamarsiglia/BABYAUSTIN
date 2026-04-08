import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, guests } = req.body;

  if (!name || !email) {
    return res.status(400).json({ 
      error: `Campo requerido: ${!name ? 'name' : 'email'}` 
    });
  }

  const guestCount = guests || 1;

  const recipients = [
    "marketin@orvit.design",
    "cjram188@gmail.com",
    "Scarly.vizcaino20@gmail.com",
    "cjg7@nyu.edu"
  ];

  // 🔹 Sanitizar variables de entorno de forma agresiva (elimina caracteres no imprimibles)
  const apiKey = (process.env.SENDGRID_API_KEY || '').replace(/[^\x20-\x7E]/g, '').trim();
  const fromEmail = (process.env.SENDGRID_FROM_EMAIL || '').replace(/[^\x20-\x7E]/g, '').trim();

  if (!apiKey || !fromEmail) {
    console.error('Error: SENDGRID_API_KEY o SENDGRID_FROM_EMAIL no configuradas');
    return res.status(500).json({ error: 'Error de configuración en el servidor' });
  }

  console.log(`API Key detectada en endpoint (Longitud: ${apiKey.length})`);
  sgMail.setApiKey(apiKey);

  const msg = {
    from: fromEmail,
    subject: `RSVP Baby Shower: ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #78A387; border-bottom: 2px solid #78A387; padding-bottom: 10px;">Nuevo RSVP Recibido</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Invitados:</strong> ${guestCount}</p>
      </div>
    `,
  };

  try {
    console.log(`Intentando enviar RSVP de ${name}`);

    // 🔹 Enviar un correo por cada destinatario
    for (const recipient of recipients) {
      await sgMail.send({ ...msg, to: recipient });
    }

    console.log('RSVP enviado con éxito a todos los destinatarios');
    return res.status(200).json({ message: 'RSVP enviado correctamente' });

  } catch (error) {
    console.error('Error al enviar correo con SendGrid:', error);
    if (error.response) {
      console.error('Detalles de SendGrid:', error.response.body);
    }
    return res.status(500).json({ 
      error: 'Error al procesar el envío del correo. Por favor intenta más tarde.' 
    });
  }
}