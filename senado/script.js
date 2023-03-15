fetch('proposicoesSenadoFinal.json')
.then(function(response){
    return response.json()
})
.then(function(proposicoes){
    let placeholder=document.querySelector('#data-output');
    let out='';
    for(let proposicao of proposicoes){
        out+=`
            <tr>
                <td>${proposicao.Proposta}</td>
                <td>${proposicao.Temas}</td>
                <td>${proposicao.Ementa}</td>
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
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
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