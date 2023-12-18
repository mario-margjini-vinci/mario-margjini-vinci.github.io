const game = [];

function addPlayer(player) {
    game.push(player);
}
function getPlayers(noPlayer) {
    if (game[noPlayer - 1] === null || game[noPlayer - 1] === undefined){
        return 'Non actif'
    } 
    const player = JSON.parse(game[noPlayer - 1]);
    return player.name;
}

export { addPlayer, getPlayers }
