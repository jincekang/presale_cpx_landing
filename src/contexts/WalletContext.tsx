import React, { createContext, useContext, ReactNode } from 'react';
import { useWalletConnect } from '@/hooks/useWalletConnect';
import { WalletInfo } from '@/hooks/useWalletDetection';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  provider: any;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  connectWithWallet: (wallet: WalletInfo) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;
  getBalance: (address: string) => Promise<string | null>;
  selectedWallet: WalletInfo | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const walletConnect = useWalletConnect();

  return (
    <WalletContext.Provider value={walletConnect}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
