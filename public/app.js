// APP MAIN
angular.module("app", ["ngRoute", "ticketList", "ticketCommon"])

  .config(function($routeProvider, $compileProvider, $httpProvider) {

    $compileProvider.debugInfoEnabled(false);

    // TICKET LIST
    $routeProvider.when('/tickets/', {
      controller: "TicketListController",
      templateUrl: 'modules/ticket-list/views/ticket-list-view.html',
      // resolve: {
      //   tickets: function(TicketListService) {
      //     return TicketListService.getTickets();
      //   }
      // }
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
      // stop loader
    });
    $rootScope.$on('$routeChangeStart', function(){
      // start loader
    });

  });

// BOOTSTRAPS ANGULAR APP
angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById("app-container"), ['app']);
});
