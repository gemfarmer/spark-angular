'use strict';

describe('Directive: sparkDeviceList', function () {

  // load the directive's module and view
  beforeEach(module('sparkAngularApp'));
  beforeEach(module('app/directives/sparkDeviceList/sparkDeviceList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<spark-device-list></spark-device-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sparkDeviceList directive');
  }));
});