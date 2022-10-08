import React, { useEffect, useRef, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie, Line, PolarArea } from 'react-chartjs-2';
import { Chart, ArcElement, PointElement, LineElement, Filler, RadialLinearScale } from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
    RadialLinearScale
);

// color palete
const color = {
    primary: "#5aafff",
    secondary: "#04a9ca",
    danger: "#f3777a",
    warning: "#f57e2c",
    success: "#69c9ca"
}

// color end of gradient
const gradientEndColor = 'rgba(0,0,0,0)';




export default function ChartComponent({ type, labels, datasets, title }) {
    const chartRef = useRef(null);
    const [gradient, setGradient] = useState(null);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
                align: "start",
            },
            legend: {
                position: type != "pie" ? "top" : "right",
                align: "start",
                labels: {
                    usePointStyle: true,
                },
                rtl: true,
                onHover: handleHover,
                onLeave: handleLeave
            },
            tooltip: {
                backgroundColor: "#575757",
                padding: 12,
                usePointStyle: true,
                displayColors: false,
            }
        },
        scales: {
            y: {
                display: type != "pie" && type != "polar",
                suggestedMax: 800,
                min: 0,
                grid: {
                    drawBorder: false,
                }

            },
            x: {
                display: type != "pie" && type != "polar",
                grid: {
                    drawBorder: false,
                    color: false
                }
            },
        },
        hoverOffset: type == "pie" || type == "polar" ? 30 : 0,
        offset: 20,
        cubicInterpolationMode: 'monotone',
        pointBorderWidth: 2
    };

    useEffect(() => {
        var newGradient = {
            primary: chartRef.current?.ctx?.createLinearGradient(0, 0, 0, 800),
            secondary: chartRef.current?.ctx?.createLinearGradient(0, 0, 0, 800),
            warning: chartRef.current?.ctx?.createLinearGradient(0, 0, 0, 800),
            danger: chartRef.current?.ctx?.createLinearGradient(0, 0, 0, 800),
            success: chartRef.current?.ctx?.createLinearGradient(0, 0, 0, 800),
        }

        Object.keys(newGradient).map((keyName) => {
            newGradient[keyName]?.addColorStop(type == "line" ? 0.15 : 0.2, color[keyName]);
            newGradient[keyName]?.addColorStop(type == "line" ? 0.5 : 0.7, gradientEndColor);
        })

        setGradient(newGradient)
    }, [chartRef]);


    function handleHover(evt, item, legend) {
        if (type == "bar") {
            legend.chart.data.datasets[item.datasetIndex].backgroundColor = datasets[item.datasetIndex]?.color ? color[datasets[item.datasetIndex].color] : color.primary;
            legend.chart.update();
        }

    }

    function handleLeave(evt, item, legend) {
        if (type == "bar") {
            legend.chart.data.datasets[item.datasetIndex].backgroundColor = datasets[item.datasetIndex]?.color ? gradient[datasets[item.datasetIndex].color] : gradient.primary
            legend.chart.update();
        }
    }

    const data = {
        labels,
        datasets: [],
    };

    datasets.map((dataset, key) => {
        let background;
        if (dataset?.color && Array.isArray(dataset?.color)) {
            background = [];
            dataset?.color.map((setColor, key) => {
                background.push(setColor ? color[setColor] : color.primary)

            })
        } else {
            background = gradient ? dataset.color ? gradient[dataset.color] : gradient.primary : color.primary
        }

        data.datasets.push({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: background,
            borderRadius: 8,
            fill: true,
            borderColor: background,
        })
    })



    return (
        <div className='py-4 px-6 bg-white rounded-lg shadow'>
            {type == "bar" && (
                <Bar ref={chartRef} options={options} data={data} />
            )}
            {type == "pie" && (
                <Pie ref={chartRef} options={options} data={data} />
            )}
            {type == "line" && (
                <Line ref={chartRef} options={options} data={data} />
            )}
            {type == "polar" && (
                <PolarArea ref={chartRef} options={options} data={data} />
            )}
        </div>
    );
}
