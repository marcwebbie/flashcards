var setRandomWords = function(letter){
  wordlist = words;
  if (letter != undefined){
    wordlist = words.filter(function(word) {
      return word[0].indexOf(letter) !== -1;
    });
  };
  word = wordlist[Math.floor(Math.random() * wordlist.length)];
  arabic = word[0];
  english = word[1];
  $(".text.arabic").html(arabic);
  $(".text.english").html(english);
};

var setBigText = function () {
  $('.flashcard.arabic').bigtext();
  $('.flashcard.english').bigtext();
};

var qs = function(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
};

$(".flashcard").on("click", function(){
  $(".flashcard.arabic").toggle();
  $(".flashcard.english").toggle();
});

$(document).ready(function() {
  queryLetter = qs('letter') || qs('q');
  setRandomWords(queryLetter);
  setBigText();
  $(".flashcard.english").toggle();
});


// // Copy words from http://1000mostcommonwords.com/1000-most-common-arabic-words/
// var words = [];
// jQuery(".entry-content tr").each(function(i, elem){
//   if (i > 0){
//     td = jQuery(elem).find("td");
//     arabic = jQuery(td[1]).text();
//     english = jQuery(td[2]).text();
//     words.push([arabic, english]);
//   }
// });
