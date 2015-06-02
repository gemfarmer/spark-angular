'use strict';

describe('Directive: sparkLogin', function () {

  // load the directive's module and view
  beforeEach(module('sparkAngularApp'));
  beforeEach(module('app/directives/sparkLogin/sparkLogin.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<spark-login></spark-login>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sparkLogin directive');
  }));
});