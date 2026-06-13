export default function NotasAluno() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 font-sans pt-30">
      <h1 className="text-3xl font-bold mb-6">
        Boletim Escolar
      </h1>

      <section className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg">
          <strong>Aluno:</strong> 
        </p>
        <p className="text-lg">
          <strong>Bimestre:</strong> 
        </p>
      </section>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3">Matéria</th>
              <th className="text-left p-3">Notas</th>
              <th className="text-left p-3">Média</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3">__</td>
              <td className="p-3">0</td>
              <td className="p-3">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}