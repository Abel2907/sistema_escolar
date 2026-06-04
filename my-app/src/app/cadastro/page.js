export default function Cadastro() {
  return (
    <div>

      <div>

        <div>
          <h1>Cadastro</h1>

          <form
          >
            <input
              type="text"
              name="nome"
              placeholder="Nome"
            />


            <input
              type="email"
              name="email"
              placeholder="Email"
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
            />

            <button
              type="submit"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}