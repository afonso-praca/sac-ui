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

    self.getTicketsGrouped = function () {
      var defer = $q.defer();
      var tickets = [];
      self.getTickets().then(function (response) {
        tickets = response;
        var ticketsGroupedByDate = _.groupBy(tickets, function (ticket) {
          return $filter('date', 'M/d/yy')(ticket.createdAt);
        });
        ticketsGroupedByDate = _.reduce(ticketsGroupedByDate, function (memo, tickets, date) {
          memo[date] = _.groupBy(tickets, function (ticket) {
            return ticket.state;
          });
          return memo;
        }, {});
        _.each(ticketsGroupedByDate, function (states, dateKey) {
          _.each(states, function (tickets, stateKey) {
            ticketsGroupedByDate[dateKey][stateKey] = _.sortBy(ticketsGroupedByDate[dateKey][stateKey], 'createdAt').reverse();
          });
        });
        defer.resolve(ticketsGroupedByDate);
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