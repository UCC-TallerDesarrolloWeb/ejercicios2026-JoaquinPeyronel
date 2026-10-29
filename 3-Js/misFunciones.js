/**
 * Convierte un valor entre metros, pulgadas, pies y yardas
 * y actualiza los campos del conversor.
 *
 * @method convertirUnidad
 * @param valor Valor numérico ingresado por el usuario
 * @param unidad Unidad correspondiente al campo modificado
 * @return No retorna ningún valor
 */
function convertirUnidad(valor, unidad) {
    let metros;

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

    document.getElementById("metro").value = metros;
    document.getElementById("pulgada").value = metros / 0.0254;
    document.getElementById("pie").value = metros / 0.3048;
    document.getElementById("yarda").value = metros / 0.9144;
}