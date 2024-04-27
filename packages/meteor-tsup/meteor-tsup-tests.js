// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-tsup.js.
import { name as packageName } from "meteor/meteor-tsup";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-tsup - example', function (test) {
  test.equal(packageName, "meteor-tsup");
});
