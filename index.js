




/*
Calculette

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

function launchTableComputationAndDisplay()
{
  console.log(document.getElementById('capitalDepart').value);

  let capitalDepart = Number(document.getElementById('capitalDepart').value);
  let epargneParPeriode = Number(document.getElementById('epargneParPeriode').value);
  let rendementParPeriode = Number(document.getElementById('rendementParPeriode').value)/100;
  let nbPeriodesTotal = Number(document.getElementById('nbPeriodesTotal').value);
  let choixFrequence = document.getElementById('frequence').value
  if(choixFrequence == "mensuelle")
  {
    rendementParPeriode = Math.pow(rendementParPeriode+1, 1.0 / 12) - 1.0;
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



/*
DCF

données:
- valeurs à actualiser
- durée de détention
- résultat de la 1ere année
- croissance annuelle
- taux sans risque
- taux avec risque

pour chaque periode:
flux(periode) = flux1 * Math.pow(1+croissanceFlux;periode)
fluxActualise=flux/Math.pow(1+tauxRisque+tauxSansRisque,periode)

prix de revente:
prixRevente=flux(derniereperiode)/croissanceFlux
prixReventeActualise=prixRevente/Math.pow(1+tauxRisque+tauxSansRisque;nbPeriodes)

capitalisationCible = somme des flux + revente
prixCible=capitalisationCible/nombreParts
potentiel=(prixCible-cours)/prixCible

*/

function calculerFluxPeriode(flux1, croissanceFlux, nbPeriodes)
{
      var tableFlux = [flux1];
      for (var periode = 1; periode <= nbPeriodes; i++) {
          tableFlux.push(table[periode-1] * (1+croissanceFlux));
      }
      return tableFlux;
}
var tableFlux=calculerFluxPeriode(flux1, croissanceFlux, nbPeriodes);

function calculerFluxPeriodeActualise(tableFlux, tauxSansRisque, tauxRisque)
{
      var tableFluxActualise = [fluxActualise1];
      for (var periode = 1; periode <= nbPeriodes; i++) {
          tableFluxActualise.push(table[periode]) /Math.pow(1+tauxSansRisque+tauxRisque,periode);
      }
      return tableFluxActualise;
}
var tableFluxActualise=calculerFluxPeriode(tableFlux, tauxSansRisque, tauxRisque);

function calculerPrixRevente (tableFlux, cours, nombreParts, flux1)
{
    return tableFlux [[tableFlux.length-1]]*(cours*nombreParts/flux1);
}
var prixRevente=calculerPrixRevente(tableFlux, tauxSansRisque, tauxRisque);

function calculerPrixReventeActualise (prixRevente, tauxSansRisque, tauxRisque)
{
    return prixRevente/Math.pow(1+tauxSansRisque+tauxRisque,nbPeriodes);
  }
var prixReventeActualise=calculerPrixReventeActualise(prixRevente, tauxSansRisque, tauxRisque);

function calculerTotalFluxActualises (tableFluxActualise)
{
        var totalFluxActualises=0
        for (var periode = 1; periode <= nbPeriodes; i++) {totalFluxActualises + tableFluxActualise.push(table[periode]);
        }
        return totalFlux;
}

function calculerCapitalisationCible (totalFlux, prixReventeActualise)
{
  return totalFluxActualises + prixReventeActualise;
}

function calculerPrixnCible (totalFlux, prixReventeActualise, nombreParts)
{
  return (totalFlux + prixReventeActualise)/nombreParts;
}

function launchTableComputationAndDisplayDCF()
{
  let flux1 = Number(document.getElementById('flux1').value);
  let nbPeriodes = Number(document.getElementById('nbPeriodes').value);
  let cours = Number(document.getElementById('cours').value);
  let nombreParts = Number(document.getElementById('nombreParts').value);
  let croissanceFlux = Number(document.getElementById('croissanceFlux').value)/100;
  let tauxRisque = Number(document.getElementById('tauxRisque').value)/100;
  let tauxSansRisque = Number(document.getElementById('tauxSansRisque').value)/100;
}
