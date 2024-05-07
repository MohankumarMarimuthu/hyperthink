import React from 'react'
import Chart from 'react-apexcharts';

const ChartDisplay = ({city , list} : any) => {

  const dates = list.map((item : any) => new Date(item.dt * 1000).toISOString().slice(0, 10))
  console.log('city' , list)
  return (
    <div>
      <div>
      <Chart
          type="bar"
          width="100%"
          height={600}
          series={[
            {
              name: "Humidity",
              data: list.map((item : any) => item?.humidity),
            },
          ]}
          options={{
            title: {
              text: "Weather Report",
              style: { fontSize: "30px"  , color: "#FFFFFF"}, 
            },
            colors: ["#f90000"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: dates,
              title: {
                text: `Weather of ${city.name}`,
                style: { fontSize: "30px" , color: "#FFFFFF" }, // Fix here
              },
              labels: {
                style: {
                  fontSize: "14px", // Adjust font size as needed
                  // colors: Array(dates?.length).fill("#FFFFFF"), // Adjust label color
                },
              },
            },

            yaxis: {
              min: 0, // Set minimum value to 0
              max: 100, // Set maximum value to 100
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15px", colors: ["#f90000"] }, // Fix here
              },
              title: {
                text: "Humidity in percentage %",
                style: { color: "#f90000", fontSize: "15px" }, // Fix here
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: "15px", // Fix here
              },
            },
          }}
        ></Chart>
      </div>
    </div>
  )
}

export default ChartDisplay