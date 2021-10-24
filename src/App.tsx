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
import GameGrid from './components/Games';
import LeagueGrid from './components/Leagues';
import LeaguePage from './components/LeaguePage';
import './App.css';

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [accounts, setAccounts] = React.useState([]);

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
              <Link to="/"><img src={logo} height={100} /></Link>
            </Grid>
            <Grid item>
              <Link to="/games"><Button style={{ fontSize: 20 }}>Games</Button></Link>
            </Grid>
          </Grid>
        </nav>
        <Switch>
          <Route path="/games">
            <GameGrid />
          </Route>
          <Route path="/leagues/:game">
            <LeagueGrid />
          </Route>
          <Route path="/league/:game/:league">
            <LeaguePage />
          </Route>
          <Route path="/">
            <b>WELCOME TO WTY </b>
            <p>your account {accounts[0]}</p>
          </Route>
        </Switch>
      </div >
    </Router >
  );
}

export default App;
