(function () {
    angular
        .module("RollingFood", ["ngRoute"])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "../views/admin/template/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
            })
    }
})();