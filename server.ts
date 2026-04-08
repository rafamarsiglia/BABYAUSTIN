import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import sgMail from "@sendgrid/mail";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for RSVP
  app.post("/api/rsvp", async (req, res) => {
    const { name, email, guests } = req.body;
    const recipients = [
      "marketin@orvit.design", 
      "cjram188@gmail.com", 
      "Scarly.vizcaino20@gmail.com",
      "cjg7@nyu.edu"
    ];
    
    console.log(`New RSVP received: Name: ${name}, Email: ${email}, Guests: ${guests}`);

    // Sanitize environment variables to remove invisible characters (newlines, spaces)
    const apiKey = (process.env.SENDGRID_API_KEY || "").trim();
    const fromEmail = (process.env.SENDGRID_FROM_EMAIL || "notifications@orvit.design").trim();

    if (apiKey) {
      sgMail.setApiKey(apiKey);
      const msg = {
        to: recipients,
        from: fromEmail,
        subject: `New Baby Shower RSVP - ${name}`,
        text: `${name} (${email}) has confirmed attendance for ${guests} guest(s).`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #78A387;">New Baby Shower RSVP</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">This is an automated notification from Austin's Baby Shower Invitation.</p>
          </div>
        `,
      };

      try {
        await sgMail.sendMultiple(msg);
        console.log("Emails sent successfully via SendGrid");
        res.json({ success: true, message: "RSVP received and emails sent via SendGrid" });
      } catch (error) {
        console.error("Error sending email via SendGrid:", error);
        res.status(500).json({ success: false, error: "Error sending email" });
      }
    } else {
      // Simulation mode if no API key is provided
      console.log(`SIMULATING EMAIL SENDING (No API Key found):
        To: ${recipients.join(", ")}
        From: ${fromEmail}
        Subject: New Baby Shower RSVP - ${name}
        Body: ${name} (${email}) has confirmed attendance for ${guests} guest(s).
      `);
      res.json({ success: true, message: "RSVP received (Simulation Mode)" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
