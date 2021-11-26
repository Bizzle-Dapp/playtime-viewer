import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const GameStats = ({ games }) => {
    const [stats, setStats] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // useEffect(() => {
    //     console.log(games)
    // }, [games])

    useEffect(() => {
        setLoading(true);
        if (games && games.length > 0) {
            processGamesToStats(games);
            setLoading(false);
        }
    }, [games]);

    const processGamesToStats = () => {
        const processedStats = {
            LessOne: [],
            OneToFive: [],
            FiveToTwenty: [],
            TwentyToHundred: [],
            HundredToFiveHundred: [],
            FiveHundredPlus: []
        }

        games.forEach(game => {
            if ((Number(game.playtime_forever) / 60) < 1) {
                processedStats.LessOne.push(game);
            } else if ((Number(game.playtime_forever) / 60) < 5) {
                processedStats.OneToFive.push(game);
            } else if ((Number(game.playtime_forever) / 60) < 20) {
                processedStats.FiveToTwenty.push(game);
            } else if ((Number(game.playtime_forever) / 60) < 100) {
                processedStats.TwentyToHundred.push(game);
            } else if ((Number(game.playtime_forever) / 60) < 500) {
                processedStats.HundredToFiveHundred.push(game);
            } else {
                processedStats.FiveHundredPlus.push(game);
            }
        });
        setStats(processedStats);
    }


    const segmentClick = (e) => {
        console.log(e.target.value)
    }

    useEffect(() => {
        if (stats) {
            setData([
                {
                    title: '< 1hr',
                    value: stats.LessOne.length,
                    color: '#AFFF33',
                },
                {
                    title: '1hr - 5hr',
                    value: stats.OneToFive.length,
                    color: '#D9FF33',
                },
                {
                    title: '5hr - 20hr',
                    value: stats.FiveToTwenty.length,
                    color: '#F8FF33',
                },
                {
                    title: '20hr - 100hr',
                    value: stats.TwentyToHundred.length,
                    color: '#FFC933',
                },
                {
                    title: '100hr - 500hr',
                    value: stats.HundredToFiveHundred.length,
                    color: '#FFA233',
                },
                {
                    title: '> 500hr',
                    value: stats.FiveHundredPlus.length,
                    color: '#FF6933',
                },
            ]);
        }
    }, [stats])

    const conditionalRender = () => {
        if (loading) {
            return (
                <>
                    <h3>Loading Game Stats...</h3>
                </>
            )
        } else {
            return (
                <>
                    <h3>Playtime Stats:</h3>
                    <p>Total Games: {games.length}</p>
                    <PieChart
                        className="Pie-Chart"
                        lineWidth={60}
                        paddingAngle={3}
                        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                        labelStyle={{
                            fontSize: '0.25rem',
                            fill: 'rgb(165, 40, 127)',
                            textShadow: '1px 0.5px 2.5px rgb(252, 252, 253)',
                            fontWeight: 'bold'
                        }}
                        labelPosition={90}
                        data={data}
                        animate
                        onClick={(event, index) => {
                            console.log('Segment:', stats[Object.keys(stats)[index]]);
                          }}
                    />
                    <br />
                    <div className="Pie-Chart-Key">
                        {data.map(d => {
                            return (
                            <div 
                                className="Pie-Chart-Key-Entry"
                                style={{background: d.color}}
                            >
                                {d.title}
                            </div>
                            )
                        })}
                    </div>
                    <br />
                </>
            )
        }
    }

    return (
        conditionalRender()
    )
}

export default GameStats;