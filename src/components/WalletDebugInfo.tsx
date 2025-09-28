import { useWalletDetection } from '@/hooks/useWalletDetection';

const WalletDebugInfo = () => {
  const { availableWallets, isDetecting } = useWalletDetection();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Wallet Debug Info</h3>
      <div className="space-y-1">
        <div>Detecting: {isDetecting ? 'Yes' : 'No'}</div>
        <div>window.ethereum: {window.ethereum ? 'Yes' : 'No'}</div>
        <div>isMetaMask: {window.ethereum?.isMetaMask ? 'Yes' : 'No'}</div>
        <div>isCoinbaseWallet: {(window.ethereum as any)?.isCoinbaseWallet ? 'Yes' : 'No'}</div>
        <div>isCoinbaseWalletExtension: {(window.ethereum as any)?.isCoinbaseWalletExtension ? 'Yes' : 'No'}</div>
        <div>coinbaseWalletExtension: {(window as any).coinbaseWalletExtension ? 'Yes' : 'No'}</div>
        <div>isTrust: {window.ethereum?.isTrust ? 'Yes' : 'No'}</div>
        <div>isBraveWallet: {window.ethereum?.isBraveWallet ? 'Yes' : 'No'}</div>
        <div className="mt-2">
          <div className="font-semibold">Available Wallets:</div>
          {availableWallets.map(wallet => (
            <div key={wallet.id} className="ml-2">
              {wallet.icon} {wallet.name}: {wallet.isInstalled ? 'Installed' : 'Not Installed'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletDebugInfo;
