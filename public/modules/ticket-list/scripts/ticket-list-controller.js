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

    $scope.deleteTicket = function (id) {
      console.log("delete id = " + id);
      TicketListService.deleteTicket(id).then(function () {
        self.startModule();
      });
    };

    self.startModule();
  });
