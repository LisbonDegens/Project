import React from 'react';
import { Grid } from '@mui/material';
import LeagueCard from "./LeagueCard";
import {
    useParams
} from "react-router-dom";

export interface League { name: string, imageUrl: string };

const LEAGUES: { [game: string]: League[] } = {
    "MarioKart": [
        { name: "Banana Cup", imageUrl: "http://pm1.narvii.com/6277/b28b28dcae8749c7dafb9301445fef4d119771dc_00.jpg" },
        { name: "Shell Cup", imageUrl: "https://mario.wiki.gallery/images/3/3a/Mario_Kart_8_-_Shell_Cup_logo.svg" },
    ],
    "Decentraland": [
        { name: "some competition", imageUrl: "https://pbs.twimg.com/media/Eo4fNcWWMAEiMuW.jpg:large" },
    ]
};

export default function LeagueGrid() {
    let { game }: { game: string } = useParams();

    return (
        <div>
            <h1>Leagues</h1>
            <Grid container spacing={2}>
                {LEAGUES[game].map((league: League) =>
                    <Grid item xs={4} key={league.name}>
                        <LeagueCard league={league} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
};