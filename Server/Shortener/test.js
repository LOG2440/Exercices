const SERVER_URL = 'http://localhost:3000';

// Validation de la redirection
async function validateRedirect() {
    const res = await fetch(`${SERVER_URL}/sh/11f4fb`);
    const correctRedirect = res.redirected && res.url === 'https://www.google.com/';
    console.log(`URL bien redirigée : ${correctRedirect}`);
}

async function validateExistingShortcode() {
    const res = await fetch(`${SERVER_URL}/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: 'https://google.com' })
    });
    const data = await res.json();
    const correctShortcode = data.shortcode === '11f4fb' && data.shortUrl === `${SERVER_URL}/sh/11f4fb`;
    console.log(`Shortcode valide : ${correctShortcode}`);
}

async function validateNewShortcode() {
    const res = await fetch(`${SERVER_URL}/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: 'https://example.com' })
    });
    const data = await res.json();
    const correctShortcode = data.shortcode.length === 6 && data.shortUrl === `${SERVER_URL}/sh/${data.shortcode}`;
    console.log(`Nouveau code valide : ${correctShortcode}`);

    // Valider la redirection vers l'URL d'origine
    const res2 = await fetch(`${SERVER_URL}/sh/${data.shortcode}`);
    const correctRedirect = res2.redirected && res2.url === 'https://example.com/';
    console.log(`URL bien redirigée : ${correctRedirect}`);
}

async function validateStats() {
    const TEST_SHORTCODE = '8ba743';
    //Récupérer les statistiques avant et après un accès
    const res = await fetch(`${SERVER_URL}/sh/${TEST_SHORTCODE}/stats`);
    const data = await res.json();
    const correctStats = data.hits;

    await fetch(`${SERVER_URL}/sh/${TEST_SHORTCODE}`);

    const res2 = await fetch(`${SERVER_URL}/sh/${TEST_SHORTCODE}/stats`);
    const data2 = await res2.json();
    const correctStats2 = data2.hits > correctStats;
    console.log(`Statistiques valides après plusieurs redirections : ${correctStats2}`);
}

async function resetStats() {
    const TEST_SHORTCODE = '8ba743';
    
    // Accéder à l'URL pour incrémenter les statistiques et les réinitialiser
    await fetch(`${SERVER_URL}/sh/${TEST_SHORTCODE}`);
    await fetch(`${SERVER_URL}/sh/${TEST_SHORTCODE}/reset`, { method: 'PATCH' });

    const res = await fetch(`${SERVER_URL}/sh/${TEST_SHORTCODE}/stats`);
    const data = await res.json();
    const correctStats = data.hits === 0;
    console.log(`Statistiques réinitialisées : ${correctStats}`);
}

async function tests() {
    console.log('Validation de la redirection');
    await validateRedirect();

    console.log('Validation du code existant');
    await validateExistingShortcode();

    console.log('Validation du nouveau code');
    await validateNewShortcode();

    console.log('Validation des statistiques');
    await validateStats();

    console.log('Validation de la réinitialisation');
    await resetStats();
}

tests();