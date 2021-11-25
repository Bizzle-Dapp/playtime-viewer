
const useFetchUserData = (steamService) => {

    const fetchById = async (idInput, useVanity = true) => {
        const response = await steamService.GetPlayerById(idInput, useVanity);
        if(response.status === 200 && response.data.response.players.length > 0){
            let data = {
                status: 1,
                player: response.data.response.players[0],
                games: {}
            }
            const gamesResponse = await steamService.GetGamesById(data.player.steamid);
            data.games = gamesResponse.data.response.games;
            return data;
        } else {
            return {
                status: 0,
                error: "Failed to retrieve information for that player..."
            }
        }
    }

    return { fetchById }
}

export default useFetchUserData;