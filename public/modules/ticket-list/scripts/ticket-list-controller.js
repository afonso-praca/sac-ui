angular.module('ticketList', [])
  .controller("TicketListController", function($scope, $route,
                                               TicketListService, groupedTickets) {

    // PUTS RECEIVED TICKETS ON SCOPE
    $scope.groupedTickets = groupedTickets;

    $scope.deleteTicket = function (id) {
      TicketListService.deleteTicket(id).then(function () {
        // RELOADS TICKET LIST AFTER DELETE
        $route.reload();
      });
    };

    // RETURNS A SORTED ARRAY OF THE KEYS OF AN OBJECT
    $scope.getKeysSorted = function (obj, reverse) {
      return reverse ? _.keys(obj).sort().reverse() : _.keys(obj).sort();
    };

    $scope.hasTickets = function () {
      return _.keys($scope.groupedTickets).length !== 0
    };
  });