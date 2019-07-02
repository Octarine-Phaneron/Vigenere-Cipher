# JavaScript - Vigenère Cipher

Try it [HERE](https://raw.githack.com/Octarine-Phaneron/Vigenere-Cipher/master/)


Code : 
```javascript
window.onload = function(){

  // Get html elements
  let clearTextArea = document.getElementById("clear");
  let encryptedTextArea = document.getElementById("encrypted");
  let shiftValueInput = document.getElementById("shiftValue");

  // init default values
  // set ASCII constants
  const a = 97;
  const z = 122;
  const A = 65;
  const Z = 90;
  let shiftValue = 0;
  let clearText = "";
  let encryptedText = "";

  // starts the loop to check if anything's changed every 1.5s.
  let loop = setInterval(check, 1500);

  /* Checks the value given by the user, if it's a number
   * sets it as is, if it's not, sets 0 */
  function setShiftValue(){
    if( isNaN( parseInt(shiftValueInput.value) ) ){
      return 0;
    }
    return parseInt(shiftValueInput.value);
  }

  /* Checks if the text has changed, if it has,
   * gets the new text and sends it to the encrypt function  */
  function check(){
    // Removes diacritics
    normalizedClearText = clearTextArea.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if( clearText != normalizedClearText || shiftValue != setShiftValue() ){
        shiftValue = setShiftValue();
        clearText = normalizedClearText
        encryptedText = encrypt(clearText);
        encryptedTextArea.value = encryptedText;
    }
  }
    /* For each letter of the clear text, checks what it's ASCII code is. then shifts it's value accordingly.
     * Returns encrypted text */
  function encrypt(clearText){
      let tempEncrypted = "";
      let charAscii;
      for(let i = 0; i < clearText.length; i++){
        char = clearText.charAt(i);
        // if char i is a lowercase letter
        if( char.charCodeAt(0) >= a && char.charCodeAt(0) <= z ){
          char = shift( char, a, z );
        }
        // else if it is an uppercase letter
        else if( char.charCodeAt(0) >= A && char.charCodeAt(0) <= Z ){
          char = shift( char, A, Z);
        }
        // Other chars aren't encrypted
        tempEncrypted += char;
      }
      return tempEncrypted;
  }

    /* For a given char ASCII code, returns a char
    *  equals to the shifted ASCII code value.
    *  if the shifted value is out of the defined boundaries
    * ( <minValue || >maxValue), the value is set by looping
    * through the given range ( if min=10 & max=20, 25
    * becomes 14). */
  function shift( char, minValue, maxValue ){
      charCode = char.charCodeAt(0)
      charCode += shiftValue;
      while(charCode > maxValue){
        charCode = minValue + (charCode - maxValue) - 1;
      }
      while(charCode < minValue){
        charCode = maxValue - (minValue - charCode) + 1;
      }
      return String.fromCharCode(charCode);
  }

}

```

