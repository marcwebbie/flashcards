var text = "";
var speed = 0;
var text_words = [];
var current_word_index = -1;
var interval = null;
var current_words = [];
var speed_milliseconds = 0;

var qs = function(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
};


var setBigWord = function(word) {
  $(".bigtext>.word").html(word);
  // $(".bigtext").bigtext();
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


$(document).ready(function() {
  text = qs("text");
  speed = qs("speed");
  read_by_lines = qs("lines");
  if (read_by_lines == "true"){
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
    setBigWord(text_words[current_word_index++]);
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
      setBigWord(word);
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
      setBigWord(word);
    }
  }
  if (e.which === 40) {
    speed -= 25;
    console.log("new speed: " + speed);
    updateSpeed(speed);
  }
});
