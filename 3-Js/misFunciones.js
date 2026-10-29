/**
 * Convierte un valor entre metros, pulgadas, pies y yardas
 * y actualiza los campos del conversor.
 *
 * @method convertirUnidad
 * @param valor Valor numérico ingresado por el usuario
 * @param unidad Unidad correspondiente al campo modificado
 * @return No retorna ningún valor
 */
const convertirUnidad = (valor, unidad) => {
    let metros, pulgadas, pies, yardas;

    if (valor.includes(",")) {
        valor = valor.replace(",", ".");
    }

    if (isNaN(valor)) {
        alert("El valor ingresado es incorrecto");

        metros = "";
        pulgadas = "";
        pies = "";
        yardas = "";
    } else {
        valor = parseFloat(valor);

        if (unidad === "metro") {
            metros = valor;
        }

        if (unidad === "pulgada") {
            metros = valor * 0.0254;
        }

        if (unidad === "pie") {
            metros = valor * 0.3048;
        }

        if (unidad === "yarda") {
            metros = valor * 0.9144;
        }

        pulgadas = metros / 0.0254;
        pies = metros / 0.3048;
        yardas = metros / 0.9144;
    }

    document.getElementById("metro").value = metros;
    document.getElementById("pulgada").value = pulgadas;
    document.getElementById("pie").value = pies;
    document.getElementById("yarda").value = yardas;
};