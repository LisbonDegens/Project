import React from 'react';
import {
    useParams
} from "react-router-dom";
import { LEAGUES } from './Leagues';

export default function LeaguePage() {
    let { game, league }: { game: string, league: string } = useParams();

    return (
        <div>
            <img
                height="140"
                src={LEAGUES[game][league].imageUrl}
                alt="hi"
            />
            <h1 >
                {LEAGUES[game][league].name}
            </h1>
            <p >
                {LEAGUES[game][league].description}
            </p>
        </div>
    )
};