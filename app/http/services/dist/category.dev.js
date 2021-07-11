"use strict";

var _require = require('../../models'),
    Category = _require.Category;

var _require2 = require('../../helpers/error'),
    abort = _require2.abort;

exports.create = function _callee(_ref) {
  var name, category;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = _ref.name;
          _context.next = 3;
          return regeneratorRuntime.awrap(Category.query().findOne({
            name: name
          }));

        case 3:
          category = _context.sent;

          if (!category) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", abort(400, 'This category is already exits'));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(Category.query().insert({
            name: name
          }));

        case 8:
          return _context.abrupt("return", '');

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.update = function _callee2(_ref2) {
  var categoryId, name, category;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          categoryId = _ref2.categoryId, name = _ref2.name;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Category.query().findOne({
            name: name
          }));

        case 3:
          category = _context2.sent;

          if (!(category && category.id === categoryId)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", abort(400, 'This category is already exits'));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(Category.query().findById(categoryId).update({
            name: name
          }));

        case 8:
          return _context2.abrupt("return", '');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getList = function () {
  var categories = Category.query().select('id', 'name', 'quantity');
  return categories;
};

exports.remove = function _callee3(_ref3) {
  var categoryId, category;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          categoryId = _ref3.categoryId;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Category.query().findById(categoryId));

        case 3:
          category = _context3.sent;

          if (category) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", abort(400, 'This category is not already exists'));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(Category.query().findById(categoryId)["delete"]());

        case 8:
          return _context3.abrupt("return", '');

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};