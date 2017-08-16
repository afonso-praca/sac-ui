angular.module('ticketDetail', [])
  .controller("TicketDetailController", function($scope, $location,
                                                 ticket, TicketDetailService) {

    $scope.ticket = ticket;

    $scope.saveTicket = function (ticket) {
      console.log(ticket);
      TicketDetailService.saveTicket(ticket).then(function () {
        $location.path('/#!/tickets');
      });
    };

  });
