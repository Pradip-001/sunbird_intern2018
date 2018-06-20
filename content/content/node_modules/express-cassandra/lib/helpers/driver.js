'use strict';

var _ = require('lodash');

var debug = require('debug')('express-cassandra');

var Driver = function f(properties) {
  this._properties = properties;
};

Driver.prototype = {
  ensure_init(callback) {
    if (!this._properties.cql) {
      this._properties.init(callback);
    } else {
      callback();
    }
  },

  execute_definition_query(query, callback) {
    var _this = this;

    this.ensure_init(function (err) {
      if (err) {
        callback(err);
        return;
      }
      debug('executing definition query: %s', query);
      var properties = _this._properties;
      var conn = properties.define_connection;
      conn.execute(query, [], { prepare: false, fetchSize: 0 }, callback);
    });
  },

  execute_query(query, params, options, callback) {
    var _this2 = this;

    if (arguments.length === 3) {
      callback = options;
      options = {};
    }

    var defaults = {
      prepare: true
    };

    options = _.defaultsDeep(options, defaults);

    this.ensure_init(function (err) {
      if (err) {
        callback(err);
        return;
      }
      debug('executing query: %s with params: %j', query, params);
      _this2._properties.cql.execute(query, params, options, function (err1, result) {
        if (err1 && err1.code === 8704) {
          _this2.execute_definition_query(query, callback);
        } else {
          callback(err1, result);
        }
      });
    });
  },

  execute_batch(queries, options, callback) {
    var _this3 = this;

    if (arguments.length === 2) {
      callback = options;
      options = {};
    }

    var defaults = {
      prepare: true
    };

    options = _.defaultsDeep(options, defaults);

    this.ensure_init(function (err) {
      if (err) {
        callback(err);
        return;
      }
      debug('executing batch queries: %j', queries);
      _this3._properties.cql.batch(queries, options, callback);
    });
  },

  execute_eachRow(query, params, options, onReadable, callback) {
    var _this4 = this;

    this.ensure_init(function (err) {
      if (err) {
        callback(err);
        return;
      }
      debug('executing eachRow query: %s with params: %j', query, params);
      _this4._properties.cql.eachRow(query, params, options, onReadable, callback);
    });
  },

  execute_stream(query, params, options, onReadable, callback) {
    var _this5 = this;

    this.ensure_init(function (err) {
      if (err) {
        callback(err);
        return;
      }
      debug('executing stream query: %s with params: %j', query, params);
      _this5._properties.cql.stream(query, params, options).on('readable', onReadable).on('end', callback);
    });
  }
};

module.exports = Driver;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RyaXZlci5qcyJdLCJuYW1lcyI6WyJfIiwicmVxdWlyZSIsImRlYnVnIiwiRHJpdmVyIiwiZiIsInByb3BlcnRpZXMiLCJfcHJvcGVydGllcyIsInByb3RvdHlwZSIsImVuc3VyZV9pbml0IiwiY2FsbGJhY2siLCJjcWwiLCJpbml0IiwiZXhlY3V0ZV9kZWZpbml0aW9uX3F1ZXJ5IiwicXVlcnkiLCJlcnIiLCJjb25uIiwiZGVmaW5lX2Nvbm5lY3Rpb24iLCJleGVjdXRlIiwicHJlcGFyZSIsImZldGNoU2l6ZSIsImV4ZWN1dGVfcXVlcnkiLCJwYXJhbXMiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZGVmYXVsdHMiLCJkZWZhdWx0c0RlZXAiLCJlcnIxIiwicmVzdWx0IiwiY29kZSIsImV4ZWN1dGVfYmF0Y2giLCJxdWVyaWVzIiwiYmF0Y2giLCJleGVjdXRlX2VhY2hSb3ciLCJvblJlYWRhYmxlIiwiZWFjaFJvdyIsImV4ZWN1dGVfc3RyZWFtIiwic3RyZWFtIiwib24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLElBQUlDLFFBQVEsUUFBUixDQUFWOztBQUVBLElBQU1DLFFBQVFELFFBQVEsT0FBUixFQUFpQixtQkFBakIsQ0FBZDs7QUFFQSxJQUFNRSxTQUFTLFNBQVNDLENBQVQsQ0FBV0MsVUFBWCxFQUF1QjtBQUNwQyxPQUFLQyxXQUFMLEdBQW1CRCxVQUFuQjtBQUNELENBRkQ7O0FBSUFGLE9BQU9JLFNBQVAsR0FBbUI7QUFDakJDLGNBQVlDLFFBQVosRUFBc0I7QUFDcEIsUUFBSSxDQUFDLEtBQUtILFdBQUwsQ0FBaUJJLEdBQXRCLEVBQTJCO0FBQ3pCLFdBQUtKLFdBQUwsQ0FBaUJLLElBQWpCLENBQXNCRixRQUF0QjtBQUNELEtBRkQsTUFFTztBQUNMQTtBQUNEO0FBQ0YsR0FQZ0I7O0FBU2pCRywyQkFBeUJDLEtBQXpCLEVBQWdDSixRQUFoQyxFQUEwQztB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QUFldkIsS0FBZixFQUFzQlEsTUFBdEIsRUFBOEJDLE9BQTlCLEVBQXVDWSxVQUF2QyxFQUFtRHpCLFFBQW5ELEVBQTZEO0FBQUE7O0FBQzNELFNBQUtELFdBQUwsQ0FBaUIsVUFBQ00sR0FBRCxFQUFTO0FBQ3hCLFVBQUlBLEdBQUosRUFBUztBQUNQTCxpQkFBU0ssR0FBVDtBQUNBO0FBQ0Q7QUFDRFosWUFBTSw0Q0FBTixFQUFvRFcsS0FBcEQsRUFBMkRRLE1BQTNEO0FBQ0EsYUFBS2YsV0FBTCxDQUFpQkksR0FBakIsQ0FBcUIyQixNQUFyQixDQUE0QnhCLEtBQTVCLEVBQW1DUSxNQUFuQyxFQUEyQ0MsT0FBM0MsRUFBb0RnQixFQUFwRCxDQUF1RCxVQUF2RCxFQUFtRUosVUFBbkUsRUFBK0VJLEVBQS9FLENBQWtGLEtBQWxGLEVBQXlGN0IsUUFBekY7QUFDRCxLQVBEO0FBUUQ7QUE1RmdCLENBQW5COztBQStGQThCLE9BQU9DLE9BQVAsR0FBaUJyQyxNQUFqQiIsImZpbGUiOiJkcml2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZXhwcmVzcy1jYXNzYW5kcmEnKTtcblxuY29uc3QgRHJpdmVyID0gZnVuY3Rpb24gZihwcm9wZXJ0aWVzKSB7XG4gIHRoaXMuX3Byb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xufTtcblxuRHJpdmVyLnByb3RvdHlwZSA9IHtcbiAgZW5zdXJlX2luaXQoY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuX3Byb3BlcnRpZXMuY3FsKSB7XG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzLmluaXQoY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfSxcblxuICBleGVjdXRlX2RlZmluaXRpb25fcXVlcnkocXVlcnksIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5lbnN1cmVfaW5pdCgoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRlYnVnKCdleGVjdXRpbmcgZGVmaW5pdGlvbiBxdWVyeTogJXMnLCBxdWVyeSk7XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fcHJvcGVydGllcztcbiAgICAgIGNvbnN0IGNvbm4gPSBwcm9wZXJ0aWVzLmRlZmluZV9jb25uZWN0aW9uO1xuICAgICAgY29ubi5leGVjdXRlKHF1ZXJ5LCBbXSwgeyBwcmVwYXJlOiBmYWxzZSwgZmV0Y2hTaXplOiAwIH0sIGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfSxcblxuICBleGVjdXRlX3F1ZXJ5KHF1ZXJ5LCBwYXJhbXMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHByZXBhcmU6IHRydWUsXG4gICAgfTtcblxuICAgIG9wdGlvbnMgPSBfLmRlZmF1bHRzRGVlcChvcHRpb25zLCBkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmVuc3VyZV9pbml0KChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGVidWcoJ2V4ZWN1dGluZyBxdWVyeTogJXMgd2l0aCBwYXJhbXM6ICVqJywgcXVlcnksIHBhcmFtcyk7XG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzLmNxbC5leGVjdXRlKHF1ZXJ5LCBwYXJhbXMsIG9wdGlvbnMsIChlcnIxLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycjEgJiYgZXJyMS5jb2RlID09PSA4NzA0KSB7XG4gICAgICAgICAgdGhpcy5leGVjdXRlX2RlZmluaXRpb25fcXVlcnkocXVlcnksIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnIxLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBleGVjdXRlX2JhdGNoKHF1ZXJpZXMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHByZXBhcmU6IHRydWUsXG4gICAgfTtcblxuICAgIG9wdGlvbnMgPSBfLmRlZmF1bHRzRGVlcChvcHRpb25zLCBkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmVuc3VyZV9pbml0KChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGVidWcoJ2V4ZWN1dGluZyBiYXRjaCBxdWVyaWVzOiAlaicsIHF1ZXJpZXMpO1xuICAgICAgdGhpcy5fcHJvcGVydGllcy5jcWwuYmF0Y2gocXVlcmllcywgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgIH0pO1xuICB9LFxuXG4gIGV4ZWN1dGVfZWFjaFJvdyhxdWVyeSwgcGFyYW1zLCBvcHRpb25zLCBvblJlYWRhYmxlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZW5zdXJlX2luaXQoKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkZWJ1ZygnZXhlY3V0aW5nIGVhY2hSb3cgcXVlcnk6ICVzIHdpdGggcGFyYW1zOiAlaicsIHF1ZXJ5LCBwYXJhbXMpO1xuICAgICAgdGhpcy5fcHJvcGVydGllcy5jcWwuZWFjaFJvdyhxdWVyeSwgcGFyYW1zLCBvcHRpb25zLCBvblJlYWRhYmxlLCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH0sXG5cbiAgZXhlY3V0ZV9zdHJlYW0ocXVlcnksIHBhcmFtcywgb3B0aW9ucywgb25SZWFkYWJsZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmVuc3VyZV9pbml0KChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGVidWcoJ2V4ZWN1dGluZyBzdHJlYW0gcXVlcnk6ICVzIHdpdGggcGFyYW1zOiAlaicsIHF1ZXJ5LCBwYXJhbXMpO1xuICAgICAgdGhpcy5fcHJvcGVydGllcy5jcWwuc3RyZWFtKHF1ZXJ5LCBwYXJhbXMsIG9wdGlvbnMpLm9uKCdyZWFkYWJsZScsIG9uUmVhZGFibGUpLm9uKCdlbmQnLCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyaXZlcjtcbiJdfQ==