fetch('proposicoesCamaraFinal.json')
.then(function(response){
    return response.json()
})
.then(function(proposicoes){
    let placeholder=document.querySelector('#data-output');
    let out='';
    for(let proposicao of proposicoes){
        out+=`
            <tr>
                <td>${proposicao.Temas}</td>
                <td>${proposicao.Ementa}</td>
                <td>${proposicao.Tipo}</td>
                <td>${proposicao.Ano}</td>
                <td>${proposicao.Autor}</td>
                <td>${proposicao.Cargo}</td>
                <td>${proposicao.Partido}</td>
                <td><div><a href='${proposicao.Link}'>${proposicao.Link}</a></div></td>
            </tr>
        `;
    }
    placeholder.innerHTML=out;
})

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
    else if (busca=='autor'){
      j=4;
    }
    else if (busca=='cargo'){
      j=5;
    }
    else if (busca=='partido'){
      j=6;
    }
    else if (busca=='acompanhe'){
      j=7;
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




  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
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

function acompanhe(){
  busca='acompanhe';
}