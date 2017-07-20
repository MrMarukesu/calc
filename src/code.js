// TODO: Functions Code //

// Get all the keys from document
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷', '', '%',, '', '', '', '', '', '', ];
var decimalAdded = false;

// Adicionando "Cliques" as teclas
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Adicionando Valores a tela
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		var number =  inputVal.substring(inputVal.indexOf('(')+1 ,  inputVal.indexOf(')' ));
		
		// Definindo Valores para teclas de operações
		if(btnVal == 'C' || btnVal == 'CA') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		else if(btnVal == 'del') {
			var size = input.innerHTML.length;
			if (inputVal.substring(size - 4) == 'sin(' || inputVal.substring(size - 4) == 'cos(' || inputVal.substring(size - 4) == 'log(') {
				input.innerHTML = input.innerHTML.substring(0, size -4);
			}
			else if (inputVal.substring(size - 3) == 'tg(') {
				input.innerHTML = input.innerHTML.substring(0, size -3);
			}
			else if (inputVal.substring(size - 2) == '√(') {
				input.innerHTML = input.innerHTML.substring(0, size -2);
			}
			input.innerHTML = input.innerHTML.substring(0, size -1);
		}
		
		// adiciona o primeiro "(" para ser de referencia para o usuario
		else if (btnVal == 'cos' || btnVal == 'sin' || btnVal == 'tg' || btnVal == 'log' || btnVal == '√') {
			input.innerHTML += btnVal + '(';
		}
		
		// operação de igualdade, calcula e mostra o valor recebeido
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			//se '^' for clickado, fazer essa operação.
			if (inputVal.match(/ˆ/)) {
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
		
		
		// Basic functionality of the calculator is complete. But there are some problems like 
		// 1. No two operators should be added consecutively.
		// 2. The equation shouldn't start from an operator except minus
		// 3. not more than 1 decimal should be there in a number
		
		// We'll fix these issues using some simple checks
		
		// indexOf works only in IE9+
		else if(operators.indexOf(btnVal) > -1) {
			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus if the string is empty
			if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				if (operators.indexOf(lastChar) == 'sin' || operators.indexOf(lastChar) == 'cos' || operators.indexOf(lastChar) == 'tg' || operators.indexOf(lastChar) == 'pow' || operators.indexOf(lastChar) == 'sqr' || operators.indexOf(lastChar) == 'log' ) {
					input.innerHTML += btnVal;
				}
				//Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		
		// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
		else if(btnVal == '·') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnVal;
		}
		
		// prevent page jumps
		e.preventDefault();
	}
}
