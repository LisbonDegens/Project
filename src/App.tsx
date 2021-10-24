import logo from './logo.png';
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
          <Grid container spacing={2}>
            <Grid item>
              <Link to="/"><img src={logo} alt={'logo'} height={100} /></Link>
            </Grid>
            <Grid item>
              <Link to="/leagues"><Button style={{ fontSize: 20 }}>Leagues</Button></Link>
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
          <Route path="/">
            <b>WELCOME TO WTY </b>
            <Button variant='contained' onClick={() => setApproval()}>Set DAI approval</Button>
          </Route>
        </Switch>
      </div >
    </Router >
  );
}

export default App;
