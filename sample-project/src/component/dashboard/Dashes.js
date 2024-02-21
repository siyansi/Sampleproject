import React from 'react';
import { IoBagHandle } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts'


const data = [
  { name: 'jan', Expense: 5000, Income: 4000 },
  { name: 'feb', Expense: 1000, Income: 2000 },
  { name: 'mar', Expense: 3000, Income: 2000 },
  { name: 'apr', Expense: 4000, Income: 4000 },
  { name: 'may', Expense: 5000, Income: 1000 },
  { name: 'jun', Expense: 2000, Income: 4000 },
  { name: 'jul', Expense: 5000, Income: 3000 },
  { name: 'aug', Expense: 5000, Income: 3000 },
  { name: 'sep', Expense: 5000, Income: 5000 },
  { name: 'oct', Expense: 4000, Income: 3000 },
  { name: 'nov', Expense: 1000, Income: 2000 },
  { name: 'dec', Expense: 3000, Income: 2000 },
];

const data1 = [
    { name: 'Male', value: 540 },
    { name: 'Female', value: 620 },
    { name: 'Other', value: 210 }
]

const RADIAN = Math.PI / 180
const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

const Dashes = () => {
    return (
      <div className="flex h-screen">
          
        {/* <div className="bg-gray-900 text-white w-64">
          <div className="p-4">
            <h2 className="text-xl font-bold">Sidebar</h2>
            <ul className="mt-4">
              <li className="py-2">Menu Item 1</li>
              <li className="py-2">Menu Item 2</li>
              <li className="py-2">Menu Item 3</li>
            </ul>
          </div>
        </div> */}
  
        <div className="flex-1 bg-gray-100 p-8">
          {/* <nav className="bg-gray-800 p-4 mb-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-lg font-bold">Attendance System</div>
              <div>
                <a href="#" className="text-white mx-2">Home</a>
                <a href="#" className="text-white mx-2">Dashboard</a>
                <a href="#" className="text-white mx-2">Profile</a>
              </div>
            </div>
          </nav> */}

          <div className="flex gap-4 ">
          <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
              <IoBagHandle className='text-2xl text-white'/>
            </div>
            <div className='pl-4'>
              <span className='text-sm text-gray-500 font-light'>Total Sales</span>
              <div className='flex items-center'>
                <strong className='text-xl text-gray-700 font-semibold'>$34525.60</strong>
                <span className='text-green-500 text-sm pl-2'>+234</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-red-500'>
              <IoBagHandle className='text-2xl text-white'/>
            </div>
            <div className='pl-4'>
              <span className='text-sm text-gray-500 font-light'>Total Sales</span>
              <div className='flex items-center'>
                <strong className='text-xl text-gray-700 font-semibold'>$34525.60</strong>
                <span className='text-green-500 text-sm pl-2'>+234</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-500'>
              <IoBagHandle className='text-2xl text-white'/>
            </div>
            <div className='pl-4'>
              <span className='text-sm text-gray-500 font-light'>Total Sales</span>
              <div className='flex items-center'>
                <strong className='text-xl text-gray-700 font-semibold'>$34525.60</strong>
                <span className='text-green-500 text-sm pl-2'>+234</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500'>
              <IoBagHandle className='text-2xl text-white'/>
            </div>
            <div className='pl-4'>
              <span className='text-sm text-gray-500 font-light'>Total Sales</span>
              <div className='flex items-center'>
                <strong className='text-xl text-gray-700 font-semibold'>$34525.60</strong>
                <span className='text-green-500 text-sm pl-2'>+234</span>
              </div>
            </div>
          </BoxWrapper>
        </div>
  
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <TransactionChart />
            </div>
            <div className="w-[20rem]">
              <BuyerProfilePieChart />
            </div>
          </div>
        </div>
      </div>
    );
  }

function BoxWrapper ({ children }){
    return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>
}

export default Dashes;

function TransactionChart() {
    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 mt-4">
            <strong className="text-gray-700 font-medium">Transactions</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Income" fill="#0ea5e9" />
                        <Bar dataKey="Expense" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

function BuyerProfilePieChart() {
    return (
        <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col mt-4">
            <strong className="text-gray-700 font-medium">Buyer Profile</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data1}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={105}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
