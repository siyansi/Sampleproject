import React from 'react'
import LineChart from './Linechart'
import BarChart from './Barchat'
import Dashes from './Dashes'





const Dashboard = () => {
  return (
    <div className="ml-80 mt-24">

<div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
               <Dashes/>
                <LineChart />
                <BarChart />
            </div>
    </div>
  )
}

export default Dashboard



