angular.module("ticketList")
  .filter('toUpperLowerCase', function() {
    return function(input) {
      if (input.length > 2){
        var firstLetter = input.slice(0,1);
        var otherLetters = input.slice(1);
        return firstLetter + otherLetters.toLowerCase();
      }
      return input;
    };
  });
