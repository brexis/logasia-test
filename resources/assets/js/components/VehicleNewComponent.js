function vehicleNewController($scope, Vehicle) {
  let ctrl = this;

  $scope.vehicle = {
    days: []
  };
  $scope.date = {};
  $scope.days = {
    mondays: 1,
    tuesdays: 2,
    wednesdays: 3,
    thursdays: 4,
    fridays: 5,
    saturdays: 6,
    sundays: 0
  };

  let alldays = [0, 1, 2, 3, 4, 5, 6],
  weekdays = [1, 2, 3, 4, 5],
  weekends = [6, 0];

  $scope.save = function(vehicle) {
    Vehicle.bulk(vehicle).$promise.then(function() {
      ctrl.onSave();
      $scope.vehicle = {};
      $scope.date = {};
      $scope.toggleDays([]);
      $scope.refine = {
        alldays: false,
        weekdays: false,
        weekends: false
      };
    });
  }

  $scope.toggleDays = function (days) {
    function removeOrAddDay(day) {
      let index = $scope.vehicle.days.indexOf(day);

      if (index !== -1) {
        $scope.vehicle.days.splice(index, 1);
      } else {
        $scope.vehicle.days.push(day);
      }
    }

    if (Array.isArray(days)) {
      $scope.vehicle.days = angular.copy(days);
    } else {
      removeOrAddDay(days);
    }

    $scope.refine.alldays = equals($scope.vehicle.days, alldays);
    $scope.refine.weekdays = equals($scope.vehicle.days, weekdays);
    $scope.refine.weekends = equals($scope.vehicle.days, weekends);
  }

  $scope.daysRefineChange = function(val) {
    switch (val) {
      case 'alldays':
      $scope.toggleDays($scope.refine.alldays ? alldays : []);
      break;
      case 'weekdays':
      $scope.toggleDays($scope.refine.weekdays ? weekdays : []);
      break;
      case 'weekends':
      $scope.toggleDays($scope.refine.weekends ? weekends : []);
      break;
    }
  };

  $scope.$watch('date', function(date) {
    $scope.vehicle.from = date.from ? moment(date.from).format('YYYY-MM-DD') : '';
    $scope.vehicle.to = date.to ? moment(date.to).format('YYYY-MM-DD') : '';
  }, true);

  function equals(arr1, arr2) {
    arr1.sort(); arr2.sort();

    return angular.equals(arr1, arr2);
  }
}

angular.module('LogasiaApp')
.component('vehicleNew', {
  templateUrl: 'js/views/vehicle-new.html',
  controller: ['$scope', 'Vehicle', vehicleNewController],
  bindings: {
    onSave: '&'
  }
});
