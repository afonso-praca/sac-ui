angular.module('ticketList', [])
  .controller("TicketListController", function($scope, $route,
                                               TicketListService, tickets) {

    $scope.tickets = tickets;

    $scope.deleteTicket = function (id) {
      console.log("delete id = " + id);
      TicketListService.deleteTicket(id).then(function () {
        $route.reload();
      });
    };

  });
