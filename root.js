const root = document.getElementById("root");

const lista_de_produtos = [
  { id: 1, valor: 5.0 },
  { id: 2, valor: 3.5 },
  { id: 3, valor: 4.8 },
  { id: 4, valor: 8.9 },
  { id: 5, valor: 7.32 },
];

/* valores globais */

const initialValue = 0;
const initialInputs = 1;

let quantidadeDeProdutos = 1;
let idDoProduto = 1;

/* HTML criado para a aplicação, sofre alterações de css dentro */

root.innerHTML = `
<div style="
height: 100vh; 
background-color: rgba(10, 10, 10);
color: rgba(200, 200, 200);

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

gap: 50px;
">
    <section 
    class="dialog_sucesso"
    style="
        position: absolute;
        top: 40px;
        right: 60px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    "
    >

        <h4
        id="mensagem_sucesso"
        style="
            color: rgba(0, 200, 0);
        "
        >
            
        </h4>

    </section>

    <table class="tabela_de_produtos">

        <thead style="
        background-color: rgba(50, 50, 50);
        ">
            <tr>
                <th>Produto</th>
                <th>Valor</th>
            </tr>
        </thead>

        <tbody style="
        background-color: rgba(50, 50, 50);
        ">
            ${lista_de_produtos.map((produto) => {
              return `<tr key={${produto.id}}>
                    <td>${produto.id}</td>
                    <td>${produto.valor}</td>
                </tr>`;
            })}
        </tbody>
        
    </table>

    <section 
    class="inputs_de_escolha_para_adicao_carrinho"
    style="
        display: flex;
        flex-direction: column;
        gap: 10px;
    "
    >

        <div class="quantidade_de_produto">
            
            <label 
            for="id_do_produto"
            >
            Escolha quantos produtos deseja de determinado <strong>id</strong> deseja comprar:
            </label>

            <input
            type="number"
            value=${quantidadeDeProdutos}
            min="1"
            max="100"
            name="id_do_produto"
            />

        </div>

        <div class="id_de_escolha">
            
            <label 
            for="id_do_produto"
            >
            Escolha o <strong>id</strong> do produto (1 - ${
              lista_de_produtos.length
            }):
            </label>

            <input
            type="number"
            value=${idDoProduto}
            min="1"
            max=${lista_de_produtos.length}
            name="id_do_produto"
            />

        </div>

    </section>

    <section 
    class="painel_de_exibicao_com_botao_para_adicao_de_produtos"
    style="
        display: flex;
        flex-direction: column;
        gap: 30px;
    "
    >

        <div 
        class="botao_de_adicionar"
        style="
            display: flex;
            justify-content: center;
        "
        >

            <button
            style="
                padding: 10px 15px;

                border-radius: 16px;
                border: none;
            "
            >
                Adicionar ao valor
            </button>

        </div>

        <div 
        class="painel_de_exibicao"
        style="
            padding: 20px 40px;
            display: flex;
            justify-content: center;
            
            background: rgba(255, 255, 255, 0.13);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(2.1px);
            -webkit-backdrop-filter: blur(2.1px);
            border: 1px solid rgba(255, 255, 255, 0.3); 
        "
        >

            <h1 
            id="valor_painel"
            >
                0
            </h1>

        </div

        <div class="botao_de_restaurar">

        <button
        class="botao_de_restaurar"
        style="
            padding: 10px 15px;

            border-radius: 16px;
            border: none;
        "
        >
            Restaurar Valor do Painel
        </button>

    </div>     
    
    </section

</div>
`;

/* criação de dialog para certificação de valor somado e sucesso de operação */

const dialogDeSucesso = document.getElementById("mensagem_sucesso");

const dialogDeSucessoDeOperacaoInformandoValoresAdicionados = (
  valor_adicionado
) => {
  dialogDeSucesso.textContent = `Sua operação foi feita com sucesso, foi adicionado um valor de ${valor_adicionado}!`;

  setTimeout(() => {
    dialogDeSucesso.textContent = "";
  }, 3500);
};

/* Lógica aplicada para conseguir fazer as alterações */

const inputQuantidade = document.querySelector(".quantidade_de_produto");
const inputId = document.querySelector(".id_de_escolha");
const adicionarBotao = document.querySelector(".botao_de_adicionar");
const restaurarBotao = document.querySelector(".botao_de_restaurar");

const valorPainel = document.querySelector("#valor_painel");

const handleChangeQuantidadeDoProduto = (target) => {
  const value = Number(target.value);
  value !== quantidadeDeProdutos && (quantidadeDeProdutos = value);
};

const handleChangeIdDoProduto = (target) => {
  const value = Number(target.value);
  value !== idDoProduto && (idDoProduto = value);
};

const handleClickAdicionarAoValor = () => {
  let valorResultanteDeMultiplicacao =
    lista_de_produtos[idDoProduto - 1].valor * quantidadeDeProdutos;

  valorPainel.textContent = (
    Number(valorPainel.textContent) + valorResultanteDeMultiplicacao
  ).toFixed(2);

  dialogDeSucessoDeOperacaoInformandoValoresAdicionados(
    valorResultanteDeMultiplicacao.toFixed(2)
  );
};

const handleClickRestauraValoresAoInicial = () => {
  quantidadeDeProdutos = initialInputs;
  idDoProduto = initialInputs;
  valorPainel.textContent = initialValue;
};

inputQuantidade.addEventListener("change", (event) =>
  handleChangeQuantidadeDoProduto(event.target)
);

inputId.addEventListener("change", (event) =>
  handleChangeIdDoProduto(event.target)
);

adicionarBotao.addEventListener("click", () => handleClickAdicionarAoValor());

restaurarBotao.addEventListener("click", () =>
  handleClickRestauraValoresAoInicial()
);
