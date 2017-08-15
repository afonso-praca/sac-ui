angular.module('ticketList', [])
  .controller("TicketListController", function($scope, TicketListService) {

    var self = this;
    $scope.tickets = [];

    self.startModule = function() {
      console.log("Ticket List Started!");
      TicketListService.getTickets().then(function (data) {
        console.log(data);
        $scope.tickets = data;
      }, function (error) {
        throw new Error(error);
      });
    };

    $scope.editTicket = function(tpRule, rule) {

    };

    self.startModule();
  });
