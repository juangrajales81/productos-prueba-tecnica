import 'bootstrap/dist/css/bootstrap.min.css';

function App() {  

  let tipo_productos = null;
  let http = new XMLHttpRequest();

  // De esta forma leemos el archivo JSON (tipo_de_producto.json) que 
  // contiene los tipos de productos

  http.open('get', 'tipo_de_producto.json', true);
  http.send();

  // Al momento de cargar la página, agregamos los tipos
  // de productos a los dos controles tipo select
  http.onload = function(){
    if(this.readyState === 4 && this.status === 200){
        tipo_productos = JSON.parse(this.responseText);        

        let tipos = '<option value="0">Selecciona un producto</option>';

        for(let item of tipo_productos){
            tipos += `
                <option value="${item.tipo}">${item.tipo}</option>
            `;
        }
        
        document.querySelector("#tipo_producto1").innerHTML = tipos;
        document.querySelector("#tipo_producto2").innerHTML = tipos;
        
    }
  }

  /**
 * Función para mostrar las opciones y variantes de un producto seleccionado 
 */
  function funcion1(){
    let valorSeleccionado = document.querySelector("#tipo_producto1").value;  
    let opciones = "";
    let opciones_html = "";
    for(let item of tipo_productos){
        if(item.tipo === valorSeleccionado){
                        
            opciones = item.opciones;
            
            for(let opcion in opciones){
                opciones_html += `
                    <div className="row">
                        <div className="col-md-4">
                            <b>Opción:</b> ${opcion}
                        </div>
                        <div className="col-md-4">
                            <b>Valores:</b> ${opciones[opcion]["valores"].join()}
                        </div>    
                    </div>
                `;                
            }
            
        }
    } 
    
    document.querySelector("#opciones_producto1").innerHTML = opciones_html;    

  }

  /**
  * Función para mostrar la estructura en tipo árbol de un producto
  */

  function funcion2(){
    let productoSeleccionado = document.querySelector("#tipo_producto2").value;
    let opcionSeleccionada = document.querySelector("#opcion_inicial").value;   
    
    
    let opcionesProductoSeleccionado = [];    
    let opcionesRaiz = [];
    let opcionesNodo = {};
    let arbol = {};
    for(let item of tipo_productos){        
        if(item.tipo === productoSeleccionado){
            opcionesProductoSeleccionado = item.opciones; 
            for(let opcion in opcionesProductoSeleccionado){                
                if(opcion === opcionSeleccionada){
                    opcionesRaiz = opcionesProductoSeleccionado[opcion].valores;                    
                }
                else {
                    opcionesNodo[opcion] = opcionesProductoSeleccionado[opcion].valores;
                }    
            }
        }   
    }
    

    arbol['opción'] = opcionSeleccionada;

    let tp = []
    for(let opcionRaiz of opcionesRaiz){
        tp.push(opcionRaiz);
    }
    arbol['valores'] = Object.assign(tp);
    console.log(arbol);

    /**
     * NOTA: No se logra completar esta parte, se buscó por medio de recursión
     * pero no se logró encontrar como opción para hacer nodos internos a partir
     * de un elemento interior de un arreglo
     */

    

    
  }

  /**
  * Función para llenar el control de lista de acuerdo al producto seleccionado
  * para la función 2
  */

  function opcionesProducto() {
    let valorSeleccionado = document.querySelector("#tipo_producto2").value;  
    let opciones = "";
    let opciones_html = '<option value="0">Selecciona una opción</option>';
    for(let item of tipo_productos){
        if(item.tipo === valorSeleccionado){
                        
            opciones = item.opciones;
            
            for(let opcion in opciones){                
                if(opciones[opcion]["estado"] !== "inactivo"){
                    opciones_html += `
                        <option value="${opcion}">${opcion}</option>
                    `;
                }            
            }
            
        } 
    }

    document.querySelector("#opcion_inicial").innerHTML = opciones_html;
  }


  return (
    <div className="App">
      <div className="container">
        <h1 className="mt-5 mb-5">Productos</h1>

        
        <h2 className="mb-3">Función 1</h2>        
        <div className="row">
            <div className="col-md-3">
                <label className="mb-3" htmlFor="tipo_producto1">Tipo de producto: </label>
                <select name="tipo_producto1" id="tipo_producto1" onChange={funcion1} className="form-select"></select>
            </div>
        </div>
       
        
        <div id="opciones_producto1" className="mt-3 mb-5"></div>
        <h2 className="mb-3">Función 2</h2>
        <div className="row">
            <div className="col-md-3">
                <label className="mb-3" htmlFor="tipo_producto2">Tipo de producto: </label>
                <select name="tipo_producto2" id="tipo_producto2" onChange={opcionesProducto} className="form-select"></select>
            </div>
            <div className="col-md-3">
                <label className="mb-3" htmlFor="opcion_inicial">Opción inicial: </label>
                <select name="opcion_inicial" id="opcion_inicial" onChange={funcion2} className="form-select"></select>
            </div>
        </div>
    </div>      
    </div>
  );
}

export default App;
