import logo from './WTYFull.png';
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
import MetaMaskOnboarding from "@metamask/onboarding";
import { textAlign } from '@mui/system';

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

const ERC20 = require("./abis/ERC20.json");

declare global {
  interface Window {
    ethereum: any;
  }
}


function App() {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef<MetaMaskOnboarding>();

  async function setApproval() {
    const web3 = new Web3(window.ethereum);
    const contractERC20 = new web3.eth.Contract(ERC20, "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063");

    await contractERC20.methods.approve(WTY_ADDRESS, "1000000000000000000000000000000000000").send({ from: accounts[0] });
  }

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        if (onboarding.current) {
          onboarding.current.stopOnboarding();
        }
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts: React.SetStateAction<never[]>) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts: React.SetStateAction<never[]>) =>
          setAccounts(newAccounts)
        );
    } else {
      if (onboarding.current) {
        onboarding.current.startOnboarding();
      }
    }
  };

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
      <div>
        <nav>
              <Link to="/"><img src={logo} alt={'logo'} height={100} /></Link>
              <Link to="/leagues"><Button style={{ fontSize: 20 }}>Leagues</Button></Link>
              <Button variant='contained' onClick={() => setApproval()}>Set DAI approval</Button>
              <Button disabled={isDisabled} onClick={onClick}>{buttonText}</Button> 

        </nav>
        <Switch>
          <Route path="/leagues">
            <LeagueGrid />
          </Route>
          <Route path="/league/:league">
            <LeaguePage />
          </Route>
          <Route path="/">
            <header>Welcome to WTY, connect to your MetaMask wallet to interact with our site. Once connected, must give us approval to depost DAI</header>
          </Route>
        </Switch>
      </div >
    </Router >
  );
}

export default App;
