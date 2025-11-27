import {ConnectWallet} from '@/features/wallet';
import {Chart} from '@/features/chart';

const HomePage = () => {
    return (
        <main className={"flex flex-col gap-4"}>
            <header className={"flex items-center justify-between py-2"}>
                <div className={"flex items-center gap-4"}>
                    <div className={"flex items-center gap-2 p-2 border border-[#222222] rounded-lg bg-[#222222]"}>
                        <span className={"text-sm"}>BTCDEGEN/USDC</span>
                        <span className={"text-xs opacity-80"}>100x</span>
                    </div>
                </div>
                <ConnectWallet />
            </header>
            <Chart />
        </main>
    )
}

export const Component = HomePage;