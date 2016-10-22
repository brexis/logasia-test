//
function vehicleListController($scope, Vehicle) {
  let ctrl = this;
  let $element = null;

  $scope.togglePopover = function (event) {
    if (! $element) {
      initPopoverAndEvents(event.target);
    }

    $element.popover('toggle');
  }

  function updateOrSave(vehicle) {
    let method = vehicle.id ? 'update' : 'save';

    Vehicle[method](vehicle).$promise.then(function () {
      $element.popover('hide');
    });
  }

  function initPopoverAndEvents(target) {
    $element = angular.element(target);
    let $parent = $element.parent();

    $element.popover({
      html: true,
      trigger: 'manual',
      placement: 'top',
      container: $parent,
      content: `
        <div class="input-group">
          <input type="text" class="form-control">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button"><i class="glyphicon glyphicon-ok"></i></button>
          </span>
        </div>
        `
    });

    $element.on('shown.bs.popover', function () {
      $parent.find('input').val(ctrl.vehicle[ctrl.property]);
    })

    $parent.on('click', 'button', function () {
      ctrl.vehicle[ctrl.property] = $parent.find('input').val()
      updateOrSave(ctrl.vehicle);
    })
  }
}

angular.module('LogasiaApp')
.component('vehicleUpdate', {
  templateUrl: 'js/views/vehicle-update.html',
  controller: ['$scope', 'Vehicle', vehicleListController],
  bindings: {
    vehicle: '=',
    property: '<'
  }
});
