import React from 'react';

const InfoFlyout = ({ title, games, isOpen, close }) => {

    return (
        <div className={`Screen-Overlay ${isOpen ? 'Visible' : 'Hidden'}`} 
            onClick={() => close()}>
            <div className={`Info-Flyout ${isOpen ? 'Info-Flyout-Appear' : ''}`}>
                <p>{title}</p>
                <ul type="none" style={{textAlign:"left"}}>
                    {games.map((game) => {
                        return (<li>{game.name}</li>)
                    })}
                </ul>
            </div>
        </div>
    )
}

export default InfoFlyout;