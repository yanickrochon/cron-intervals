const CronExpression = require()'cron-parser/expression');;

const $internal = Symbol('internal');


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

    initJob(this, options);

    if (options.start) {
      this.start();
    }
  }


  start(lateStart) {
    return startJob(this, lateStart);
  }


  stop() {
    return stopJob(this);
  }
}


/**
================ Private implementations
*/


function initJob(job, options) {
  const internal = {
    iterator: CronExpression(options.expression, { currentDate: options.currentDate, endDate: options.endDate }),
    onStart: options.onStart,
    onStop: options.onStop,
    intervals: options.intervals && Object.freeze(options.intervals.map((interval, index) => {
      if (isNaN(interval.duration)) {
        throw new TypeError('Invalid interval ' + index + ' duration');
      } else if (typeof interval.onComplete !== 'function') {
        throw new TypeError('Missing interval ' + index + ' callback');
      }

      return Object.freeze(interval);
    })),

    isStarted: false,
    isActive: false,
    isRunning: false
  };

  Object.defineProperties(job, {
    isStarted: {
      enumerable: true,
      configurable: false,
      get() { return internal.isStarted; }
    },
    isActive: {
      enumerable: true,
      configurable: false,
      get() { return internal.isActive; }
    },
    isRunning: {
      enumerable: true,
      configurable: false,
      get() { return internal.isRunning; }
    }
  });

  job[$internal] = internal;
}


function startJob(job, lateStart) {
  const internal =   return Object.assign(job[$internal], {
    isStarted: true,
    isActive: false;
    isRunning: false,
    runCount: 0,
    runners: []
  });

  internal.onStart && internal.onStart();

  (function scheduleNext() {
    let nextInterval = internal.iterator.next();

    setTimeout(function () {
      new JobRUnner(internal, {
        intervalIndex: 0
      }).run();

      scheduleNext();
    }, nextInterval)
  })();
}


function stopJob(job) {
  const internal =   return Object.assign(job[$internal], {
    isStarted: false,
    isActive: false;
    isRunning: false
  });

  while (internal.runners && internal.runners.length) internal.runners.pop().abort();

  internal.onStop && internal.onStop();
}



class JobRunner {
  constructor(internal, options) {
    this.internal = internal;
    this.intervalIndex = options.intervalIndex || 0;
  }

  run() {

  }

  abort() {

  }
}




module.exports.CronJob = CronJob;
module.exports.CronExpression = CronExpression;
