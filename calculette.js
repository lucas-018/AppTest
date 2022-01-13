




/*
données:
- epargne (par periode)
- periode (an, mois)
- nbPeriodesTotal (pour limiter le nombre de lignes)
- rendementParPeriode
-capitalDepart


pour chaque periode:

versementsCumules[nbPeriodes] = epargne X nbPeriodes
capitalperiode[nbPeriodes] = totalperiode[nbPeriodes - 1] + epargne
interetsPeriode[nbPeriodes] = capitalperiode[nbPeriodes] X rendementperiode
totalperiode[nbPeriodes] = capitalperiode[nbPeriodes] + intéretsperiode[nbPeriodes]
interetscumules[nbPeriodes] = totalperiode[nbPeriodes] - versementscumules[nbPeriodes]

*/


function calculerVersementsCumulesPeriode(epargneParPeriode, versementsCumulesPrecedents)
{
      return versementsCumulesPrecedents + epargneParPeriode;
}

function calculerCapitalPeriode(epargneParPeriode, totalPeriodePrecedente)
{
  return totalPeriodePrecedente + epargneParPeriode;
}

function calculerInteretsPeriode(capitalPeriode, rendementParPeriode)
{
  return capitalPeriode * rendementParPeriode;
}

function calculerTotalPeriode(interetsPeriode, capitalPeriode)
{
  return capitalPeriode + interetsPeriode;
}

function calculerInteretsCumulesPeriode(totalPeriode, versementsCumules)
{
  return totalPeriode - versementsCumules;
}

function calculerTableau(capitalDepart, epargneParPeriode, rendementParPeriode, nbPeriodesTotal)
{
  let table = {
  versementsCumules: [capitalDepart],
  capital: [capitalDepart],
  interets : [0],
  total : [capitalDepart],
  interetsCumules : [0]
  };

  console.log(table);
  console.log(table.versementsCumules.length)

  for(let nbPeriodes = 1; nbPeriodes < nbPeriodesTotal+1; nbPeriodes++)
  {
    table.versementsCumules.push(calculerVersementsCumulesPeriode(epargneParPeriode, table.versementsCumules[nbPeriodes - 1]));

    table.capital.push(calculerCapitalPeriode(epargneParPeriode, table.total[nbPeriodes - 1]));

    table.interets.push(calculerInteretsPeriode(table.capital[nbPeriodes], rendementParPeriode));

    table.total.push(calculerTotalPeriode(table.interets[nbPeriodes], table.capital[nbPeriodes]));

    table.interetsCumules.push(calculerInteretsCumulesPeriode(table.total[nbPeriodes], table.versementsCumules[nbPeriodes]));
  }


  return table;
}

function lanchTableComputationAndDisplay()
{
  console.log(document.getElementById('capitalDepart').value);

  let capitalDepart = Number(document.getElementById('capitalDepart').value);

  let epargneParPeriode = Number(document.getElementById('epargneParPeriode').value);
  let rendementParPeriode = Number(document.getElementById('rendementParPeriode').value)/100;
  let nbPeriodesTotal = Number(document.getElementById('nbPeriodesTotal').value);
  let choixFrequence = document.getElementById('frequence').value
  if(choixFrequence == "mensuelle")
  {
    rendementParPeriode = rendementParPeriode/12
    nbPeriodesTotal = nbPeriodesTotal*12
  }

  table = calculerTableau(capitalDepart, epargneParPeriode, rendementParPeriode, nbPeriodesTotal);

  var htmlTable = document.getElementById("resultTable");

  var newTBody = document.createElement('tbody');
  newTBody.setAttribute("id", "resultBody")

  for (var i = 1; i < table.versementsCumules.length; i++) {
    var row = document.createElement("TR");

    var indexCell = document.createElement("TD");
    var versementsCumulesCell = document.createElement("TD");
    var capitalCell = document.createElement("TD");
    var interetsCell = document.createElement("TD");
    var totalCell = document.createElement("TD");
    var interetsCumulesCell = document.createElement("TD");

    row.appendChild(indexCell);
    row.appendChild(capitalCell);
    row.appendChild(interetsCell);
    row.appendChild(versementsCumulesCell);
    row.appendChild(interetsCumulesCell);
    row.appendChild(totalCell);

    indexCell.appendChild(document.createTextNode(i));
    versementsCumulesCell.appendChild(document.createTextNode(Number(table.versementsCumules[i]).toFixed(2)));
    capitalCell.appendChild(document.createTextNode(Number(table.capital[i]).toFixed(2)));
    interetsCell.appendChild(document.createTextNode(Number(table.interets[i]).toFixed(2)));
    totalCell.appendChild(document.createTextNode(Number(table.total[i]).toFixed(2)));
    interetsCumulesCell.appendChild(document.createTextNode(Number(table.interetsCumules[i]).toFixed(2)));

    newTBody.appendChild(row);
  }

  var oldTBody = document.getElementById("resultBody");
  oldTBody.parentNode.replaceChild(newTBody, oldTBody)

  document.getElementById("capitalFinal").value = Number(table.total[nbPeriodesTotal]).toFixed(2);
  //capitalFinal.value = "hello";//table.total[nbPeriodes-1];

  document.getElementById("resultatVersements").innerHTML = "<p>Le total de vos versements: &nbsp;" + Number(table.versementsCumules[nbPeriodesTotal]).toFixed(2) + "</p>";

  //document.getElementById("resultatInterets").innerHTML;
  document.getElementById("resultatInterets").innerHTML = "<p>Le total des intérêts reçus: &nbsp;" + Number(table.interetsCumules[nbPeriodesTotal]).toFixed(2) + "</p>";
}
