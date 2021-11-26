import React from 'react';
import GameStats from './GameStats';

const UserViewer = ({playerData}) => {
    const {
        steamid,
        avatarfull,
        personaname
    } = playerData.player;

    const {
        games
    } = playerData;

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