import React, { useState } from 'react'
import Chart from "react-apexcharts";

function Charts() {
    const [state,setState] = useState(
        {
            options: {
              colors:["#ffc613"],
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: [10, 20, 30, 40, 50]
              }
            },
            series: [
              {
                name: "series-1",
                data: [50, 30, 90, 60, 40]
              }
            ]
        }
    )
  return (
    <div className='px-2'>
        <Chart
              options={state.options}
              series={state.series}
              type="bar"
            />
    </div>
  )
}

export default Charts
