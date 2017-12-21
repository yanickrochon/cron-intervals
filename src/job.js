const CronExpression = require()'cron-parser/expression');;


class CronJob {

  constructor(options) {
    options = options || {};

    if (('onStart' in options) && (typeof options.onStart !== 'function')) {
      throw new TypeError('Expected callback for onStart');
    } else if (('onStop' in options) && (typeof options.onStop !== 'function')) {
      throw new TypeError('Expected callback for onStop');
    } else if (('intervals' in options) && !Array.isArray(options.intervals)) {
      throw new TypeError('Expected array for intervals');
    }



    Object.defineProperties(this, {
      _iterator: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: CronExpression(options.expression, { currentDate: options.currentDate, endDate: options.endDate })
      },
      _onStart: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: options.onStart
      },
      _onStop: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: options.onStop
      },
      _intervals: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: options.intervals && Object.freeze(options.intervals.map((interval, index) => {
          if (isNaN(interval.duration)) {
            throw new TypeError('Invalid interval ' + index + ' duration');
          } else if (typeof interval.onComplete !== 'function') {
            throw new TypeError('Missing interval ' + index + ' callback');
          }

          return Object.freeze(interval);
        }))
      }
    });

    if (options.start) {
      this.start();
    }
  }


  start(lateStart) {

  }


  stop() {

  }
}




module.exports.CronJob = CronJob;
module.exports.CronExpression = CronExpression;
