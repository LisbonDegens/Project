import React from 'react';
import { Grid } from '@mui/material';
import GameCard from "./GameCard"
import {
    Link
} from "react-router-dom";

export interface Game { name: string, imageUrl: string };

const GAMES: Game[] = [
    { name: "MarioKart", imageUrl: "https://play-lh.googleusercontent.com/6I6-3DLAdsVuK2mimkq5eVAyIwgMrNOF7d_8Ow7TEkAgR-vE83rcrL1OUUub9NOjWA" },
    { name: "Decentraland", imageUrl: "https://media.thetab.com/blogs.dir/90/files/2021/05/screenshot-2021-05-04-at-113550.png" },
];

export default function GameGrid() {
    return (
        <div>
            <h1>Games</h1>
            <Grid container spacing={2}>
                {GAMES.map((game: Game) =>
                    <Grid item xs={4} key={game.name}>
                        <Link to={`/leagues/${game.name}`}><GameCard game={game} /></Link>
                    </Grid>
                )}
            </Grid>
        </div >
    )
};