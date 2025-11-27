import {useState} from 'react';
import {Button} from '@/shared/ui/kit/button.tsx';

export function ConnectWallet() {
    const [connected, setConnected] = useState(false);
    const mockAddress = "0xAbc...9Ff";

    return (
        <div className="flex items-center gap-3  pl-2 bg-gray-900 rounded-xl border border-gray-700 text-white w-fit">
            {connected ? (
                <>
                    <span className="text-green-400">●</span>
                    <span>{mockAddress}</span>
                    <Button
                        className="px-3 py-1 bg-gray-700 rounded-lg"
                        onClick={() => setConnected(false)}
                    >
                        Disconnect
                    </Button>
                </>
            ) : (
                <Button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl"
                    onClick={() => setConnected(true)}
                >
                    Connect Wallet
                </Button>
            )}
        </div>
    );
}