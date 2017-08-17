// APP MAIN
angular.module("app", ["ngRoute", "ticketList", "ticketDetail", "ticketCommon"])

  .config(function($routeProvider, $compileProvider, $httpProvider) {

    // FOR PREFORMANCE BOOST
    $compileProvider.debugInfoEnabled(false);

    // TICKET LIST ROUTE
    $routeProvider.when('/tickets/', {
      controller: "TicketListController",
      templateUrl: 'modules/ticket-list/views/ticket-list-view.html',
      resolve: {
        groupedTickets: function(TicketListService) {
          return TicketListService.getGroupedTickets();
        }
      }
    });

    // TICKET DETAIL ROUTE
    $routeProvider.when('/ticket/:id', {
      controller: "TicketDetailController",
      templateUrl: 'modules/ticket-detail/views/ticket-detail-view.html',
      resolve: {
        ticket: function(TicketDetailService, $route) {
          return TicketDetailService.getTicket($route.current.params.id);
        }
      }
    });

    // ROUTE FALLBACK
    $routeProvider.otherwise({
      redirectTo: '/tickets/'
    });

    // HTTP SETTING FOR PERFORMANCE BOOST
    $httpProvider.useApplyAsync(true);

    // REMOVES NOT NECESSARY HEADER, TO PREVENT CORS TROUBLES
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })

  .run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(){
      // TO DO -> IMPLEMENTS STOP LOADER
    });
    $rootScope.$on('$routeChangeStart', function(){
      // TO DO -> IMPLEMENTS START LOADER
    });
  });

// BOOTSTRAPS ANGULAR APP - BIND IT TO A CONTAINER
angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById("app-container"), ['app']);
});
