let incomeField = document.getElementById('income_field');

/*
données:
- epargne (par periode)
- periode (an, mois)
- nbperiodestotal (pour limiter le nombre de lignes)
- rendementperiode

pour chaque periode:
versementscumules = epargne X nbperiodes
capitalperiode = totalperiode -1 + epargne
interetsperiode = capitalperiode X rendementperiode
totalperiode = capitalperiode + intéretsperiode
interetscumules = totalperiode - versementscumules

*/
