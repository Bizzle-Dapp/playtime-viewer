import axios from "axios";

class SteamService {
    
    async GetPlayerById(id, useVanity) {
        try{
            if(useVanity){
                return await axios.get(
                    `http://localhost:4000/getplayersummary/${id}`,
                    {'Content-Type': 'application/json'}
                );
            } else {
                return await axios.get(
                    `http://localhost:4000/getplayersummarybyrawid/${id}`,
                    {'Content-Type': 'application/json'}
                );
            }
        } catch (e) {
            console.log("Failed to GetPlayerById", e);
        }
    }

    async GetGamesById(id) {
        try{
            return await axios.get(
                `http://localhost:4000/getownedgames/${id}`,
            );
        } catch (e) {
            console.log("Failed to GetAppById", e);
        }
    }
}

export default SteamService;