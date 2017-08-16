angular.module('ticketDetail')
  .service('TicketDetailService', function($q, $http, TicketModel){
    var self = this;
    self.baseAPIUrl = "http://localhost:8080";

    self.getTicket = function(id){
      var defer = $q.defer();
      // GETS TICKET FROM API OR RETURN AN EMPTY MODEL
      if (id && id !== 'new'){
        $http({
          method: 'GET',
          url: self.baseAPIUrl + "/ticket/" + id,
          cache: false
        }).then(function (response) {
          if (response && response.data){
            defer.resolve(new TicketModel(response.data));
          } else {
            defer.reject(new Error());
          }
        }, function (error) {
          defer.reject(new Error(error));
        });
      } else {
        defer.resolve(new TicketModel())
      }
      return defer.promise;
    };

    self.createNewTicket = function (ticketToSend, defer) {
      // DELETE DATA THAT WE SHOULD NOT SEND IN A NEW TICKET
      delete ticketToSend.id;
      delete ticketToSend.createdAt;
      $http({
        method: 'POST',
        url: self.baseAPIUrl + "/ticket/",
        cache: false,
        data: ticketToSend
      }).then(function (response) {
        if (response){
          defer.resolve();
        } else {
          defer.reject(new Error());
        }
      }, function (error) {
        defer.reject(new Error(error));
      });
    };

    self.updateTicket = function (ticketToSend, defer) {
      $http({
        method: 'PUT',
        url: self.baseAPIUrl + "/ticket/" + ticketToSend.id,
        cache: false,
        data: ticketToSend
      }).then(function (response) {
        if (response){
          defer.resolve();
        } else {
          defer.reject(new Error());
        }
      }, function (error) {
        defer.reject(new Error(error));
      });
    };

    self.saveTicket = function (ticket) {
      var defer = $q.defer();
      // CLONE RECEIVED DATA TO PREVENT CHANGES ON ORIGINAL OBJECT
      var ticketToSend = angular.copy(ticket);
      // CREATE OR UPDATE A TICKET
      if (ticketToSend.id === null){
        self.createNewTicket(ticketToSend, defer);
      } else {
        self.updateTicket(ticketToSend, defer);
      }
      return defer.promise;
    };
  });