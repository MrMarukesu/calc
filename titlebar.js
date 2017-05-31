flag= 0;
function abreP(val) {
    calc.display.value+=val;
    flag+=1;
}
function fechaP(valval) {
    calc.display.value+=valval;
    flag-=1;
}
function backspace(calc) {
    var size = input.innerHTML.length;
    input.innerHTML=input.innerHTML.substring(0,size-1);
}
function Clear(calc) {
    calc.display.value="";
    flag=0;
}
function cosseno() {
    flag+=1;
    calc.display.value+='cos(';
}
function seno() {
    flag+=1;
    calc.display.value+='sin(';
}
function tangente() {
    flag+=1;
    calc.display.value+='tan(';
}
function logaritimo() {
    flag+=1;
    calc.display.value+='log(';
}
function raiz() {
    flag+=1;
    calc.display.value+='sqrt(';
}
function exp_function() {
    flag+=1;
    calc.display.value+='exp(';
}
function fact(x) {
    factvar=1;
    for(i = 1; i<=x;i++) {
        factvar=factvar*i;
    }
    return factvar;
}
function fact_function(x) {
    flag+=1;
    calc.display.value+='fact(';
}
function power_function(x) {
    flag+=1;
    calc.display.value+='pow(';
    calc.display.value.replace(/pow/g, 'Math.pow');
}
function resultado(calc) {
    n = calc.display.value;
    var size = calc.display.value.lenght;
    var lastchar = calc.display.value.charAt(size)
    
    //Uses Math Functions
    
    n = n.replace(/cos/g, 'Math.cos').replace(/sin/g, 'Math.sin').replace(/tan/, 'Math.tan').replace(/log/g, 'Math.log').replace(/sqrt/g, 'Math.sqrt').replace(/exp/g, 'Math.exp').replace(/pow/g, 'Math.pow');
    
    if (flag!=0) {calc.display.value="error:paranthesis";}
    else {
        result = eval(n);
        calc.display.value=result;}
}
