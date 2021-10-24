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
            <p>your account {accounts[0]}</p>
          </Route>
        </Switch>
      </div >
    </Router >
  );
}

export default App;
