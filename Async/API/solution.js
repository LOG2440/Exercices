let currentPage = 0;

async function fetchGames(pageIndex = 0) {
    const res = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20&pageNumber=${pageIndex}`);
    const games = await res.json();

    const parent = document.getElementById('parent');
    parent.innerHTML = '';
    games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game';
        div.innerHTML = `
        <h2>${game.title}</h2>
        <p>Price: $${game.salePrice}</p>
        <p>Normal Price: $${game.normalPrice}</p>
        <p>Meta Score: ${game.metacriticScore}</p>
        <a href="https://www.cheapshark.com/redirect?dealID=${game.dealID}" target="_blank">
            <img src="${game.thumb}" alt="${game.title}" />
        </a>
    `;
        parent.appendChild(div);
    });

}

const loadGamesButton = document.getElementById('loadButton');
loadGamesButton.addEventListener('click', () => {
    currentPage = 0;
    fetchGames(currentPage);
});

const nextPageButton = document.getElementById('nextPage');
nextPageButton.addEventListener('click', () => {
    currentPage++;
    fetchGames(currentPage);
    prevPageButton.disabled = false;
}
);

const prevPageButton = document.getElementById('prevPage');
prevPageButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        prevPageButton.disabled = currentPage === 0;
        fetchGames(currentPage);
    }
});