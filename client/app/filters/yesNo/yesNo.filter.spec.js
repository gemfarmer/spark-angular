'use strict';

describe('Filter: yesNo', function () {

  // load the filter's module
  beforeEach(module('sparkAngularApp'));

  // initialize a new instance of the filter before each test
  var yesNo;
  beforeEach(inject(function ($filter) {
    yesNo = $filter('yesNo');
  }));

  it('should return the input prefixed with "yesNo filter:"', function () {
    var text = 'angularjs';
    expect(yesNo(text)).toBe('yesNo filter: ' + text);
  });

});
