import React, { useEffect } from 'react';
import GameStats from './GameStats';

/*
Props:
avatar: string url
avatarfull: string url
avatarhash: string
avatarmedium: string url
communityvisibilitystate: number
lastlogoff: timestamp
loccountrycode: string (countrycode)
personaname: string
personastate: number
personastateflags: number
primaryclanid: string
profilestate: number
profileurl: string url
steamid: string
timecreated: timestamp
*/


const UserViewer = ({playerData}) => {
    const {
        steamid,
        avatarfull,
        personaname
    } = playerData.player;

    const {
        games
    } = playerData;

    // useEffect(() => {
    //     console.log(playerData);
    // }, [playerData]);

    return (
        <>
            <h2>{personaname}'s Profile.</h2>
            <img className="Avatar-Image" src={avatarfull} alt={`Profile for ${personaname}`} />
            <p>SteamId: {steamid}</p>
            <GameStats games={games} />
        </>
    )
}

export default UserViewer;