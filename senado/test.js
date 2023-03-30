function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    var j;
    j=0;
    if (busca=='proposta'){
      j=0;
    }
    //else if (busca=='temas'){
     // j=1;
   // }
    else if (busca=='ementa'){
      //j=2;
      j=1;
    }
    else if (busca=='ano'){
      //j=3;
      j=2;
    }
    else if (busca=='autor'){
      //j=4;
      j=3;
    }
    else if (busca=='cargo'){
      //j=5;
      j=4;
    }
    else if (busca=='partido'){
      //j=6;
      j=5;
    }
    //else if (busca=='acompanhe'){
      //j=7;
      //j=6;
    //}

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
  
  function proposta(){
    busca='proposta';
  }
  
  function ementa(){
    busca='ementa';
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
	"https://legis.senado.leg.br/dadosabertos/materia/tramitando?data=20220101";

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
    <th>Proposta</th>
    <th>Ementa</th>
    <th>Ano</th>
    <th>Autor</th>
    <th>Cargo</th>
    <th>Partido</th>
    </tr>`

data.then(
    function(value){
        for (let r of value.ListaMateriasTramitando.Materias.Materia) {
            const codigo=r.IdentificacaoMateria.CodigoMateria;
            const api_url_autoria="https://legis.senado.leg.br/dadosabertos/materia/autoria/"+codigo;
            const api_url_detalhe="https://legis.senado.leg.br/dadosabertos/materia/"+codigo;
            autoria_data=getapi(api_url_autoria);
            detalhes=getapi(api_url_detalhe);

            autoria_data.then(
                function(value){
                    for (let i of value.AutoriaMateria.Materia.Autoria.Autor){
                    //detalhes.then(
                        //function(value){
                                if (i.DescricaoTipoAutor=='Senador'){
                                    tab += 
                                    `<tr>
                                    <td>${r.IdentificacaoMateria.DescricaoIdentificacaoMateria}</td>
                                    <td>${r.Ementa}</td>
                                    <td>${r.IdentificacaoMateria.AnoMateria}</td>
                                    <td>${i.NomeAutor}</td>
                                    <td>${i.DescricaoTipoAutor}</td>
                                    <td>${i.IdentificacaoParlamentar.SiglaPartidoParlamentar}</td>
                                    </tr>`

                                    document.getElementById("myTable").innerHTML = tab;
                                }
                           // }
                   // )
                }
            }
            )
        }
        //console.log(value)
        //document.getElementById("myTable").innerHTML = tab;
    }
)