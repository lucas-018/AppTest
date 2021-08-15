




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
  let rendementParPeriode = Number(document.getElementById('rendementParPeriode').value);
  let nbPeriodesTotal = Number(document.getElementById('nbPeriodesTotal').value);

  table = calculerTableau(capitalDepart, epargneParPeriode, rendementParPeriode, nbPeriodesTotal);

  var htmlTable = document.getElementById("resultTable");

  var newTBody = document.createElement('tbody');
  newTBody.setAttribute("id", "resultBody")

  for (var i = 0; i < table.versementsCumules.length; i++) {
    var row = document.createElement("TR");

    var indexCell = document.createElement("TD");
    var versementsCumulesCell = document.createElement("TD");
    var capitalCell = document.createElement("TD");
    var interetsCell = document.createElement("TD");
    var totalCell = document.createElement("TD");
    var interetsCumulesCell = document.createElement("TD");

    row.appendChild(indexCell);
    row.appendChild(versementsCumulesCell);
    row.appendChild(capitalCell);
    row.appendChild(interetsCell);
    row.appendChild(totalCell);
    row.appendChild(interetsCumulesCell);

    indexCell.appendChild(document.createTextNode(i));
    versementsCumulesCell.appendChild(document.createTextNode(table.versementsCumules[i]));
    capitalCell.appendChild(document.createTextNode(table.capital[i]));
    interetsCell.appendChild(document.createTextNode(table.interets[i]));
    totalCell.appendChild(document.createTextNode(table.total[i]));
    interetsCumulesCell.appendChild(document.createTextNode(table.interetsCumules[i]));

    newTBody.appendChild(row);
  }

  var oldTBody = document.getElementById("resultBody");
  oldTBody.parentNode.replaceChild(newTBody, oldTBody)

}
