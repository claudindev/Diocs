function resetarBusca() {
    document.getElementsByClassName('busca-wrapper')[0].classList.remove('busca-hidden');
    document.getElementsByClassName('resultados')[0].classList.add('resultados-hidden');
    buscou = false;
    initMap();
}