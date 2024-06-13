const COMPRAS_URL = 'https://6663c2f7932baf9032a8f1fc.mockapi.io/Compras';
const PRODUTOS_URL = 'https://6663c2f7932baf9032a8f1fc.mockapi.io/Compras/1/proutos';

export const sendToServer = async (products, purchases) => {
  try {
    const productResponse = await fetch(PRODUTOS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });

    const purchaseResponse = await fetch(COMPRAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchases),
    });

    if (productResponse.ok && purchaseResponse.ok) {
      localStorage.removeItem("listaProdutos");
      localStorage.removeItem("listaCompras");
      alert("Lista enviada com sucesso!");
    } else {
      alert("Erro ao enviar lista: " + productResponse.statusText + " & " + purchaseResponse.statusText);
    }
  } catch (error) {
    alert("Erro ao enviar lista: " + error.message);
  }
};
