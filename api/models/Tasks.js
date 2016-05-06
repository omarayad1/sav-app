/**
 * Tasks.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    file: {
      type: "string",
      required: true
    },
    name: {
      type: "string",
      required: true
    },
    userId: {
      type: "integer",
      required: true
    },
    type: {
      type: "string",
      required: true
    },
    status: {
      type: "string",
      required: true
    }
  }
};
