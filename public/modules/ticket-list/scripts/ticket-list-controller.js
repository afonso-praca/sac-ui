angular.module('ticketList', [])
  .controller("TicketListController", function($scope, $route,
                                               TicketListService, ticketsOrdered) {

    // PUTS RECEIVED TICKETS ON SCOPE
    $scope.ticketsOrdered = ticketsOrdered;

    $scope.deleteTicket = function (id) {
      TicketListService.deleteTicket(id).then(function () {
        // RELOADS TICKET LIST AFTER DELETE
        $route.reload();
      });
    };

    $scope.hasTickets = function () {
      return Object.keys($scope.ticketsOrdered).length !== 0
    };
  });