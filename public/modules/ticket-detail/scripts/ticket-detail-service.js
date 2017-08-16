angular.module('ticketDetail')
  .service('TicketDetailService', function($q, $http, TicketModel){
    var self = this;
    self.baseAPIUrl = "http://localhost:8080";

    self.getTicket = function(id){
      var defer = $q.defer();
      if (id && id !== 'new'){
        $http({
          method: 'GET',
          url: self.baseAPIUrl + "/ticket/" + id,
          cache: false
        }).then(function (response) {
          if (response && response.data){
            defer.resolve(new TicketModel(response.data));
          } else {
            defer.reject(new Error("Unexpected body response"));
          }
        }, function (error) {
          defer.reject(new Error(error));
        });
      } else {
        defer.resolve(new TicketModel())
      }
      return defer.promise;
    };

    self.saveTicket = function (ticket) {
      // creates or updates a ticket
      var defer = $q.defer();
      var ticketToSend = angular.copy(ticket);
      if (ticket.id === null){
        delete ticketToSend.id;
        delete ticketToSend.createdAt;
        $http({
          method: 'POST',
          url: self.baseAPIUrl + "/ticket/",
          cache: false,
          data: ticketToSend
        }).then(function (response) {
          if (response && response.data){
            defer.resolve(true);
          } else {
            defer.reject(new Error("Unexpected body response"));
          }
        }, function (error) {
          defer.reject(new Error(error));
        });
      } else {
        $http({
          method: 'PUT',
          url: self.baseAPIUrl + "/ticket/" + ticket.id,
          cache: false,
          data: ticketToSend
        }).then(function (response) {
          if (response){
            defer.resolve(true);
          } else {
            defer.reject(new Error("Unexpected body response"));
          }
        }, function (error) {
          defer.reject(new Error(error));
        });
      }
      return defer.promise;
    };
  });
