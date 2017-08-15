angular.module('ticketList', [])
  .controller("TicketListController", function($scope, TicketListService) {

    var self = this;

    self.startModule = function() {
      console.log("Ticket List Started!");
      TicketListService.getTickets().then(function (data) {
        console.log(data);
      }, function (error) {
        throw new Error(error);
      });
    };

    $scope.editTicket = function(tpRule, rule) {

    };

    self.startModule();
  });
