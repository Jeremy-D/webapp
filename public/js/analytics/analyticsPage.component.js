import angular from 'angular';

export default angular.module('helloGov')
.component('analyticsPage', {
    template: require('./analyticsPage.html'),
    controller: function($scope, $http, $location, constants) {
        'ngInject';
        // FIXME: this is super brittle to get the campaignId like this, but we're not using angular's
        // routing so it's not possible to get it using angular yet
        var urlSplit = $location.absUrl().split('/');
        $scope.campaignId = urlSplit[urlSplit.length - 2];

        $http.get(`${constants.API_ROOT}/campaigns/${$scope.campaignId}`, $scope.campaign)
        .then(function(result) {
            $scope.campaign = result.data;
        })
        .catch(function(data) {
            console.log(`Error:  ${JSON.stringify(data)}`);
        });

        $http.get(`${constants.API_ROOT}/events?campaignId=${$scope.campaignId}`, $scope.analytics)
        .then(function(result) {
            $scope.analytics = result.data;
        })
        .catch(function(data) {
            console.log(`Error:  ${JSON.stringify(data)}`);
        });
    }
})
.name;
