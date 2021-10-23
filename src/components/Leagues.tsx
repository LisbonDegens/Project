import React from 'react';
import { Grid } from '@mui/material';
import LeagueCard from "./LeagueCard";
import {
    useParams,
    Link
} from "react-router-dom";

export interface League { name: string, imageUrl: string };

export const LEAGUES: { [game: string]: { [league: string]: League } } = {
    "MarioKart": {
        "BananaCup":
            { name: "BananaCup", imageUrl: "http://pm1.narvii.com/6277/b28b28dcae8749c7dafb9301445fef4d119771dc_00.jpg" },
        'ShellCup': { name: "ShellCup", imageUrl: "https://mario.wiki.gallery/images/3/3a/Mario_Kart_8_-_Shell_Cup_logo.svg" },
    },
    "Decentraland": {
        "SomeCompetition": { name: "SomeCompetition", imageUrl: "https://pbs.twimg.com/media/Eo4fNcWWMAEiMuW.jpg:large" },
    }
};

export default function LeagueGrid() {
    let { game }: { game: string } = useParams();

    return (
        <div>
            <h1>Leagues</h1>
            <Grid container spacing={2}>
                {Object.keys(LEAGUES[game]).map((key: string) =>
                    <Grid item xs={4} key={LEAGUES[game][key].name}>
                        <Link to={`/league/${game}/${LEAGUES[game][key].name}`}><LeagueCard league={LEAGUES[game][key]} /></Link>
                    </Grid>
                )}
            </Grid>
        </div>
    )
};