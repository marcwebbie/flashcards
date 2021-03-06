var text = "";
var letter = "";
var speed = 0;
var text_words = [];
var current_word_index = -1;
var interval = null;
var current_words = [];
var speed_milliseconds = 0;
var read_by_lines = false;
var from_dictionary = false;

var qs = function(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
};


var applyColor = function(text, charToColor){
  return text;
};

var setBigWord = function(word, letter) {
  var coloredWord = applyColor(word, letter);
  $(".bigtext .word").html(coloredWord);
  $(".bigtext").fitText();
};

var read = function(){
  if (current_word_index < text_words.length){
    setBigWord(text_words[current_word_index++]);
  }
  else{
    clearInterval(interval);
  }
};

var readAutomatically = function(text_words, speed){
  minute = 1000 * 60;
  speed_milliseconds = minute / speed;
  interval = setInterval(read, speed_milliseconds);
};

var updateSpeed = function(speed) {
  clearInterval(interval);
  readAutomatically(text_words, speed);
};

var isInt = function(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
};

var shuffle = function(a) {
  a = a.slice(0);
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
};

var getDictionary = function(letterToFilter) {
  var dict_words = words;
  if (letterToFilter){
    dict_words = dict_words.filter(function(w) {
      return w[0].indexOf(letterToFilter) !== -1;
    });
  }
  return shuffle(dict_words);
};


$(document).ready(function() {
  text = qs("text");
  speed = qs("speed");
  letter = qs("letter");
  read_by_lines = qs("lines");
  from_dictionary = qs("dict");
  if (from_dictionary == "true"){
    text_words = getDictionary(letter);
  }
  else if (read_by_lines == "true"){
    text_words = text.match(/[^\r\n]+/g);
  }
  else{
    text_words = text.split(" ");
  }
  current_word_index = 0;
  if (isInt(speed)){
    readAutomatically(text_words, speed);
  }
  else{
    setBigWord(text_words[current_word_index++], letter);
  }
});

// Enter: 13
// Up: 38
// Down: 40
// Right: 39
// Left: 37
// Esc: 27
// SpaceBar: 32
// Ctrl: 17
// Alt: 18
$(document).keyup(function(e) {
  if (e.which === 39) {
    if (current_word_index < text_words.length){
      word = text_words[++current_word_index];
      setBigWord(word, letter);
    }
  }
  if (e.which === 38) {
    speed += 25;
    console.log("new speed: " + speed);
    updateSpeed(speed);
  }
  if (e.which === 37) {
    if (current_word_index > 0) {
      word = text_words[--current_word_index];
      setBigWord(word, letter);
    }
  }
  if (e.which === 40) {
    speed -= 25;
    console.log("new speed: " + speed);
    updateSpeed(speed);
  }
});
