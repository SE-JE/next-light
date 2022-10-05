import React from 'react'
import ChartComponent from '../components/base_component/chart/ChartComponent'

export default function chart() {
    return (
        <div className='grid grid-cols-3 gap-2 p-10'>
            <div className='col-span-2'>
                <ChartComponent
                    title={"Chart Bar"}
                    type="bar"
                    labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                    datasets={[
                        {
                            label: "Data 1",
                            color: "danger",
                            data: [100, 200, 500, 300, 50, 400, 100]
                        },
                        {
                            label: "Data 2",
                            color: "success",
                            data: [400, 250, 50, 200, 400, 300, 200]
                        },
                    ]}

                />
            </div>
            <div>
                <ChartComponent
                    title={"Chart Pie"}
                    type="pie"
                    labels={['Data 1', 'Data 2', 'Data 3']}
                    datasets={[
                        {
                            label: "Data 1",
                            color: ["danger", "primary", 'warning'],
                            data: [100, 150, 500]
                        },
                    ]}

                />
            </div>

            <div>
                <ChartComponent
                    title={"Chart Polar"}
                    type="polar"
                    labels={['Data 1', 'Data 2', 'Data 3']}
                    datasets={[
                        {
                            label: "Data 1",
                            color: ["danger", "primary", 'warning'],
                            data: [300, 450, 200]
                        },
                    ]}

                />
            </div>

            <div className='col-span-2'>
                <ChartComponent
                    title={"Chart Line"}
                    type="line"
                    labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                    datasets={[
                        {
                            label: "Data 1",
                            color: "primary",
                            data: [100, 200, 500, 300, 50, 400, 100]
                        },
                        {
                            label: "Data 2",
                            color: "warning",
                            data: [400, 250, 50, 200, 400, 300, 200]
                        },
                    ]}

                />
            </div>


        </div>
    )
}
