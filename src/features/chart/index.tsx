import {useEffect, useRef, useState} from 'react';
import type {AreaSeriesOptions, DeepPartial} from 'lightweight-charts';
import {
    AreaSeries,
    Chart as LightweightChart, TimeScale, TimeScaleFitContentTrigger,
} from 'lightweight-charts-react-components';

const seriesCustomOptions = {
    bottomColor: `#AEB9E105`,
    lineColor: "#57C3FF",
    topColor: "#57C3FF",
    lineWidth: 2,
} satisfies DeepPartial<AreaSeriesOptions>;

const initialData = [
    { time: "2023-01-01", value: 100.00 },
    { time: "2023-01-02", value: 101.50 },
    { time: "2023-01-03", value: 99.80 },
    { time: "2023-01-04", value: 102.20 },
    { time: "2023-01-05", value: 103.75 },
    { time: "2023-01-06", value: 101.30 },
    { time: "2023-01-07", value: 105.60 },
    { time: "2023-01-08", value: 107.25 },
    { time: "2023-01-09", value: 104.90 },
    { time: "2023-01-10", value: 106.40 },
    { time: "2023-01-11", value: 108.75 },
    { time: "2023-01-12", value: 110.20 },
    { time: "2023-01-13", value: 107.80 },
    { time: "2023-01-14", value: 109.50 },
    { time: "2023-01-15", value: 112.30 },
];

export function Chart() {
    const [chartData, setChartData] = useState(initialData);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastDateRef = useRef(new Date("2023-01-15"));

    const generateRealisticDataPoint = (lastData: typeof initialData) => {
        const lastPoint = lastData[lastData.length - 1];

        lastDateRef.current.setDate(lastDateRef.current.getDate() + 1);
        const nextDate = new Date(lastDateRef.current);

        const year = nextDate.getFullYear();
        const month = String(nextDate.getMonth() + 1).padStart(2, '0');
        const day = String(nextDate.getDate()).padStart(2, '0');
        const timeString = `${year}-${month}-${day}`;

        const baseVolatility = 0.008;
        const randomMultiplier = Math.random() * 2 + 0.5;
        const volatility = baseVolatility * randomMultiplier;

        let change: number;
        do {
            const u1 = Math.random();
            const u2 = Math.random();
            const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            change = z0 * volatility;
        } while (Math.abs(change) > volatility * 3);

        let trend = 0;
        if (Math.random() < 0.3) {
            trend = (Math.random() - 0.5) * volatility * 0.5;
        }

        const totalChange = change + trend;
        let newValue = lastPoint.value * (1 + totalChange);

        newValue = Math.max(80, Math.min(150, newValue));

        return {
            time: timeString,
            value: parseFloat(newValue.toFixed(4))
        };
    };

    const startRealtimeUpdates = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setChartData(prevData => {
                try {
                    const newDataPoint = generateRealisticDataPoint(prevData);
                    if (newDataPoint.time.includes('NaN')) {
                        console.error('Invalid date generated:', newDataPoint.time);
                        return prevData;
                    }
                    const updatedData = [...prevData.slice(-49), newDataPoint];
                    return updatedData;
                } catch (error) {
                    console.error('Error generating data point:', error);
                    return prevData;
                }
            });
        }, 1000);
    };

    useEffect(() => {
        startRealtimeUpdates();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const currentPrice = chartData[chartData.length - 1]?.value || 100;
    const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2]?.value : currentPrice;
    const priceChange = currentPrice - previousPrice;
    const priceChangePercent = ((currentPrice / previousPrice) - 1) * 100;

    return (
        <>
            <div className={"flex items-center gap-2"}>
                <span className={"text-lg font-semibold"}>
                    ${currentPrice.toFixed(4)}
                </span>
                <span className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(4)}
                    ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                </span>
            </div>
            <LightweightChart options={{
                autoSize: true,
                height: 400,
                layout: {
                    background: {
                        color: "transparent",
                    },
                },
                grid: {
                    vertLines: {
                        visible: false,
                    },
                    horzLines: {
                        visible: false,
                    },
                },
                crosshair: {
                    vertLine: {
                        style: 3,
                        color: "#7E89AC",
                    },
                    horzLine: {
                        style: 3,
                        color: "#7E89AC",
                    },
                },
            }}>
                <AreaSeries options={seriesCustomOptions} data={chartData} />
                <TimeScale>
                    <TimeScaleFitContentTrigger deps={[chartData]} />
                </TimeScale>
            </LightweightChart>
        </>
    );
}