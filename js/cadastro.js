document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const deleteButton = document.getElementById("deleteButton");

  let products = JSON.parse(localStorage.getItem("listaProdutos")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const productName = document.getElementById("productName").value;
    const unit = document.getElementById("unit").value;
    const quantity = document.getElementById("quantity").value;
    const barcode = document.getElementById("barcode").value;
    const active = document.getElementById("active").checked;

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: productName,
      unit: unit,
      quantity: Number(quantity),
      barcode: barcode,
      active: active
    };

    products.push(newProduct);
    localStorage.setItem("listaProdutos", JSON.stringify(products));

    alert("Produto cadastrado com sucesso!");
    form.reset();
  });

  deleteButton.addEventListener("click", () => {
    const productId = prompt("Digite o ID do produto a ser excluído:");
    products = products.filter((p) => p.id !== Number(productId));
    localStorage.setItem("listaProdutos", JSON.stringify(products));
    alert("Produto excluído com sucesso!");
  });
});
