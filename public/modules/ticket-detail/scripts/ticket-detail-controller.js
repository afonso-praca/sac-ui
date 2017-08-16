angular.module('ticketDetail', [])
  .controller("TicketDetailController", function($scope, ticket) {

    var self = this;
    $scope.ticket = ticket;

    self.startModule = function() {
      console.log("Ticket Detail Started!");
    };

    $scope.saveTicket = function(tpRule, rule) {

    };

    self.startModule();
  });
