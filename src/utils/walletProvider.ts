// Wallet Provider Isolation Utility
// This ensures each wallet connects to its specific provider

export const getWalletProvider = (walletId: string) => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Ethereum provider found');
  }

  // If there are multiple providers, find the specific one
  if ((window.ethereum as any).providers && Array.isArray((window.ethereum as any).providers)) {
    const providers = (window.ethereum as any).providers;
    
    switch (walletId) {
      case 'metamask':
        const metaMaskProvider = providers.find((provider: any) => provider.isMetaMask);
        if (metaMaskProvider) {
          console.log('Found MetaMask in providers array');
          return metaMaskProvider;
        }
        break;
      case 'coinbase':
        const coinbaseProvider = providers.find((provider: any) => 
          provider.isCoinbaseWallet || 
          provider.isCoinbaseWalletExtension ||
          provider.isCoinbaseWalletApp
        );
        if (coinbaseProvider) {
          console.log('Found Coinbase Wallet in providers array');
          return coinbaseProvider;
        }
        break;
      case 'trust':
        const trustProvider = providers.find((provider: any) => provider.isTrust);
        if (trustProvider) {
          console.log('Found Trust Wallet in providers array');
          return trustProvider;
        }
        break;
      case 'brave':
        const braveProvider = providers.find((provider: any) => provider.isBraveWallet);
        if (braveProvider) {
          console.log('Found Brave Wallet in providers array');
          return braveProvider;
        }
        break;
    }
  }

  // Fallback to main provider if it matches the wallet type
  switch (walletId) {
    case 'metamask':
      if (window.ethereum.isMetaMask) {
        console.log('Using main provider for MetaMask');
        return window.ethereum;
      }
      break;
    case 'coinbase':
      if ((window.ethereum as any).isCoinbaseWallet || 
          (window.ethereum as any).isCoinbaseWalletExtension ||
          (window.ethereum as any).isCoinbaseWalletApp) {
        console.log('Using main provider for Coinbase Wallet');
        return window.ethereum;
      }
      break;
    case 'trust':
      if ((window.ethereum as any).isTrust) {
        console.log('Using main provider for Trust Wallet');
        return window.ethereum;
      }
      break;
    case 'brave':
      if ((window.ethereum as any).isBraveWallet) {
        console.log('Using main provider for Brave Wallet');
        return window.ethereum;
      }
      break;
  }

  // If no specific provider found, use the main one
  console.log(`Using main provider for ${walletId}`);
  return window.ethereum;
};

export const isWalletInstalled = (walletId: string): boolean => {
  if (typeof window === 'undefined' || !window.ethereum) {
    return false;
  }

  // Check providers array first
  if ((window.ethereum as any).providers && Array.isArray((window.ethereum as any).providers)) {
    const providers = (window.ethereum as any).providers;
    
    switch (walletId) {
      case 'metamask':
        return providers.some((provider: any) => provider.isMetaMask);
      case 'coinbase':
        return providers.some((provider: any) => 
          provider.isCoinbaseWallet || 
          provider.isCoinbaseWalletExtension ||
          provider.isCoinbaseWalletApp
        );
      case 'trust':
        return providers.some((provider: any) => provider.isTrust);
      case 'brave':
        return providers.some((provider: any) => provider.isBraveWallet);
    }
  }

  // Check main provider
  switch (walletId) {
    case 'metamask':
      return window.ethereum.isMetaMask;
    case 'coinbase':
      return !!(window.ethereum as any).isCoinbaseWallet || 
             !!(window.ethereum as any).isCoinbaseWalletExtension ||
             !!(window.ethereum as any).isCoinbaseWalletApp;
    case 'trust':
      return !!(window.ethereum as any).isTrust;
    case 'brave':
      return !!(window.ethereum as any).isBraveWallet;
  }

  return false;
};
