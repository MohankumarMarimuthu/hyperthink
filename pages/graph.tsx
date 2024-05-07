import React from 'react'
import BarGraph from "../components/BarGraph"

const graph = () => {
  return (
    <div>
        <div style={{ background : "#1d2433" , height: "100vh"}}>
          <div className="container">
            <BarGraph />
          </div>
        </div>
    </div>
  )
}

export default graph