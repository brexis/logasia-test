// Calendar component
function CalendarController($scope) {
  let begin = window.moment().startOf('week');
  let ctrl = this;

  function formatMoment(date) {
    let end = date.clone().endOf('week');
    let days = end.diff(date, 'days');

    $scope.month = date.format('MMMM YYYY');
    $scope.days = [];

    for (var i = 0; i <= days; i++) {
      let day = date.clone().add(i, 'days');
      $scope.days.push(day);
    }
  }

  formatMoment(begin);
  ctrl.onInit({begin: begin});

  $scope.prevWeek = function () {
    begin.subtract(1, 'week');
    formatMoment(begin);
    ctrl.onChange({begin: begin});
  }

  $scope.nextWeek = function () {
    begin.add(1, 'week');
    formatMoment(begin);
    ctrl.onChange({begin: begin});
  }

  $scope.isWeekend = function (date) {
    return [6, 0].indexOf(date.day()) !== -1;
  }
}

angular.module('LogasiaApp')
.component('calendar', {
  templateUrl: 'js/views/calendar.html',
  controller: ['$scope', CalendarController],
  bindings: {
    data: '<',
    onInit: '&',
    onChange: '&'
  }
});
