import React, { useEffect, useState } from 'react';
import useFetchUserData from '../hooks/useFetchUserData';

const AppSearch = (props) => {
    const { steamService, setPlayerData, setError } = props;

    const [idInput, setIdInput] = useState('')
    const [searchHistory, setSearchHistory] = useState([]);
    const [useVanity, setUseVanity] = useState(true);

    const userSearcher = useFetchUserData(steamService);

    useEffect(() => {
        if (localStorage.getItem('SearchHistory') && localStorage.getItem('SearchHistory').length > 0) {
            setSearchHistory(localStorage.getItem('SearchHistory').split(','));
        }
    }, [])

    const SearchWithId = async () => {
        if (!idInput) return;
        if (idInput && idInput.length < 1) return;
        let storeHistory
        if (localStorage.getItem('SearchHistory') && localStorage.getItem('SearchHistory').length > 0) {
            let a = localStorage.getItem('SearchHistory').split(',');
            a.push(idInput);
            storeHistory = [...new Set(a)];
        } else {
            storeHistory = [idInput];
        }
        localStorage.setItem('SearchHistory', storeHistory);
        setSearchHistory(storeHistory);
        const userData = await userSearcher.fetchById(idInput, useVanity);
        if(userData.status < 1){
            setError("Unable to get data for that user.")
        } else {
            setError(undefined);
            setPlayerData(userData);
        }
    }

    return (
        <>
            <label htmlFor="history">Previous Search History:</label>
            <select defaultValue='' id="history"
                onChange={(e) => { setIdInput(e.target.value); }}>
                <option value="" disabled>Search History</option>
                {searchHistory.map((history) => {
                    return <option value={history}>{history}</option>
                })
                }
            </select>
            <button onClick={() => {
                localStorage.setItem('SearchHistory', []);
                setSearchHistory([]);
            }}
            >Clear History</button>
            <br /><br />
            <label htmlFor="history">Search For Steam User:</label>
            <span style={{width:"100%"}}>
            <input placeholder={useVanity ? "Vanity URL Name..." : "Raw Steam ID..."}
                onChange={(e) => { /* Set ID */ setIdInput(e.target.value) }}
                value={idInput}
            />
            
            <div className="Help-Icon tooltip">
                ?
                <span class="tooltiptext">
                    {useVanity && 
                    <>
                        This is name found at the end of your steam profile url.<br/>
                        For example: steamcommunity.com/id/ <b>bizzledapp</b>
                    </>
                    }
                    {!useVanity && 
                    <>
                        This ID is found at the end of your steam profile url.<br/>
                        For example: steamcommunity.com/profile/ <b>76561198114498812</b>
                    </>
                    }
                </span>
            </div>
            </span>
            <span>
            <input style={{width:"1rem", cursor: 'pointer'}}
            type="checkbox" 
            checked={useVanity} 
            onChange={() => {setUseVanity(!useVanity)}}
            name="Use Vanity Name"/>
            <label for="Use Vanity Name">Use Vanity Name</label>
            </span>
            <button onClick={() => { /* Run Search with ID */ SearchWithId(); }}>Search</button>
        </>
    )
}

export default AppSearch;