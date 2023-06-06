const adicionar = document.querySelector("#adicionar");
const calcular = document.querySelector("#calcular");
const camposAdicionar = '<input type="text" name="nome" placeholder="Nome"><input type="number" name="valor" placeholder="Valor">'

adicionar.addEventListener('click', function (event) {
    var valoresDiv = document.querySelector('.valores');
    var divVal = document.createElement('div');
    divVal.className = "campos"
    divVal.innerHTML = camposAdicionar;
    valoresDiv.append(divVal);

});

calcular.addEventListener('click', function (event) {
    var descontoPerc = document.querySelector("#descontoPerc").value;
    var acrescimoPerc = document.querySelector("#acrescimoPerc").value;
    var descontoReais = document.querySelector("#descontoReais").value;
    var acrescimoReais = document.querySelector("#acrescimoReais").value;
    var jsonRequest = new Array();
    var jsonValor = new Array();
    var retorno = document.querySelector("#retorno");
    var inputRet;
    var divRet;
    retorno.innerHTML = "";

    document.querySelectorAll('.campos').forEach((element, indice) => {
        jsonValor.push({ "nome": element.querySelector('input[name="nome"]').value, "valor": element.querySelector('input[name="valor"]').value })
    })

    jsonRequest = { "descontoPerc": descontoPerc, "acrescimoPerc": acrescimoPerc, "descontoReais": descontoReais, "acrescimoReais": acrescimoReais, "valores": jsonValor };

    fetch("http://localhost:8080/calcular", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(jsonRequest)
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            if (data.length > 0) {
                data.forEach(element => {
                    divRet = document.createElement('div');
                    inputRet = document.createElement('input');
                    inputRet.readOnly = true;
                    inputRet.value = element.nome;
                    divRet.append(inputRet);

                    inputRet = document.createElement('input');
                    inputRet.readOnly = true;
                    inputRet.value = element.valor;
                    divRet.append(inputRet);

                    if (element.linkRet != '') {
                        inputRet = document.createElement('a');
                        inputRet.innerHTML = '<a target="_blanc" href="' + element.linkRet + '">Link pagamento</a>';
                        divRet.append(inputRet);
                    }

                    retorno.append(divRet)
                })
            } else {
                alert('Favor informar todos os compradores');
            }
        })
        .catch(function (res) { console.log("Error" + res) });
});