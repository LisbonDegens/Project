import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from 'web3'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LEAGUES } from "./Leagues";

const WTY = require("../abis/WTY.json");
const ERC20 = require("../abis/ERC20.json");

declare let window: any;

const WTY_ADDRESS = "0xa0348368A2732650A15324f29e69D71EB7737bf5";
const ATOKEN = "0x27F8D03b3a2196956ED754baDc28D73be8830A6e";



async function calculatePrize(leagueIndex: number) {
    const web3 = new Web3(window.ethereum);
    const contractERC20 = new web3.eth.Contract(ERC20, ATOKEN);
    const contractWTY = new web3.eth.Contract(WTY, WTY_ADDRESS);

    const balance = await contractERC20.methods.balanceOf(WTY_ADDRESS).call();
    const totalStake = await contractWTY.methods.getTotalStake(leagueIndex).call();

    return balance - totalStake;
}



const DECIMALS = 18;

export default function LeaguePage() {
    let { league }: { league: string } = useParams();
    var [accounts, setAccounts] = React.useState([]);

    var [amount, setAmount] = useState(0);
    var [prize, setPrize] = useState(0);

    React.useEffect(() => {
        function handleNewAccounts(newAccounts: React.SetStateAction<never[]>) {
            setAccounts(newAccounts);
        }
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(handleNewAccounts);
        window.ethereum.on("accountsChanged", handleNewAccounts);
        return () => {
            window.ethereum.off("accountsChanged", handleNewAccounts);
        };
    }, []);

    async function setApproval() {
        const web3 = new Web3(window.ethereum);
        const contractERC20 = new web3.eth.Contract(ERC20, "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063");

        await contractERC20.methods.approve(WTY_ADDRESS, "1000000000000000000000000000000000000").send({ from: accounts[0] });
    }

    async function withdraw(leagueIndex: number) {
        const web3 = new Web3(window.ethereum);
        const contractWTY = new web3.eth.Contract(WTY, WTY_ADDRESS);

        contractWTY.methods.withdraw(leagueIndex).send({ from: accounts[0] });
    }

    async function deposit(leagueIndex: number, amount: number) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(WTY, WTY_ADDRESS);

        contract.methods.deposit(leagueIndex, amount).send({ from: accounts[0] });
    }

    setInterval(() => {
        async function doIt() {
            setPrize(await calculatePrize(0));
        }
        doIt();
    }, 5000);


    return (
        <div>
            <img height="140" src={LEAGUES[league].imageUrl} alt="hi" />
            <h1>{LEAGUES[league].name}</h1>
            <h2>Prize: {prize / (10 ** DECIMALS)}</h2>
            <p>{LEAGUES[league].description}</p>
            {LEAGUES[league].endTime * 1000 >= Date.now() ? (
                <p style={{ color: 'green' }}>
                    End date: {new Date(LEAGUES[league].endTime * 1000).toUTCString()}
                </p>
            ) : <p style={{ color: 'red' }}>
                End date: {new Date(LEAGUES[league].endTime * 1000).toUTCString()} (finished)
            </p>
            }

            <Grid container direction='column' style={{ borderStyle: 'dotted' }}>
                <Grid item>
                    <TextField
                        label="Amount"
                        onChange={(e: any) => setAmount(e.target.value)}
                    />
                    <img height={40} alt={'DAI'} src="https://s2.coinmarketcap.com/static/img/coins/200x200/4943.png" />
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={() => deposit(LEAGUES[league].leagueIndex, amount)}>Deposit</Button>
                </Grid>
            </Grid>
            <Grid container direction='column' style={{ borderStyle: 'dotted', marginTop: 20 }}>
                <Grid item>
                    <p>You currently have FIXME DAI staked.</p>
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={() => withdraw(LEAGUES[league].leagueIndex)}>Withdraw</Button>
                </Grid>
            </Grid>
            <Button variant='contained' onClick={() => setApproval()}>Set approval</Button>

        </div >
    );
}
