import { useState, useEffect } from 'react';
import { getWalletProvider, isWalletInstalled } from '@/utils/walletProvider';

export interface WalletInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  isInstalled: boolean;
  downloadUrl?: string;
  connector: () => Promise<any>;
}

export const useWalletDetection = () => {
  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectWallets = () => {
      console.log('Detecting wallets...');
      console.log('window.ethereum:', window.ethereum);
      console.log('isMetaMask:', window.ethereum?.isMetaMask);
      console.log('isCoinbaseWallet:', (window.ethereum as any)?.isCoinbaseWallet);
      console.log('isTrust:', (window.ethereum as any)?.isTrust);
      console.log('isBraveWallet:', (window.ethereum as any)?.isBraveWallet);
      
      // Check for Coinbase Wallet in different ways
      const isCoinbaseWallet = (window.ethereum as any)?.isCoinbaseWallet || 
                              (window.ethereum as any)?.isCoinbaseWalletExtension ||
                              (window.ethereum as any)?.isCoinbaseWalletApp ||
                              (window.ethereum as any)?.providers?.some((provider: any) => provider.isCoinbaseWallet) ||
                              // Check if Coinbase Wallet is the primary provider
                              (window.ethereum && (window.ethereum as any).constructor?.name?.includes('CoinbaseWallet')) ||
                              // Check for Coinbase Wallet in window object
                              !!(window as any).coinbaseWalletExtension;
      
      console.log('Coinbase detection methods:', {
        isCoinbaseWallet: (window.ethereum as any)?.isCoinbaseWallet,
        isCoinbaseWalletExtension: (window.ethereum as any)?.isCoinbaseWalletExtension,
        isCoinbaseWalletApp: (window.ethereum as any)?.isCoinbaseWalletApp,
        providers: (window.ethereum as any)?.providers,
        final: isCoinbaseWallet
      });
      
      const wallets: WalletInfo[] = [
        // MetaMask
        {
          id: 'metamask',
          name: 'MetaMask',
          icon: '🦊',
          description: 'Connect using MetaMask browser extension',
          isInstalled: isWalletInstalled('metamask'),
          downloadUrl: 'https://metamask.io/download/',
          connector: async () => {
            const provider = getWalletProvider('metamask');
            console.log('MetaMask provider obtained:', provider);
            return provider;
          }
        },
        // Coinbase Wallet
        {
          id: 'coinbase',
          name: 'Coinbase Wallet',
          icon: '🔵',
          description: 'Connect using Coinbase Wallet',
          isInstalled: isWalletInstalled('coinbase'),
          downloadUrl: 'https://www.coinbase.com/wallet',
          connector: async () => {
            const provider = getWalletProvider('coinbase');
            console.log('Coinbase Wallet provider obtained:', provider);
            return provider;
          }
        },
        // Trust Wallet
        {
          id: 'trust',
          name: 'Trust Wallet',
          icon: '⚡',
          description: 'Connect using Trust Wallet',
          isInstalled: isWalletInstalled('trust'),
          downloadUrl: 'https://trustwallet.com/',
          connector: async () => {
            const provider = getWalletProvider('trust');
            console.log('Trust Wallet provider obtained:', provider);
            return provider;
          }
        },
        // Brave Wallet
        {
          id: 'brave',
          name: 'Brave Wallet',
          icon: '🦁',
          description: 'Connect using Brave browser wallet',
          isInstalled: isWalletInstalled('brave'),
          downloadUrl: 'https://brave.com/wallet/',
          connector: async () => {
            const provider = getWalletProvider('brave');
            console.log('Brave Wallet provider obtained:', provider);
            return provider;
          }
        },
        // WalletConnect (always available)
        {
          id: 'walletconnect',
          name: 'WalletConnect',
          icon: '🔗',
          description: 'Connect using WalletConnect protocol',
          isInstalled: true,
          connector: async () => {
            // Add process polyfill for WalletConnect
            if (typeof window !== 'undefined' && !window.process) {
              (window as any).process = { env: {} };
            }
            
            const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
            
            // Use a valid project ID or create a demo one
            const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '2f05a7f4c39a5c0b8b8b8b8b8b8b8b8b8';
            
            console.log('Initializing WalletConnect with project ID:', projectId);
            console.log('WalletConnect environment:', {
              projectId,
              isProduction: process.env.NODE_ENV === 'production',
              origin: window.location.origin
            });
            
            // Try a simpler configuration first
            try {
              return await EthereumProvider.init({
                projectId,
                chains: [1],
                showQrModal: true,
                metadata: {
                  name: 'Carbon Pepe X Token Sale',
                  description: 'Carbon Pepe X Token Presale Platform',
                  url: window.location.origin,
                  icons: [`${window.location.origin}/favicon.ico`],
                }
              });
            } catch (error) {
              console.warn('Simple WalletConnect config failed, trying with RPC map:', error);
              
              // Fallback with RPC configuration
              return await EthereumProvider.init({
                projectId,
                chains: [1],
                showQrModal: true,
                optionalChains: [137, 56, 43114],
                rpcMap: {
                  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                  137: 'https://polygon-rpc.com',
                  56: 'https://bsc-dataseed.binance.org',
                  43114: 'https://api.avax.network/ext/bc/C/rpc'
                },
                metadata: {
                  name: 'Carbon Pepe X Token Sale',
                  description: 'Carbon Pepe X Token Presale Platform',
                  url: window.location.origin,
                  icons: [`${window.location.origin}/favicon.ico`],
                },
                qrModalOptions: {
                  themeMode: 'dark',
                  themeVariables: {
                    '--wcm-z-index': '1000'
                  }
                }
              });
            }
          }
        }
      ];

      // Only add Browser Wallet if no specific wallet is detected
      const hasSpecificWallet = wallets.some(wallet => wallet.isInstalled && wallet.id !== 'walletconnect');
      if (!hasSpecificWallet && window.ethereum) {
        wallets.push({
          id: 'browser',
          name: 'Browser Wallet',
          icon: '🌐',
          description: 'Connect using any browser wallet',
          isInstalled: true,
          connector: async () => {
            if (window.ethereum) {
              return window.ethereum;
            }
            throw new Error('No browser wallet detected');
          }
        });
      }

      console.log('Detected wallets:', wallets.map(w => ({ name: w.name, isInstalled: w.isInstalled })));
      setAvailableWallets(wallets);
      setIsDetecting(false);
    };

    detectWallets();
  }, []);

  return {
    availableWallets,
    isDetecting,
    refreshWallets: () => {
      setIsDetecting(true);
      setTimeout(() => {
        // Check for Coinbase Wallet in different ways
        const isCoinbaseWallet = (window.ethereum as any)?.isCoinbaseWallet || 
                                (window.ethereum as any)?.isCoinbaseWalletExtension ||
                                (window.ethereum as any)?.isCoinbaseWalletApp ||
                                (window.ethereum as any)?.providers?.some((provider: any) => provider.isCoinbaseWallet) ||
                                // Check if Coinbase Wallet is the primary provider
                                (window.ethereum && (window.ethereum as any).constructor?.name?.includes('CoinbaseWallet')) ||
                                // Check for Coinbase Wallet in window object
                                !!(window as any).coinbaseWalletExtension;
        
        const wallets: WalletInfo[] = [
          {
            id: 'metamask',
            name: 'MetaMask',
            icon: '🦊',
            description: 'Connect using MetaMask browser extension',
            isInstalled: isWalletInstalled('metamask'),
            downloadUrl: 'https://metamask.io/download/',
            connector: async () => {
              const provider = getWalletProvider('metamask');
              console.log('MetaMask provider obtained:', provider);
              return provider;
            }
          },
          {
            id: 'coinbase',
            name: 'Coinbase Wallet',
            icon: '🔵',
            description: 'Connect using Coinbase Wallet',
            isInstalled: isWalletInstalled('coinbase'),
            downloadUrl: 'https://www.coinbase.com/wallet',
            connector: async () => {
              const provider = getWalletProvider('coinbase');
              console.log('Coinbase Wallet provider obtained:', provider);
              return provider;
            }
          },
          {
            id: 'trust',
            name: 'Trust Wallet',
            icon: '⚡',
            description: 'Connect using Trust Wallet',
            isInstalled: isWalletInstalled('trust'),
            downloadUrl: 'https://trustwallet.com/',
            connector: async () => {
              const provider = getWalletProvider('trust');
              console.log('Trust Wallet provider obtained:', provider);
              return provider;
            }
          },
          {
            id: 'brave',
            name: 'Brave Wallet',
            icon: '🦁',
            description: 'Connect using Brave browser wallet',
            isInstalled: isWalletInstalled('brave'),
            downloadUrl: 'https://brave.com/wallet/',
            connector: async () => {
              const provider = getWalletProvider('brave');
              console.log('Brave Wallet provider obtained:', provider);
              return provider;
            }
          },
          {
            id: 'walletconnect',
            name: 'WalletConnect',
            icon: '🔗',
            description: 'Connect using WalletConnect protocol',
            isInstalled: true,
            connector: async () => {
              // Add process polyfill for WalletConnect
              if (typeof window !== 'undefined' && !window.process) {
                (window as any).process = { env: {} };
              }
              
              const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
              
              // Use a valid project ID or create a demo one
              const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '2f05a7f4c39a5c0b8b8b8b8b8b8b8b8b8';
              
              console.log('Initializing WalletConnect with project ID:', projectId);
              
              // Try a simpler configuration first
              try {
                return await EthereumProvider.init({
                  projectId,
                  chains: [1],
                  showQrModal: true,
                  metadata: {
                    name: 'Carbon Pepe X Token Sale',
                    description: 'Carbon Pepe X Token Presale Platform',
                    url: window.location.origin,
                    icons: [`${window.location.origin}/favicon.ico`],
                  }
                });
              } catch (error) {
                console.warn('Simple WalletConnect config failed, trying with RPC map:', error);
                
                // Fallback with RPC configuration
                return await EthereumProvider.init({
                  projectId,
                  chains: [1],
                  showQrModal: true,
                  optionalChains: [137, 56, 43114],
                  rpcMap: {
                    1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                    137: 'https://polygon-rpc.com',
                    56: 'https://bsc-dataseed.binance.org',
                    43114: 'https://api.avax.network/ext/bc/C/rpc'
                  },
                  metadata: {
                    name: 'Carbon Pepe X Token Sale',
                    description: 'Carbon Pepe X Token Presale Platform',
                    url: window.location.origin,
                    icons: [`${window.location.origin}/favicon.ico`],
                  },
                  qrModalOptions: {
                    themeMode: 'dark',
                    themeVariables: {
                      '--wcm-z-index': '1000'
                    }
                  }
                });
              }
            }
          }
        ];

        // Only add Browser Wallet if no specific wallet is detected
        const hasSpecificWallet = wallets.some(wallet => wallet.isInstalled && wallet.id !== 'walletconnect');
        if (!hasSpecificWallet && window.ethereum) {
          wallets.push({
            id: 'browser',
            name: 'Browser Wallet',
            icon: '🌐',
            description: 'Connect using any browser wallet',
            isInstalled: true,
            connector: async () => {
              if (window.ethereum) {
                return window.ethereum;
              }
              throw new Error('No browser wallet detected');
            }
          });
        }

        setAvailableWallets(wallets);
        setIsDetecting(false);
      }, 500);
    }
  };
};
