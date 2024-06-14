const COMPRAS_URL = "https://6663c2f7932baf9032a8f1fc.mockapi.io/Compras";
const PRODUTOS_URL =
  "https://6663c2f7932baf9032a8f1fc.mockapi.io/Compras/1/proutos";

async function getCompras() {
  const resp = await fetch(COMPRAS_URL);
  if (resp.status === 200) {
    const obj = await resp.json();
    console.log("Teste compras");
    console.log(obj);
  }
}

async function getProdutos() {
  const prod = await fetch(PRODUTOS_URL);
  if (prod.status === 200) {
    const obj = await prod.json();
    console.log("Teste Produtos");
    console.log(obj);
  }
}

getCompras();
getProdutos();
