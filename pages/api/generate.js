export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { idea = 'Projet', audience = 'tous', tone = 'professional' } = req.body || {};

    // 👉 Plus tard, pour activer OpenAI :
    // Ajoute ta clé dans Vercel (AI_API_KEY)
    // et remplace la partie "réponse démo" par un appel à OpenAI.

    // Réponse démo (toujours OK, même sans clé)
    const brand =
      idea
        .split(' ')
        .slice(0, 3)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join('') + Math.floor(Math.random() * 90 + 10);

    const oneLiner = `${idea} pour ${audience} — ${
      tone === 'friendly' ? 'simple et efficace.' : 'professionnel et fiable.'
    }`;

    const landingHTML = `<!doctype html><html lang='fr'><head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width,initial-scale=1'>
      <title>${brand}</title>
      <link rel='preconnect' href='https://fonts.googleapis.com'>
      <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
      <style>
        body{font-family:Inter,system-ui;margin:0;background:#f8fafc;color:#0f172a}
        h1{font-family:Montserrat;font-size:40px}
        main{max-width:980px;margin:0 auto;padding:32px}
        .hero{background:linear-gradient(120deg,#ede9fe,#e0f2fe);border-radius:20px;padding:36px}
      </style>
      </head><body>
      <main>
        <section class='hero'>
          <h1>${brand}</h1>
          <p>${oneLiner}</p>
          <p>Email: hello@${brand.toLowerCase()}.com</p>
        </section>
      </main>
    </body></html>`;

    const logoSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='120' viewBox='0 0 420 120'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#6d28d9'/>
          <stop offset='1' stop-color='#0ea5e9'/>
        </linearGradient>
      </defs>
      <rect width='420' height='120' rx='16' fill='url(#g)' />
      <text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle'
        font-family='Montserrat, Inter, Arial' font-size='30' fill='white'>
        ${brand}
      </text>
    </svg>`;

    const socialPosts = [
      `Découvrez ${brand} — ${idea}.`,
      `${brand}: ${idea} pour ${audience}.`,
      `Pourquoi ${brand}? Simplicité, sécurité, halal.`,
      `Commencez aujourd'hui avec ${brand}.`,
      `Guide rapide: ${idea} en 3 étapes.`
    ];

    const readme = `# ${brand}\n\nGénéré en mode démo. Ajoutez AI_API_KEY dans Vercel pour activer l'IA.\n`;

    return res.status(200).json({ brand, oneLiner, landingHTML, logoSVG, socialPosts, readme });
  } catch (e) {
    return res.status(500).send(e?.message || 'Erreur serveur');
  }
}
