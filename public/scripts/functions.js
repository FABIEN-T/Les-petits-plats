// Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale
export function stringUpperCaseFirst(word) {  
  return stringNoAccent(word.charAt(0)).toUpperCase() + word.substring(1);
}

export function stringNoAccent(letter) {
    let accent = "áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
      noAccent = "aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
      letterNoAccent = "";
    letterNoAccent =
      accent.indexOf(letter) !== -1
        ? noAccent.charAt(accent.indexOf(letter))
        : letter;
    return letterNoAccent;
  }
