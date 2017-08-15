angular.module('ticketList')
  .service('TicketListService', function($q, $http, TicketModel){
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
          defer.resolve(_.map(response.data, function (ticket) {
            return new TicketModel(ticket);
          }));
        } else {
          defer.reject(new Error("Unexpected body response"));
        }
      }, function (error) {
        defer.reject(new Error(error));
      });
      return defer.promise;
    };

  });
