import React, { useEffect, useState, useCallback } from "react";

import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { Typography } from "@material-ui/core";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    1337, // local
  ],
});

const Wallet = () => {
  // Get ethereum wallet info
  const { account, activate, active } = useWeb3React();
  useEffect(() => {
    activate(injectedConnector);
  });
  if (!active) {
    return (
      <Typography variant="body2" color="textSecondary" component="p">
        {"Cannot connect to ethereum network."}
      </Typography>
    );
  }

  return (
    <Typography variant="body2" color="textSecondary" component="p">
      <div>Account: {account}</div>
    </Typography>
  );
};

export default Wallet;
