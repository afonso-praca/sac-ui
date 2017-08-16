angular.module('ticketList', [])
  .controller("TicketListController", function($scope, $route,
                                               TicketListService, tickets) {

    // PUTS RECEIVED TICKETS ON SCOPE
    $scope.tickets = tickets;

    $scope.deleteTicket = function (id) {
      TicketListService.deleteTicket(id).then(function () {
        // RELOADS TICKET LIST AFTER DELETE
        $route.reload();
      });
    };

  });
