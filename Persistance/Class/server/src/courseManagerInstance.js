// const CourseManager = require('./courseManager');
const CourseManager = require('./courseManager.solution');

// Instance unique partagée par tous les routeurs
const courseManager = new CourseManager();
const ready = courseManager.init();

module.exports = { courseManager, ready };
