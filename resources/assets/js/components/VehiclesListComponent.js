// Vehicle list Component
function vehicleListController($scope, Vehicle) {
  let busy = false, currentBegin = null, currentEnd = null;

  $scope.data = {
    'semi-truck' : {
      label: 'Semi-trailer truck',
      properties: [{
        label: 'Vehicles available',
        key: 'available'
      }, {
        label: 'Price (USD)',
        key: 'price'
      }],
      vehicles: []
    },
    'swap-truck' : {
      label: '20 foot swap-body truck',
      properties: [{
        label: 'Vehicles available',
        key: 'available'
      }, {
        label: 'Price (EUR)',
        key: 'price'
      }],
      vehicles: []
    },
    'pup-trailer' : {
      label: '28.5 foot pop trailer',
      properties: [{
        label: 'Vehicles available',
        key: 'available'
      }, {
        label: 'Price (EUR)',
        key: 'price'
      }],
      vehicles: []
    },
  };

  $scope.query = function (begin, end) {
    if (busy) return;
    let days = end.diff(begin, 'days');
    currentBegin = begin;
    currentEnd = end;
    busy = true;

    Vehicle.query({
      'from': begin.format('YYYY-MM-DD'),
      to: end.format('YYYY-MM-DD')
    }).$promise.then(function(vehicles) {
      formatData(begin, end, vehicles);
    }).finally(function() {
      busy = false;
    });
  }

  $scope.refresh = function() {
    $scope.query(currentBegin, currentEnd);
  }

  function formatData(begin, end, vehicles) {
    let days = end.diff(begin, 'days');

    for (let i = 0; i <= days; i++) {
      let day = begin.clone().add(i, 'days');
      let formatDay = day.format('YYYY-MM-DD');
      initDayData(i, day);

      vehicles.forEach(function (vehicle) {
        if (formatDay == vehicle.date) {
          $scope.data[vehicle.type].vehicles[i] = vehicle;
        }
      });
    }
  }

  function initDayData(i, day) {
    for(let type in $scope.data) {
      $scope.data[type].vehicles[i] = {
        price: 0,
        available: 0,
        date: day.format('YYYY-MM-DD'),
        type: type
      }
    }
  }
}

angular.module('LogasiaApp')
.component('vehiclesList', {
  templateUrl: 'js/views/vehicles-list.html',
  controller: ['$scope', 'Vehicle', vehicleListController]
});
