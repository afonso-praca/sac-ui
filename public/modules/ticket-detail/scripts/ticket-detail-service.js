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
            defer.resolve(_.map(response.data, function (ticket) {
              return new TicketModel(ticket);
            }));
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

  });
