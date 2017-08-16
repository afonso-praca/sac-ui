// APP MAIN
angular.module("app", ["ngRoute", "ticketList", "ticketDetail", "ticketCommon"])

  .config(function($routeProvider, $compileProvider, $httpProvider) {

    $compileProvider.debugInfoEnabled(false);

    // TICKET LIST
    $routeProvider.when('/tickets/', {
      controller: "TicketListController",
      templateUrl: 'modules/ticket-list/views/ticket-list-view.html',
      resolve: {
        tickets: function(TicketListService) {
          return TicketListService.getTickets();
        }
      }
    });

    // TICKET LIST
    $routeProvider.when('/ticket/:id', {
      controller: "TicketDetailController",
      templateUrl: 'modules/ticket-detail/views/ticket-detail-view.html',
      resolve: {
        ticket: function(TicketDetailService, $route) {
          return TicketDetailService.getTicket($route.current.params.id);
        }
      }
    });

    $routeProvider.otherwise({
      redirectTo: '/tickets/'
    });

    // HTTP SETTINGS
    $httpProvider.useApplyAsync(true);
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })

  .run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(){
      // to do -> implements stop loader
    });
    $rootScope.$on('$routeChangeStart', function(){
      // to do -> implements start loader
    });
  });

// BOOTSTRAPS ANGULAR APP
angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById("app-container"), ['app']);
});
