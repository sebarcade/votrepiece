import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SoumissionData {
  id: string;
  type: string;
  description: string;
  superficie?: number;
  travaux: string[];
  budget: string;
  delai: string;
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  disponibilite: string;
  estimationMin?: number;
  estimationMax?: number;
  dateCreation: string;
}

export async function envoyerEmailSoumission(data: SoumissionData) {
  const travauxList = data.travaux.map((t) => `• ${t}`).join('\n');

  const htmlAdmin = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, Arial, sans-serif; background: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: #2D8B55; padding: 30px; color: white; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .badge { background: #FFB800; color: #1A1A1A; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; margin-top: 8px; }
    .body { padding: 30px; }
    .section { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 16px 0; border-left: 4px solid #2D8B55; }
    .section h3 { margin: 0 0 12px; color: #2D8B55; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .row { display: flex; justify-content: space-between; margin: 8px 0; }
    .label { color: #666; font-size: 14px; }
    .value { font-weight: 600; color: #1A1A1A; font-size: 14px; }
    .estimation { background: linear-gradient(135deg, #2D8B55, #1a5c38); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 16px 0; }
    .estimation .price { font-size: 32px; font-weight: 800; }
    .footer { background: #0F1A13; color: #aaa; text-align: center; padding: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 Nouvelle Soumission Reçue</h1>
      <div class="badge">#${data.id}</div>
      <p style="margin:8px 0 0; opacity:0.8;">${data.dateCreation}</p>
    </div>
    <div class="body">
      <div class="section">
        <h3>👤 Client</h3>
        <div class="row"><span class="label">Nom</span><span class="value">${data.nom}</span></div>
        <div class="row"><span class="label">Téléphone</span><span class="value">${data.telephone}</span></div>
        <div class="row"><span class="label">Email</span><span class="value">${data.email}</span></div>
        <div class="row"><span class="label">Adresse</span><span class="value">${data.adresse}</span></div>
        <div class="row"><span class="label">Disponibilité</span><span class="value">${data.disponibilite}</span></div>
      </div>
      <div class="section">
        <h3>🔨 Projet</h3>
        <div class="row"><span class="label">Type</span><span class="value">${data.type}</span></div>
        ${data.superficie ? `<div class="row"><span class="label">Superficie</span><span class="value">${data.superficie} pi²</span></div>` : ''}
        <div class="row"><span class="label">Budget</span><span class="value">${data.budget}</span></div>
        <div class="row"><span class="label">Délai souhaité</span><span class="value">${data.delai}</span></div>
        <p style="color:#666; font-size:14px; margin-top:12px;"><strong>Description :</strong> ${data.description}</p>
        <p style="color:#666; font-size:14px;"><strong>Travaux souhaités :</strong></p>
        <p style="white-space:pre-line; font-size:14px;">${travauxList}</p>
      </div>
      ${data.estimationMin ? `
      <div class="estimation">
        <p style="margin:0 0 4px; opacity:0.8; font-size:14px;">ESTIMATION PRÉLIMINAIRE</p>
        <div class="price">${data.estimationMin.toLocaleString('fr-CA')}$ – ${data.estimationMax?.toLocaleString('fr-CA')}$</div>
        <p style="margin:4px 0 0; opacity:0.7; font-size:12px;">À confirmer lors de la visite</p>
      </div>
      ` : ''}
    </div>
    <div class="footer">Votre Pièce | (819) 247-0449 | VotrePiece@gmail.com</div>
  </div>
</body>
</html>`;

  const htmlClient = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, Arial, sans-serif; background: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: #2D8B55; padding: 40px 30px; color: white; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .body { padding: 30px; text-align: center; }
    .checkmark { font-size: 60px; }
    .info { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: left; }
    .footer { background: #0F1A13; color: #aaa; text-align: center; padding: 20px; font-size: 12px; }
    .contact { background: #2D8B55; color: white; padding: 15px; border-radius: 8px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Votre Pièce</h1>
      <p style="margin:8px 0 0; opacity:0.8;">Rénovation professionnelle en Mauricie</p>
    </div>
    <div class="body">
      <div class="checkmark">✅</div>
      <h2>Demande reçue, ${data.nom.split(' ')[0]} !</h2>
      <p style="color:#666; font-size:16px;">Votre demande de soumission a bien été enregistrée. Notre équipe vous contactera dans les prochaines 24 heures pour planifier une visite gratuite.</p>
      <div class="info">
        <strong>Récapitulatif de votre demande :</strong><br>
        🔨 Type : ${data.type}<br>
        📅 Délai souhaité : ${data.delai}<br>
        💰 Budget : ${data.budget}<br>
        📋 Numéro de dossier : #${data.id}
      </div>
      <div class="contact">
        <strong>Une question urgente ?</strong><br>
        📞 (819) 247-0449<br>
        ✉️ VotrePiece@gmail.com
      </div>
    </div>
    <div class="footer">© Votre Pièce | Shawinigan, Mauricie</div>
  </div>
</body>
</html>`;

  // Envoyer à l'admin
  await transporter.sendMail({
    from: `"Votre Pièce - Site Web" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `🔔 Nouvelle soumission #${data.id} — ${data.type} — ${data.nom}`,
    html: htmlAdmin,
  });

  // Envoyer au client
  if (data.email) {
    await transporter.sendMail({
      from: `"Votre Pièce" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Votre demande de soumission a été reçue ✅',
      html: htmlClient,
    });
  }
}
