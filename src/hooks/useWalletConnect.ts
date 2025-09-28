import { useState, useEffect, useCallback } from 'react';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { toast } from 'sonner';
import { WalletInfo } from './useWalletDetection';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  provider: any;
  isLoading: boolean;
}

export const useWalletConnect = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
    isLoading: false,
  });

  const [provider, setProvider] = useState<any>(null);
  const [selectedWallet, setSelectedWallet] = useState<WalletInfo | null>(null);

  // Initialize WalletConnect provider
  useEffect(() => {
    const initProvider = async () => {
      try {
        // Use a fallback project ID if environment variable is not set
        const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || 'demo-project-id';
        
        const ethereumProvider = await EthereumProvider.init({
          projectId,
          chains: [1], // Ethereum mainnet
          showQrModal: true,
          metadata: {
            name: 'Carbon Pepe X Token Sale',
            description: 'Carbon Pepe X Token Presale Platform',
            url: window.location.origin,
            icons: [`${window.location.origin}/favicon.ico`],
          },
        });

        setProvider(ethereumProvider);

        // Set up event listeners
        ethereumProvider.on('connect', (connectInfo: any) => {
          console.log('WalletConnect connected:', connectInfo);
          setWalletState(prev => ({
            ...prev,
            isConnected: true,
            chainId: typeof connectInfo.chainId === 'string' ? parseInt(connectInfo.chainId, 16) : connectInfo.chainId,
            isLoading: false,
          }));
        });

        ethereumProvider.on('disconnect', () => {
          console.log('WalletConnect disconnected');
          setWalletState({
            isConnected: false,
            address: null,
            chainId: null,
            provider: null,
            isLoading: false,
          });
        });

        ethereumProvider.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletState(prev => ({
              ...prev,
              address: accounts[0],
            }));
          } else {
            setWalletState({
              isConnected: false,
              address: null,
              chainId: null,
              provider: null,
              isLoading: false,
            });
          }
        });

        ethereumProvider.on('chainChanged', (chainId: string) => {
          setWalletState(prev => ({
            ...prev,
            chainId: parseInt(chainId, 16),
          }));
        });

        // Check if already connected
        if (ethereumProvider.connected) {
          try {
            const accounts = await ethereumProvider.request({ method: 'eth_accounts' });
            const chainId = await ethereumProvider.request({ method: 'eth_chainId' });
            
            if (Array.isArray(accounts) && accounts.length > 0) {
              setWalletState({
                isConnected: true,
                address: accounts[0],
                chainId: parseInt(chainId as string, 16),
                provider: ethereumProvider,
                isLoading: false,
              });
            }
          } catch (error) {
            console.error('Failed to get existing connection:', error);
          }
        }

      } catch (error) {
        console.error('Failed to initialize WalletConnect:', error);
        // Don't show error toast on initialization failure
        // The user will see the error when they try to connect
      }
    };

    initProvider();
  }, []);

  const connectWithWallet = useCallback(async (wallet: WalletInfo) => {
    try {
      setWalletState(prev => ({ ...prev, isLoading: true }));
      setSelectedWallet(wallet);
      
      console.log(`Attempting to connect to ${wallet.name}...`);
      
      const walletProvider = await wallet.connector();
      console.log(`Wallet provider obtained for ${wallet.name}:`, walletProvider);
      
      // For WalletConnect, we need to handle it differently
      if (wallet.id === 'walletconnect') {
        // Set up WalletConnect event listeners
        walletProvider.on('connect', (connectInfo: any) => {
          console.log('WalletConnect connected:', connectInfo);
          setWalletState({
            isConnected: true,
            address: null, // Will be set by accounts event
            chainId: typeof connectInfo.chainId === 'string' ? parseInt(connectInfo.chainId, 16) : connectInfo.chainId,
            provider: walletProvider,
            isLoading: false,
          });
          toast.success('WalletConnect connected successfully!');
        });

        walletProvider.on('accountsChanged', (accounts: string[]) => {
          console.log('WalletConnect accounts changed:', accounts);
          if (accounts.length > 0) {
            setWalletState(prev => ({
              ...prev,
              address: accounts[0],
            }));
          }
        });

        walletProvider.on('disconnect', () => {
          console.log('WalletConnect disconnected');
          setWalletState({
            isConnected: false,
            address: null,
            chainId: null,
            provider: null,
            isLoading: false,
          });
        });

        // Trigger WalletConnect connection to show QR modal
        try {
          console.log('Triggering WalletConnect connection...');
          console.log('WalletConnect provider:', walletProvider);
          console.log('WalletConnect connected:', walletProvider.connected);
          
          // Check if already connected
          if (walletProvider.connected) {
            console.log('WalletConnect already connected');
            const accounts = await walletProvider.request({ method: 'eth_accounts' });
            const chainId = await walletProvider.request({ method: 'eth_chainId' });
            
            if (accounts.length > 0) {
              setWalletState({
                isConnected: true,
                address: accounts[0],
                chainId: parseInt(chainId as string, 16),
                provider: walletProvider,
                isLoading: false,
              });
              toast.success('WalletConnect connected successfully!');
              return;
            }
          }
          
          // Enable WalletConnect (this should show the QR modal)
          console.log('Enabling WalletConnect...');
          
          // Add retry logic for WalletConnect connection
          let retryCount = 0;
          const maxRetries = 3;
          
          while (retryCount < maxRetries) {
            try {
              await walletProvider.enable();
              break; // Success, exit retry loop
            } catch (error: any) {
              retryCount++;
              console.log(`WalletConnect enable attempt ${retryCount} failed:`, error.message);
              
              if (retryCount >= maxRetries) {
                throw error; // Re-throw the error if all retries failed
              }
              
              // Wait a bit before retrying
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
          
          // Get accounts after connection
          const accounts = await walletProvider.request({ method: 'eth_accounts' });
          const chainId = await walletProvider.request({ method: 'eth_chainId' });
          
          console.log('WalletConnect accounts after enable:', accounts);
          console.log('WalletConnect chainId after enable:', chainId);
          
          if (accounts.length > 0) {
            setWalletState({
              isConnected: true,
              address: accounts[0],
              chainId: parseInt(chainId as string, 16),
              provider: walletProvider,
              isLoading: false,
            });
            toast.success('WalletConnect connected successfully!');
          } else {
            // Connection initiated but no accounts yet
            setWalletState({
              isConnected: true,
              address: null,
              chainId: null,
              provider: walletProvider,
              isLoading: false,
            });
            toast.success('WalletConnect connection initiated! Please complete the connection in your wallet.');
          }
        } catch (error: any) {
          console.error('WalletConnect connection failed:', error);
          console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
          });
          
          if (error.code === 4001) {
            toast.error('User rejected the WalletConnect connection');
          } else if (error.message?.includes('User rejected')) {
            toast.error('Connection was cancelled');
          } else if (error.message?.includes('Failed to publish custom payload')) {
            toast.error('WalletConnect network error. Please try again or use a browser wallet.');
          } else if (error.message?.includes('Session not found')) {
            toast.error('WalletConnect session expired. Please try again.');
          } else {
            toast.error(`WalletConnect connection failed: ${error.message || 'Unknown error'}`);
          }
          setWalletState(prev => ({ ...prev, isLoading: false }));
        }
        return;
      }
      
      // For browser wallets, request accounts
      console.log('Requesting accounts from browser wallet...');
      const accounts = await walletProvider.request({ method: 'eth_requestAccounts' });
      console.log(`Accounts received:`, accounts);
      
      if (!Array.isArray(accounts) || accounts.length === 0) {
        throw new Error('No accounts returned from wallet');
      }
      
      const chainId = await walletProvider.request({ method: 'eth_chainId' });
      console.log(`Chain ID:`, chainId);
      
      setWalletState({
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId as string, 16),
        provider: walletProvider,
        isLoading: false,
      });
      toast.success(`${wallet.name} connected successfully!`);
      
    } catch (error: any) {
      console.error(`Failed to connect to ${wallet.name}:`, error);
      setWalletState(prev => ({ ...prev, isLoading: false }));
      
      if (error.code === 4001) {
        toast.error('User rejected the connection request');
      } else if (error.message?.includes('User rejected')) {
        toast.error('Connection was cancelled');
      } else if (error.message?.includes('not detected')) {
        toast.error(`${wallet.name} is not installed. Please install it first.`);
      } else if (error.message?.includes('No accounts returned')) {
        toast.error('No accounts available. Please unlock your wallet and try again.');
      } else {
        toast.error(`Failed to connect to ${wallet.name}: ${error.message || 'Unknown error'}`);
      }
    }
  }, []);

  const connectWallet = useCallback(async () => {
    // This is now just a fallback - the main connection should go through connectWithWallet
    toast.info('Please select a wallet from the list');
  }, []);

  const disconnectWallet = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
      setWalletState({
        isConnected: false,
        address: null,
        chainId: null,
        provider: null,
        isLoading: false,
      });
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  }, [provider]);

  const switchNetwork = useCallback(async (chainId: number) => {
    if (!provider) return;

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, try to add it
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Ethereum',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://mainnet.infura.io/v3/'],
              blockExplorerUrls: ['https://etherscan.io'],
            }],
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
          toast.error('Failed to switch network');
        }
      } else {
        console.error('Failed to switch network:', error);
        toast.error('Failed to switch network');
      }
    }
  }, [provider]);

  const getBalance = useCallback(async (address: string) => {
    if (!provider) return null;

    try {
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      return balance;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return null;
    }
  }, [provider]);

  return {
    ...walletState,
    connectWallet,
    connectWithWallet,
    disconnectWallet,
    switchNetwork,
    getBalance,
    selectedWallet,
  };
};
