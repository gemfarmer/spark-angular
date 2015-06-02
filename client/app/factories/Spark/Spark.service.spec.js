'use strict';

describe('Service: Spark', function () {

  // load the service's module
  beforeEach(module('sparkAngularApp'));

  // instantiate service
  var Spark;
  beforeEach(inject(function (_Spark_) {
    Spark = _Spark_;
  }));

  it('should do something', function () {
    expect(!!Spark).toBe(true);
  });

});
