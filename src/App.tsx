import longlogo from './longlogo.png';
import * as React from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LeagueGrid from './components/Leagues';
import LeaguePage from './components/LeaguePage';
import './App.css';
import Web3 from 'web3';
import { WTY_ADDRESS } from './components/LeaguePage';

const ERC20 = require("./abis/ERC20.json");

declare global {
  interface Window {
    ethereum: any;
  }
}


function App() {
  const [accounts, setAccounts] = React.useState([]);

  async function setApproval() {
    const web3 = new Web3(window.ethereum);
    const contractERC20 = new web3.eth.Contract(ERC20, "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063");

    await contractERC20.methods.approve(WTY_ADDRESS, "1000000000000000000000000000000000000").send({ from: accounts[0] });
  }

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

  return (
    <Router>
      <div className="App">
        <nav>
          <Grid container spacing={2}
            alignItems="center"
          >
            <Grid item>
              <Link to="/"><img src={longlogo} alt={'logo'} height={100} /></Link>
            </Grid>
            <Grid item>
              <Link to="/leagues" style={{ textDecoration: 'none' }}><Button style={{ fontSize: 20 }}>Pools</Button></Link>
            </Grid>
            <Grid item>
              <Link to="/account" style={{ textDecoration: 'none' }}><Button style={{ fontSize: 20 }}>Account</Button></Link>
            </Grid>
          </Grid>
        </nav>
        <Switch>
          <Route path="/leagues">
            <LeagueGrid />
          </Route>
          <Route path="/league/:league">
            <LeaguePage />
          </Route>
          <Route path="/account">
            <Grid container direction="column" spacing={2} style={{ padding: 30 }}>
              <Grid item>
                <b>My account is {accounts[0]}</b>
              </Grid >
              <Grid item>
                <Button variant='contained' onClick={() => setApproval()}>Set DAI approval</Button>
              </Grid >
            </Grid >
          </Route>
          <Route path="/">
            <div style={{ padding: 30 }}><b >WELCOME TO WTY </b></div>
          </Route>
        </Switch>
      </div >
    </Router >
  );
}

export default App;
