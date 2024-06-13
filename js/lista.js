document.addEventListener("DOMContentLoaded", () => {
  const productList = document
    .getElementById("productList")
    .getElementsByTagName("tbody")[0];
  const sendToServerButton = document.getElementById("sendToServer");
  const clearListButton = document.getElementById("clearList");

  let products = JSON.parse(localStorage.getItem("listaProdutos")) || [];
  let shoppingList = JSON.parse(localStorage.getItem("listaCompras")) || [];

  const renderList = () => {
    productList.innerHTML = "";
    products
      .filter((p) => p.active)
      .forEach((product) => {
        const row = productList.insertRow();
        row.insertCell(0).textContent = product.id;
        row.insertCell(1).textContent = product.name;
        row.insertCell(2).textContent = product.unit;
        row.insertCell(3).textContent = product.quantity;
        const purchaseCell = row.insertCell(4);
        const purchaseInput = document.createElement("input");
        purchaseInput.type = "number";
        purchaseInput.min = 0;
        purchaseInput.value = product.purchased || 0;
        purchaseInput.addEventListener("input", (e) => {
          product.purchased = Number(e.target.value);
          localStorage.setItem("listaProdutos", JSON.stringify(products));
          renderList();
        });
        purchaseCell.appendChild(purchaseInput);
        const collectedCell = row.insertCell(5);
        if ((product.purchased || 0) >= product.quantity) {
          collectedCell.textContent = "Sim";
          row.classList.add("strikethrough");
        } else {
          collectedCell.textContent = "Não";
        }
      });

    // Check if all products are collected to enable sendToServerButton
    sendToServerButton.disabled = !products.every(
      (p) => (p.purchased || 0) >= p.quantity
    );
  };

  clearListButton.addEventListener("click", () => {
    if (confirm("Tem certeza de que deseja limpar toda a lista?")) {
      localStorage.removeItem("listaProdutos");
      localStorage.removeItem("listaCompras");
      products = [];
      shoppingList = [];
      renderList();
    }
  });

  sendToServerButton.addEventListener("click", async () => {
    if (products.every((p) => (p.purchased || 0) >= p.quantity)) {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(shoppingList),
          }
        );
        if (response.ok) {
          localStorage.removeItem("listaCompras");
          alert("Lista enviada com sucesso!");
        }
      } catch (error) {
        alert("Erro ao enviar lista: " + error.message);
      }
    } else {
      alert("Ainda há produtos não coletados.");
    }
  });

  renderList();
});
