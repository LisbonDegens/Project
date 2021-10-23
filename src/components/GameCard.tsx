import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Game } from './Games';

interface GameCardProps { game: Game };

export default function GameCard(props: GameCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={props.game.imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.game.name}
                </Typography>
            </CardContent>
        </Card>

    );
}