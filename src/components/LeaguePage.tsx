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
            <p >
                Start time: {new Date(LEAGUES[game][league].startTime * 1000).toUTCString()}
            </p>
            <p >
                End time: {new Date(LEAGUES[game][league].endTime * 1000).toUTCString()}
            </p>

            <p>
                {LEAGUES[game][league].endTime * 1000 < Date.now() ? "ALREADY FINISHED" : "NOT FINISHED YET"}
            </p>
        </div>
    )
};