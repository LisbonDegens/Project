import React from "react";
import { Grid } from "@mui/material";
import LeagueCard from "./LeagueCard";
import { Link } from "react-router-dom";

export interface League {
    name: string;
    actualName: string;
    description: string;
    imageUrl: string;
    currencySymbol: any;
    leagueIndex: number;
    prize: number;
}

export const LEAGUES: { [league: string]: League } = {
    RockPaperScissors: {
        name: "RockPaperScissors",
        actualName: "Rock Paper Scissors Tournament",
        description:
            "Join us for this historic Rock Paper Scissors match between Fraser Scott (0xb19BC46...), and Jake Galvin (0x75a0bB4...)!",
        imageUrl:
            "data:image/jpeg;base64,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",
        currencySymbol:
            <img height={20} alt={'DAI'} src="https://polygonscan.com/token/images/mcdDai_32.png" />,
        leagueIndex: 0,
        prize: 0.000014454394427392,
    },
    PolygonGalacticGrandPrix: {
        name: "PolygonGalacticGrandPrix",
        actualName: "Polygon Galactic Grand Prix",
        description:
            "Line up your spaceships during the galaxy's biggest competition. The 1st blockchain eSport event",
        imageUrl:
            "https://www.cometh.io/img/game-screenshot.44728598.png",
        currencySymbol:
            <img height={20} alt={'USDC'} src="https://polygonscan.com/token/images/centre-usdc_32.png" />,
        leagueIndex: 1,
        prize: 500,
    },
    AaveGotchiXPOctober: {
        name: "AaveGotchiXPOctober",
        actualName: "Highest AaveGotchi XP: October",
        description:
            "Aavegotchi is a DeFi-enabled crypto collectibles game developed by Singapore-based Pixelcraft Studios that allows players to stake Non-fungible tokens (NFTs) avatars with interest-generating tokens and interact with the Aavegotchi metaverse. It is a unique combination of Decentralized Finance (DeFi) and NFTs.            ",
        imageUrl:
            "https://aavegotchi.com/images/aavegotchi.png",
        currencySymbol:
            <img height={20} alt={'GHST'} src="https://polygonscan.com/token/images/aavegotchighst_32.png" />,
        leagueIndex: 2,
        prize: 10,
    },
    NeonDistrictLeague: {
        name: "NeonDistrictLeague",
        actualName: "Neon District League",
        description:
            "Neon District is the cyberpunk role-playing adventure and flagship franchise developed by Blockade Games.",
        imageUrl:
            "https://www.pdvg.it/wp-content/uploads/2019/10/Neon_District.jpg",
        currencySymbol:
            <img height={20} alt={'DAI'} src="https://polygonscan.com/token/images/mcdDai_32.png" />,
        leagueIndex: 3,
        prize: 100,
    },
    REVVRacingHalloweenFestival: {
        name: "REVVRacingHalloweenFestival",
        actualName: "REVVRacing Halloween Festival",
        description:
            "REVV Racing is the first original game title for REVV Motorsport blockchain gaming platform, utilizing NFTs for Play To Earn experience.",
        imageUrl:
            "https://dashboard-assets.dappradar.com/document/8141/revvracing-dapp-games-matic-logo-166x166_b8af4c69897d051cc43f2b982bd8ae8e.png",
        currencySymbol:
            <img height={20} alt={'USDC'} src="https://polygonscan.com/token/images/centre-usdc_32.png" />,
        leagueIndex: 4,
        prize: 50,
    },
    Arc8MostMatchesWonOctober: {
        name: "Arc8MostMatchesWonOctober",
        actualName: "Arc8 Most Matches Won: October",
        description:
            "Mobile Games - Crypto Rewards",
        imageUrl:
            "https://dashboard-assets.dappradar.com/document/9152/arc8bygamee-dapp-games-matic-image1_354df38f2b3d9ca4935d468f894ad91a.png",
        currencySymbol:
            <img height={20} alt={'USDC'} src="https://polygonscan.com/token/images/centre-usdc_32.png" />,
        leagueIndex: 5,
        prize: 25,
    },
};

export default function LeagueGrid() {

    return (
        <div >
            <h1 style={{ padding: 30, paddingBottom: 20 }}>Pools</h1>
            <Grid container spacing={2} style={{ padding: 30, border: 2, borderLeft: 0, borderRight: 0, borderBottom: 0, borderStyle: 'solid' }} >
                {Object.keys(LEAGUES).map((key: string) => (
                    <Grid item xs={3} key={LEAGUES[key].name}>
                        <Link style={{ textDecoration: 'none' }} to={`/league/${LEAGUES[key].name}`}>
                            <LeagueCard league={LEAGUES[key]} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
