import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { League } from './Leagues';

interface LeagueCardProps { league: League };

export default function LeagueCard(props: LeagueCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={props.league.imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.league.actualName}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {Math.round(props.league.prize * 100) / 100} {props.league.currencySymbol} prize
                </Typography>
            </CardContent>
        </Card>

    );
}