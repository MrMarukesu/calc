// adquirindo teclas
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷', '', '%', ];
var decimalAdded = false;

// Adicionando "Cliques" as teclas
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Adicionando Valores a tela
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		var number =  inputVal.substring(inputVal.indexOf('(')+1 ,  inputVal.indexOf(')' ));
		var size = inputVal.length;

		// Definindo Valores para teclas de operações
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		else if(btnVal == 'del') {
			if(inputVal.substring(size - 4) == 'sin(' || inputVal.substring(size - 4) == 'cos(' || inputVal.substring(size - 4) == 'log(') {
				input.innerHTML = input.innerHTML.substring(0, size -4);
			}
			else if(inputVal.substring(size - 3) == 'tg(') {
				input.innerHTML = input.innerHTML.substring(0, size -3);
			}
			else if(inputVal.substring(size - 2) == '√(') {
				input.innerHTML = input.innerHTML.substring(0, size -2);
			}
			input.innerHTML = input.innerHTML.substring(0, size -1);
		}

		// adiciona o primeiro "(" para ser de referencia para o usuario
		else if(btnVal == 'cos' || btnVal == 'sin' || btnVal == 'tg' || btnVal == 'log' || btnVal == '√') {
			input.innerHTML += btnVal + '(';
		}

		// operação de igualdade, calcula e mostra o valor recebeido
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			//se '^' for clicado, fazer essa operação.
			if(inputVal.match(/ˆ/)) {
				var op = input.innerHTML;
				var ant = op.search("ˆ");
				var x = op.slice(0, ant);
				var y = op.slice(ant + 1);
				equation = equation.replace(equation, 'Math.pow(' + x + ', ' + y + ')');
			}

			// Mudando teclas de operações com simbolos especiais ( x, , etc...) para seus valores operacionais ( *, /, etc...)
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/').replace(/π/g, Math.PI).replace(/e/g, Math.E).replace(/%/g, '/ 100').replace(/√/g, 'Math.sqrt').replace(/log/g, 'Math.log').replace(/cos/g, 'Math.cos').replace(/sin/g, 'Math.sin').replace(/tg/g, 'Math.tan')

			// Removendo digitos não necessarios ao final do calculo
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');

			if(equation)
				input.innerHTML = eval(equation);

			decimalAdded = false;
		}

		// correções de erros
		//Apenas adiciona um operador se esse não for o primeiro digito ou ser pressedido por outro operador.
		else if(operators.indexOf(lastChar) == -1) {
				input.innerHTML += btnVal;

			// permite menos ser selecionado quando o calculo estiver vazio
			if(inputVal == '' && btnVal == '-')
				input.innerHTML += btnVal;

			// Troca o ultimo operador (se existir) com o novo operador clicado
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				if(operators.indexOf(lastChar) == 'sin' || operators.indexOf(lastChar) == 'cos' || operators.indexOf(lastChar) == 'tg' || operators.indexOf(lastChar) == 'pow' || operators.indexOf(lastChar) == 'sqr' || operators.indexOf(lastChar) == 'log' ) {
					input.innerHTML += btnVal;
				}
				// '.' siginifica qualquer digito enquanto $ marca o fim do calculo, então qualquer coisa no final do calculo sera substituido
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}

			decimalAdded =false;
		}

		// limita o '.' para segir a regras da casas decimais.
		else if(btnVal == '·') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}

		else {
			input.innerHTML += btnVal;
		}

		// Prevenção
		e.preventDefault();
	}
}
