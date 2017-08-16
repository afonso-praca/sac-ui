angular.module('ticketDetail', [])
  .controller("TicketDetailController", function($scope, $location,
                                                 ticket, TicketDetailService) {

    // PUTS RECEIVED TICKET ON SCOPE
    $scope.ticket = ticket;

    $scope.saveTicket = function (ticket) {
      TicketDetailService.saveTicket(ticket).then(function () {
        // GO TO TICKET LIST AFTER SAVE
        $location.path('/#!/tickets');
      });
    };
  });