angular.module('ticketCommon', [])
  .factory('TicketModel', function () {
    var TicketModel;
    TicketModel = function (_data) {
      var data = _data || {};
      this.id = data._id || null;
      this.type = data.type || null;
      this.state = data.state || null;
      this.reason = data.reason || null;
      this.details = data.details || null;
      this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    };
    return TicketModel;
  });
