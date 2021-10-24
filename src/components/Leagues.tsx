import React from "react";
import { Grid } from "@mui/material";
import LeagueCard from "./LeagueCard";
import { Link } from "react-router-dom";

export interface League {
    name: string;
    description: string;
    imageUrl: string;
    endTime: number;
    leagueIndex: number;
}

export const LEAGUES: { [league: string]: League } = {
    BananaCup: {
        name: "BananaCup",
        description:
            "The Banana Cup is the second retro cup and sixth overall cup in Mario Kart Wii. It includes N64 Shebet Land, GBA Shy Guy Beach, DS Delfino Square, and GCN Waluigi Stadium. It has a normal difficulty.",
        imageUrl:
            "http://pm1.narvii.com/6277/b28b28dcae8749c7dafb9301445fef4d119771dc_00.jpg",
        endTime: 1635324080,
        leagueIndex: 0,
    },
    ShellCup: {
        name: "ShellCup",
        imageUrl:
            "https://mario.wiki.gallery/images/3/3a/Mario_Kart_8_-_Shell_Cup_logo.svg",
        description:
            "The Shell Cup is a representation of four cups introduced in Mario Kart DS, each of which consists of four races taken from the previous Mario Kart games. Shell Cup's symbol is a Green Shell and it features courses from previous Mushroom Cups and Flower Cups. The courses are usually quick and simple with little hazards. It is the first of the four Retro Cups. The cup's length and difficulty is on par with the Mushroom Cup.",
        endTime: 1635331956,
        leagueIndex: 1,
    },
    SomeCompetition: {
        name: "SomeCompetition",
        imageUrl: "https://pbs.twimg.com/media/Eo4fNcWWMAEiMuW.jpg:large",
        description: "some decentraland competition",
        endTime: 1635021856,
        leagueIndex: 2,
    },
};

export default function LeagueGrid() {

    return (
        <div>
            <h1>Leagues</h1>
            <Grid container spacing={2}>
                {Object.keys(LEAGUES).map((key: string) => (
                    <Grid item xs={4} key={LEAGUES[key].name}>
                        <Link to={`/league/${LEAGUES[key].name}`}>
                            <LeagueCard league={LEAGUES[key]} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
