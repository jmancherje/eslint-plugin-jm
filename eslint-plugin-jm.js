/**
 * @fileoverview Type args eslint plugin
 * @author Justin Mancherje
 */
"use strict";

const requiredTypeArgumentsRule = require("./required-type-arguments");
const plugin = {
  rules: { "required-type-arguments": requiredTypeArgumentsRule },
};
module.exports = plugin;
