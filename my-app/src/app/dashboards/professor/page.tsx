
import Header from "./components_professor/professorHEADER"
import Notas_alunos from "./components_professor/notas_alunos"
export default function Professor_Dashboard() {
  return (
    <div>
     <Header/>
      <main className="p-8">
        <Notas_alunos/>
      </main>
    </div>
  )
}