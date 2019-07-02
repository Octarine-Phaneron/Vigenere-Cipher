window.onload = function(){

  // Get html elements
  let clearTextArea = document.getElementById("clear");
  let encryptedTextArea = document.getElementById("encrypted");
  let keyInput = document.getElementById("key");

  // init default values
  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  const onlyLetters = new RegExp("[A-z\s]");
  let key = "";
  let clearText = "";
  let encryptedText = "";


  // starts the loop to check if anything's changed every 1s.
  let loop = setInterval(check, 1000);

  function setEncryptionKey(){
    if( onlyLetters.test(keyInput.value) ){
      return keyInput.value.replace(/\s/g,"");
    }
    return "";
  }

  /* Checks if the text/key have changed, if it has,
  * gets the new text and sends it to the encrypt function  */
  function check(){
    // Removes diacritics
    normalizedClearText = clearTextArea.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if( clearText != normalizedClearText || key != setEncryptionKey() ){
      if( setEncryptionKey() != "" ){
        key = setEncryptionKey();
        clearText = normalizedClearText;
        encryptedText = encrypt(clearText);
        encryptedTextArea.value = encryptedText;
      }
      else{
        encryptedTextArea.value = "";
      }
    }
  }
  /* For each letter of the clear text, checks if it's a letter.
  * Returns encrypted text */
  function encrypt(clearText){
    let tempEncrypted = "";
    let j = 0; // index to skip
    for(let i = 0; i < clearText.length; i++){
      char = clearText.charAt(i);
      // if char i is a letter
      if( char.match(/[A-z\\s]/)){
        keyChar = key[ j % key.length ];
        // Chiffré[i] = (Texte[i] + Clés[i]) modulo 26
        char = alphabet[ ( alphabet.indexOf(char.toLowerCase()) + alphabet.indexOf(keyChar) ) % alphabet.length ];
        // if char was uppercase => char.toUpperCase()
        char = (clearText.charAt(i) == clearText.charAt(i).toUpperCase() ? char.toUpperCase() : char);
        j++;
      }
      // Other chars aren't encrypted
      tempEncrypted += char;
    }
    return tempEncrypted;
  }

}
