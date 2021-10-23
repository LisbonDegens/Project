import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from 'web3'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LEAGUES } from "./Leagues";

const WTY = require("../abis/WTY.json");

declare let window: any;

const WTY_ADDRESS = "0x20040fd434e13A386042321260F7f03dff2FffF4";

async function deposit(leagueIndex: number, amount: number) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(WTY, WTY_ADDRESS);

    contract.methods.deposit(leagueIndex, amount).send({ from: "0xb19BC46C52A1352A071fe2389503B6FE1ABD50Ff" });
}

export default function LeaguePage() {
    let { game, league }: { game: string; league: string } = useParams();
    var [amount, setAmount]: any = useState(0);

    return (
        <div>
            <img height="140" src={LEAGUES[game][league].imageUrl} alt="hi" />
            <h1>{LEAGUES[game][league].name}</h1>
            <p>{LEAGUES[game][league].description}</p>
            {LEAGUES[game][league].endTime * 1000 >= Date.now() ? (
                <p style={{ color: 'green' }}>
                    End date: {new Date(LEAGUES[game][league].endTime * 1000).toUTCString()}
                </p>
            ) : <p style={{ color: 'red' }}>
                End date: {new Date(LEAGUES[game][league].endTime * 1000).toUTCString()} (finished)
            </p>
            }
            {
                LEAGUES[game][league].endTime * 1000 >= Date.now() ? (
                    <div>
                        <Grid container direction='column'>
                            <Grid item><TextField
                                label="Amount"
                                onChange={(e: any) => setAmount(e.target.value)}
                            />
                                <img height={50} alt={'DAI'} src="https://s2.coinmarketcap.com/static/img/coins/200x200/4943.png" />
                            </Grid>
                            <Grid item>
                                <Button variant='contained' onClick={() => deposit(LEAGUES[game][league].leagueIndex, amount)}>Deposit</Button>
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <div>
                        <Button variant='contained'>Withdraw</Button>
                    </div>
                )
            }
        </div >
    );
}
