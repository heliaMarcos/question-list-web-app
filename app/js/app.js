'use strict';

var questionListApp = angular.module('questionListApp', ['ngRoute']);

questionListApp.config(function($routeProvider) {
    $routeProvider.
    when('/questions', {
        templateUrl: 'views/question-list.html',
        controller: 'QuestionCtrl'
    }).
    when('/questions/:questionId', {
        templateUrl: 'views/question-detail.html',
        controller: 'QuestionDetailCtrl'
    }).
    when('share/:questionId', {
        templateUrl: 'views/share.html',
        controller: 'ShareScreenCtrl'
    }).
    otherwise({
        redirectTo: '/questions'
    });
});

questionListApp.factory('questions', function($http) {
    return {
        list: function(callback) {
            $http.get('questions.json').success(callback);
        },
        find: function(questionId, callback) {
            $http.get('questions.json').success(function(data) {
                var index = parseInt(questionId) - 1;
                callback(data[index]);
            });
        }
    };
});

questionListApp.controller('QuestionCtrl', function($scope, questions) {
    questions.list(function(questions) {
        $scope.questions = questions;
    });
});

questionListApp.controller('QuestionDetailCtrl', function($scope, $routeParams, questions) {
    questions.find($routeParams.questionId, function(item) {
        $scope.item = item;
    });
});
