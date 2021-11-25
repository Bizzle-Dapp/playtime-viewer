import React, { useEffect, useState } from 'react';

const CookiePopup = () => {
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const policy = localStorage.getItem("cookiePolicy");
        if (policy) {
            setAccepted(policy);
        }
    }, [])

    return (
        !accepted &&
        <div className="Cookie-Popup">
            <h1>What this site does:</h1>
            <p>
                Yo! No cookies here, but we do use your browser local storage to
                save your previous searches. You can clear them with the clear history
                button. There is no way to turn off this functionality so if you
                aren't happy with that, close the tab now and go about your day...
            </p>
            <button onClick={() => { localStorage.setItem("cookiePolicy", true); setAccepted(true);}}>No Worries!</button>
        </div>
    )
}

export default CookiePopup;