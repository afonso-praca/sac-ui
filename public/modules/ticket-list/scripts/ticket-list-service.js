angular.module('ticketList')
  .service('TicketListService', function($q, $http, $filter, TicketModel){
    var self = this;
    self.baseAPIUrl = "http://localhost:8080";

    self.getTickets = function(){
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: self.baseAPIUrl + "/tickets",
        cache: false
      }).then(function (response) {
        if (response && response.data){
          // MAPS RESPONSE TO TICKET MODELS
          defer.resolve(_.map(response.data, function (ticket) {
            return new TicketModel(ticket);
          }));
        } else {
          defer.reject(new Error());
        }
      }, function (error) {
        defer.reject(new Error(error));
      });
      return defer.promise;
    };

    self.getGroupedTickets = function () {
      var defer = $q.defer();
      var tickets = [];
      self.getTickets().then(function (response) {
        tickets = response;
        // GROUPS TICKETS BY DATE
        var groupedTicketsByDate = _.groupBy(tickets, function (ticket) {
          return $filter('date', 'M/d/yy')(ticket.createdAt);
        });
        // GROUP TICKETS BY DATE AND STATE
        var groupedTicketsByDateAndState = _.reduce(groupedTicketsByDate, function (memo, tickets, date) {
          memo[date] = _.groupBy(tickets, function (ticket) {
            return ticket.state;
          });
          // ORDER TICKETS BY DATE ON EACH STATE
          _.each(memo[date], function (tickets, stateKey) {
            memo[date][stateKey] = _.sortBy(memo[date][stateKey], 'createdAt').reverse();
          });
          return memo;
        }, {});
        defer.resolve(groupedTicketsByDateAndState);
      });

      return defer.promise;
    };

    self.deleteTicket = function(id){
      var defer = $q.defer();
      $http({
        method: 'DELETE',
        url: self.baseAPIUrl + "/ticket/" + id,
        cache: false
      }).then(function (response) {
        if (response){
          defer.resolve();
        } else {
          defer.reject(new Error());
        }
      }, function (error) {
        defer.reject(new Error(error));
      });
      return defer.promise;
    };
  });