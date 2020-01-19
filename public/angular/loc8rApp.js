angular.module('loc8rApp', []);

var locListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = "Проверяем вашу геолокацию...";

  $scope.getData = function (position) {
    $scope.message = "Ищем ближайшие места...";
    
    loc8rData.then(
      function (data) {
        $scope.message = data.length > 0 ? "" : "Места не найдены :(";
        $scope.data = { locs: data };
      }, function (e) {
        $scope.message = "Извините, что-то произошло не так :_(";
      }
    );
  }

  $scope.showError = function (error) {
    $scope.$apply(function () {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function () {
      $scope.message = "Геолокация не поддерживается этим браузером.";
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

var loc8rData = function ($http) {
  return $http.get('/api/locs?lng=56.302498&lat=43.987241&maxdist=5000');
};


var _isNumeric = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
}
var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance);
        unit = 'm';
      }
      return numDistance + " " + unit;
    } else {
      return "?";
    }
  }
};
var ratingStars = function () {
  return {
    scope: {
      thisRating: '=rating'
    },
    templateUrl : '/angular/rating-stars.html'
  };
};

var geolocation = function () {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return {
    getPosition: getPosition
  };
};


angular
  .module('loc8rApp')
  .controller('locListCtrl', locListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
