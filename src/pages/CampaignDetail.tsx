import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
export default function CampaignDetail() {

  const [tab,setTab] = useState("overview");

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">Campaign Detail</h1>

      {/* Tabs */}

      <div className="flex gap-4 mb-6">

        {tab === "overview" && (

<div className="bg-white p-6 rounded shadow w-96">

<h2 className="text-lg font-semibold mb-4">Edit Campaign</h2>

<input
type="text"
placeholder="Campaign Name"
className="border p-2 w-full mb-3 rounded"
/>

<select className="border p-2 w-full mb-3 rounded">
<option>Active</option>
<option>Paused</option>
<option>Completed</option>
</select>

<input
type="number"
placeholder="Budget"
className="border p-2 w-full mb-3 rounded"
/>

<button className="bg-blue-500 text-white px-4 py-2 rounded">
Save
</button>

</div>

)}

        {tab === "assets" && (

<div className="bg-white p-6 rounded shadow w-96">

<h2 className="text-lg font-semibold mb-4">Upload Asset</h2>

<input type="file" className="mb-4" />

<button className="bg-green-500 text-white px-4 py-2 rounded">
Upload
</button>

</div>

)}
        {tab === "performance" && (

<BarChart width={400} height={300}
data={[
{name:"Mon",views:400},
{name:"Tue",views:700},
{name:"Wed",views:200},
{name:"Thu",views:900}
]}>

<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Bar dataKey="views" />

</BarChart>

)}

      </div>

      {/* Tab Content */}

      {tab==="overview" && (
        <div className="p-4 bg-white shadow rounded">
          Campaign editable form coming here
        </div>
      )}

      {tab==="assets" && (
        <div className="p-4 bg-white shadow rounded">
          Drag & Drop upload simulation
        </div>
      )}

      {tab==="performance" && (
        <div className="p-4 bg-white shadow rounded">
          Charts will appear here
        </div>
      )}

    </div>

  );

}