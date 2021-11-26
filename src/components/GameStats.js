import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const GameStats = ({ games }) => {
    const [stats, setStats] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [hovered, setHovered] = useState(undefined);

    useEffect(() => {
        setLoading(true);
        if (games && games.length > 0) {
            (function (){
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
            })();
            setLoading(false);
        }
    }, [games]);

    const segmentClick = (e, index) => {
        console.log('Segment:', stats[Object.keys(stats)[index]]);
    }

    useEffect(() => {
        if (stats) {
            setData([
                {
                    title: '< 1hr',
                    value: stats.LessOne.length,
                    color: hovered === 0 ? 'grey' : '#AFFF33',
                },
                {
                    title: '1hr - 5hr',
                    value: stats.OneToFive.length,
                    color: hovered === 1 ? 'grey' : '#D9FF33',
                },
                {
                    title: '5hr - 20hr',
                    value: stats.FiveToTwenty.length,
                    color: hovered === 2 ? 'grey' : '#F8FF33',
                },
                {
                    title: '20hr - 100hr',
                    value: stats.TwentyToHundred.length,
                    color: hovered === 3 ? 'grey' : '#FFC933',
                },
                {
                    title: '100hr - 500hr',
                    value: stats.HundredToFiveHundred.length,
                    color: hovered === 4 ? 'grey' : '#FFA233',
                },
                {
                    title: '> 500hr',
                    value: stats.FiveHundredPlus.length,
                    color: hovered === 5 ? 'grey' : '#FF6933',
                },
            ]);
        }
    }, [stats, hovered])

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
                            fontWeight: 'bold',

                        }}
                        segmentsStyle={{
                            transition: 'stroke .3s',
                        }}
                        labelPosition={90}
                        data={data}
                        animate
                        onClick={(event, index) => {
                            segmentClick(event, index);
                        }}
                        onMouseOver={(_, index) => {
                            setHovered(index);
                        }}
                        onMouseOut={() => {
                            setHovered(undefined);
                        }}
                    />
                    <br />
                    <div className="Pie-Chart-Key">
                        {data.map(d => {
                            return (
                                <div
                                    className="Pie-Chart-Key-Entry"
                                    style={{ background: d.color }}
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