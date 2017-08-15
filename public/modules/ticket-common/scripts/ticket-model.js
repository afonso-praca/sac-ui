angular.module('ticketCommon', [])
  .factory('TicketModel', function () {
    var TicketModel;
    TicketModel = function (_data) {
      var data = _data || {};
      this.type = data.type || null;
      this.state = data.state || null;
      this.reason = data.reason || null;
      this.details = data.details || null;
    };
    return TicketModel;
  });
