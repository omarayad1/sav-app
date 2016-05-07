/**
 * Results.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    taskId: {
      type: "integer",
      required: true,
      unique: true
    },
    dataKeyFrames: {
      type: "array"
    },
    dataClassify: {
      type: "array"
    },
    type: {
      type: "string",
      required: true
    }
  }
};
