import React, { useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    1337, // local
  ],
});

function getLibrary (provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React();
  useEffect(() => {
    activate(injectedConnector);
  });

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      <div>Active: {active}</div>
      {active ? (
        <div> Done </div>
      ) : null }
    </div>
  );
};

export const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
    </Web3ReactProvider>
  );
};

export default App;
