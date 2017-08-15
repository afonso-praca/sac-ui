angular.module('ticketList', [])
  .controller("TicketListController", function($scope) {

    var self = this;

    self.startModule = function() {
      console.log("Ticket List Started!")
    };

    $scope.editTicket = function(tpRule, rule) {

    };

    self.startModule();
  });
