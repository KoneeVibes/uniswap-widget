import './App.css';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react';

function App() {
  const API_KEY = "API_KEY";
  const jsonRPCEndpoint = `https://mainnet.infura.io/v3/${API_KEY}`;
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(jsonRPCEndpoint);
  const [account, setAccount] = useState({
    address: '',
    provider: jsonRpcProvider,
  });
  const tokenList = "https://ipfs.io/ipns/tokens.uniswap.org"

  useEffect(() => {
    async function connectWallet() {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider && ethereumProvider.request) {
        await ethereumProvider.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(ethereumProvider);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount({
          address: address,
          provider: provider,
        });
      } else {
        console.error('Please install MetaMask!');
      }
    }
    connectWallet();
  }, []);

  return (
    <div className="App">
      <SwapWidget
        provider={account.provider}
        tokenList={tokenList}
      />
    </div>
  );
}

export default App;
