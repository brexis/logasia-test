// Calendar component
function CalendarController($scope) {
  let begin = window.moment().startOf('week');
  let end = begin.clone().add(13, 'days');
  let ctrl = this;

  function formatMoment(begin, end) {
    let days = end.diff(begin, 'days');

    $scope.month = begin.format('MMMM YYYY');
    $scope.days = [];

    for (var i = 0; i <= days; i++) {
      let day = begin.clone().add(i, 'days');
      $scope.days.push(day);
    }
  }

  formatMoment(begin, end);
  ctrl.onInit({begin: begin, end: end});

  $scope.prevWeek = function () {
    begin.subtract(1, 'week');
    end.subtract(1, 'week');
    formatMoment(begin, end);
    ctrl.onChange({begin: begin, end: end});
  }

  $scope.nextWeek = function () {
    begin.add(1, 'week');
    end.add(1, 'week');
    formatMoment(begin, end);
    ctrl.onChange({begin: begin, end: end});
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
