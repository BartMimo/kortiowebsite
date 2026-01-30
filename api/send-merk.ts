import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    Merknaam,
    Merkcode,
    Omschrijving,
    Website,
    Periode,
    Email,
  } = req.body || {};

  if (!Merknaam || !Omschrijving || !Email) {
    res.status(400).json({ error: 'Required fields missing' });
    return;
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailFrom = process.env.MAIL_FROM || 'info@kortio.app';
  const mailTo = process.env.MAIL_TO || 'info@kortio.app';

  if (!smtpHost || !smtpUser || !smtpPass) {
    res.status(500).json({ error: 'SMTP not configured on server' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const html = `
    <h2>Nieuw merk aangemeld via Kortio.app</h2>
    <p><strong>Merknaam:</strong> ${escapeHtml(Merknaam)}</p>
    <p><strong>Merkcode:</strong> ${escapeHtml(Merkcode ?? '—')}</p>
    <p><strong>Omschrijving:</strong> ${escapeHtml(Omschrijving)}</p>
    <p><strong>Website:</strong> ${escapeHtml(Website ?? '—')}</p>
    <p><strong>Periode:</strong> ${escapeHtml(Periode ?? '—')}</p>
    <p><strong>Contact e-mail:</strong> ${escapeHtml(Email)}</p>
  `;

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      cc: Email || undefined,
      subject: `Nieuw merk: ${Merknaam}`,
      html,
    });

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('Mail send error', err);
    res.status(500).json({ error: 'Failed to send mail' });
  }
}

function escapeHtml(input: any) {
  if (!input && input !== 0) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
