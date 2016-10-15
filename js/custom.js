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

var toggleDefault = function (arabic) {
  if (arabic !== undefined){
    $(".flashcard.arabic").show();
    $(".flashcard.english").hide();
  }
  $(".flashcard.arabic").toggle();
  $(".flashcard.english").toggle();
};

var setHammers = function() {
  hammertime_arabic = new Hammer($(".flashcard.arabic")[0], {});
  hammertime_english = new Hammer($(".flashcard.english")[0], {});
  // hammertime_arabic.on('press', function(ev) {
  //   console.log(ev);
  //   toggleDefault();
  //   setHammers();
  // });
  hammertime_arabic.on('swiperight', function(ev) {
    setRandomWords(qs('letter') || qs('q'));
    setHammers();
  });
  hammertime_arabic.on('swipeleft', function(ev) {
    setRandomWords(qs('letter') || qs('q'));
    setHammers();
  });
};



// $(".flashcard").on("click", function(){
//   $(".flashcard.arabic").toggle();
//   $(".flashcard.english").toggle();
// });

$(document).ready(function() {
  setRandomWords(qs('letter') || qs('q'));
  setBigText();
  $(".flashcard.english").toggle();
  setHammers();
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
