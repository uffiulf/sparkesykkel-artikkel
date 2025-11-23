import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function ChartBar({ data, colors }) {
  return (
    <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="label" 
          stroke="#666"
          tick={{ fill: '#666', fontSize: 14 }}
        />
        <YAxis 
          stroke="#666"
          tick={{ fill: '#666', fontSize: 14 }}
          label={{ value: 'Prosent', angle: -90, position: 'insideLeft', fill: '#666' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px'
          }}
          formatter={(value) => [`${value}%`, '']}
        />
        <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default ChartBar;

