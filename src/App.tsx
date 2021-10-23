import logo from './logo.png';
import React from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
          <Grid container direction="row">
            <Grid item>
              <Link to="/"><img alt={'logo'} src={logo} height={100} /></Link>
            </Grid>
            <Grid item>
              <Link to="/games"><Button style={{ fontSize: 20 }}>Games</Button></Link>
            </Grid>
          </Grid>
        </nav>
        <Switch>
          <Route path="/games">
            <b>there should be games here </b>
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
