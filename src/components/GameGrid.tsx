import React from 'react';
import { Grid } from '@mui/material';
import GameCard from "./GameCard"

export interface Game { name: string, imageUrl: string };

const GAMES: Game[] = [
    { name: "susy baka", imageUrl: "https://c.tenor.com/zaWsgPmM9R4AAAAi/sussy-baka.gif" },
    { name: "decentraland", imageUrl: "https://media.thetab.com/blogs.dir/90/files/2021/05/screenshot-2021-05-04-at-113550.png" },
    { name: "big chungus", imageUrl: "https://i.pinimg.com/originals/e4/86/54/e4865466bbb16407f9778105cb21ecb5.jpg" },
];

export default function GameGrid() {
    return (
        <div>
            <h1>Games</h1>
            <Grid container spacing={2}>
                {GAMES.map((game: Game) =>
                    <Grid item xs={4} key={game.name}>
                        <GameCard game={game} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
};