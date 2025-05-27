import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './index.css';

function App() {
  const [leituras, setLeituras] = useState([]);

  useEffect(() => {
    fetch('http://192.168.4.2:5000/api/dados')
      .then(response => response.json())
      .then(data => setLeituras(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const chartData = {
    labels: leituras.map(dado => new Date(dado.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Nível de Água',
        data: leituras.map(dado => dado.leitura),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: 'white' } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white p-6">
      <div className="flex items-center space-x-4 animate-fade-in">
        <img src="./image.png" alt="Ícone" className="w-12 h-12 animate-bounce" />
        <h1 className="text-3xl font-bold">Monitoramento de Água</h1>
      </div>

      <div className="mt-10 animate-slide-up shadow-lg rounded-lg bg-blue-800 p-4">
        <h2 className="text-xl mb-4 font-semibold">Dashboard</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="mt-10 animate-slide-up shadow-lg rounded-lg bg-blue-800 p-4 overflow-auto">
        <h2 className="text-xl mb-4 font-semibold">Histórico de Leituras</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-700">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Leitura</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Tempo</th>
              <th className="p-2 text-left">Bomba Ligada</th>
              <th className="p-2 text-left">Horário</th>
            </tr>
          </thead>
          <tbody>
            {leituras.map((dado) => (
              <tr key={dado.id} className="hover:bg-blue-700 transition duration-200">
                <td className="p-2">{dado.id}</td>
                <td className="p-2">{dado.leitura}</td>
                <td className="p-2">{dado.status}</td>
                <td className="p-2">{dado.tempo}</td>
                <td className="p-2">{dado.bombaligada}</td>
                <td className="p-2">{new Date(dado.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
