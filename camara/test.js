function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    var j;
    j=0;
    if (busca=='temas'){
        j=0;
    }
    else if (busca=='ementa'){
      j=1;
    }
    else if (busca=='tipo'){
      j=2;
    }
    else if (busca=='ano'){
      j=3;
    }
    else if (busca=='acompanhe'){
      j=4;
    }

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  var busca;
  
  function temas(){
    busca='temas';
  }
  
  function ementa(){
    busca='ementa';
  }

  function tipo(){
    busca='tipo';
  }
  
  function ano(){
    busca='ano';
  }
  
  function autor(){
    busca='autor';
  }
  
  function cargo(){
    busca='cargo';
  }
  
  function partido(){
    busca='partido';
  }



// api url
const api_url =
	"https://dadosabertos.camara.leg.br/api/v2/proposicoes?dataInicio=2022-01-01&ordem=ASC&ordenarPor=id";

// Defining async function
async function getapi(url) {
	
	// Storing response
	const response = await fetch(url, {headers:{'Accept':'application/json'}});
	
	// Storing data in form of JSON
	var data = await response.json();
	console.log(data);

    return data
}

// Calling that async function
data=getapi(api_url);

let tab =
    `<tr>
    <th>Temas</th>
    <th>Ementa</th>
    <th>Tipo</th>
    <th>Ano</th>
    <th>Acompanhe</th>
    </tr>`

data.then(
    function(value){
        for (let i of value.dados){
            codigo=i.id;
            api_url_temas='https://dadosabertos.camara.leg.br/api/v2/proposicoes/'+codigo+'/temas';
            api_url_autores='https://dadosabertos.camara.leg.br/api/v2/proposicoes/'+codigo+'/autores';
            temas=getapi(api_url_temas);
            autores=getapi(api_url_autores);

            temas.then(
                function(value){
                    for (j of value.dados){
                        //autores.then(
                            //function(value){
                                //for (k of value.dados){
                                    //if (k.tipo=='Deputado'){
                                        tab+=`
                                        <tr>
                                        <td>${j.tema}</td>
                                        <td>${i.ementa}</td>
                                        <td>${i.siglaTipo}</td>
                                        <td>${i.ano}</td>
                                        <td>${i.uri}</td>
                                        </tr>`
                                    //}
                                //}
                                document.getElementById("myTable").innerHTML = tab;
                            //}
                        //)
                    }
                }
            )
        }
    }
)