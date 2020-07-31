//definir variable calculadora
var calculadora = {
  pantalla: document.getElementById("display"),
  valorPantalla: "0",
  operacion: "",
  primerValor: 0,
  segundoValor: 0,
  finalValor: 0,
  resultado: 0,
  auxTeclaIgual: false,

  init: (function (){
    this.asignarEventosBotones(".tecla");
    this.asignarEventosFuncion();
  }),

  //Eventos con los botones de la calculadora
  asignarEventosBotones: function(selector){
    var x = document.querySelectorAll(selector);
    for (var i = 0; i < x.length; i++){
      x[i].onmouseover = this.eventoReduceBoton;
      x[i].onmouseleave = this.eventoRegresaBoton;
    };
  },

  eventoReduceBoton: function(event){
    calculadora.reduceBoton(event.target);
  },
  eventoRegresaBoton: function(event){
    calculadora.aumentaBoton(event.target);
  },

  //Formato de los Botones
  reduceBoton: function(elemento){
    var x = elemento.id;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto"){
      elemento.style.width = "28%";
      elemento.style.height = "62px";
    }else if (x=="signoMas") {
      elemento.style.width = "88%";
      elemento.style.height = "98%";
    }else {
      elemento.style.width = "21%";
      elemento.style.height = "62px";
    }
  },

  aumentoBoton: function(elemento){
    var x = elemento.id;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto"){
      elemento.style.width = "29%";
      elemento.style.height = "62.91px";
    }else if (x=="signoMas") {
      elemento.style.width = "90%";
      elemento.style.height = "100%";
    }else {
      elemento.style.width = "22%";
      elemento.style.height = "62.91px";
    }
  },

  //Asignar eventos en la calculadora
  asignarEventosFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarDisplay();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.mostrarResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},

  borrarPantalla: function() {
    this.valorPantalla = "0";
    this.operacion = "";
    this.primerValor = 0;
    this.segundoValor = 0;
    this.finalValor = 0;
    this.resultado = 0;
    this.auxTeclaIgual = false;
    this.actualizaPantalla();
  },

  cambiarSigno: function(){
    if (this.valorPantalla != "0"){
      var aux;
      if (this.valorPantalla.charAt(0)=="-"){
        aux = this.valorPantalla.slice(1);
      }else {
        aux = "-" + this.valorPantalla;
      }
    this.valorPantalla = "";
    this.valorPantalla = aux;
    this.actualizaPantalla();
    }
  },

  ingresoDecimal: function(){
    if (this.valorPantalla.indexOf(".")== -1){
      if (this.valorPantalla == ""){
        this.valorPantalla = this.valorPantalla + "0.";
      }else {
        this.valorPantalla = this.valorPantalla + ".";
      }
      this.actualizaPantalla();
    }
  },

  ingresoNumero: function(valor){
    if (this.valorPantalla.length < 8){
      if (this.valorPantalla== "0"){
        this.valorPantalla = "";
        this.valorPantalla = this.valorPantalla + valor;
      }else{
        this.valorPantalla = this.valorPantalla + valor;
      }
      this.actualizaPantalla();
    }
  },

  ingresoOperacion: function(operador){
    this.primerValor = parseFloat(this.valorPantalla);
    this.valorPantalla = "";
    this.operacion = operador;
    this.auxTeclaIgual = false;
    this.actualizaPantalla();
  },

  //Menu operaciones matemáticas
  realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},

  mostrarResultado: function(){
    if(!this.auxTeclaIgual){
  			this.segundoValor = parseFloat(this.valorPantalla);
  			this.ultimoValor = this.segundoValor;
  			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
  		}else{
  			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
  		}
      this.primerValor = this.resultado;
  		this.valorPantalla = "";
  		if (this.resultado.toString().length < 9){
  			this.valorPantalla = this.resultado.toString();
  		}else{
  			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
  		}
  		this.auxTeclaIgual = true;
  		this.actualizaPantalla();
  },

  actualizaPantalla: function(){
    this.pantalla.innerHTML = this.valorPantalla;
  },
};

calculadora.init();
