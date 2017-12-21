# CRON Intervals

Execute a sequence of tasks starting at specific periods.


## Installation

```
npm i -S cron-intervals
```


## Usage

### Legacy

```js
const { CronJob } = require('cron-intervals');


const job = new CronJob({
  expression: '0 */30 * * * *',     // every 30 minutes
  onStart() {
    console.log("Job started!");    
  },
  intervals: [
    {
      duration: 1000 * 60 * 5,   // 5 minutes
      onComplete() {
        console.log("Interval 0 completed");
      }
    },
    {
      duration: 1000 * 60 * 2,   // 2 minutes
      onComplete() {
        console.log("Interval 1 completed");
      }
    }
  ],
  start: true
});
```


### ES6 Modules

```js
import { CronJob } from 'cron-intervals';


const job = new CronJob({
  expression: '0 */30 * * * *',     // every 30 minutes
  onStart() {
    console.log("Task started!");    
  },
  intervals: [
    {
      duration: 1000 * 60 * 5,   // 5 minutes
      onComplete() {
        console.log("Interval 0 completed");
      }
    },
    {
      duration: 1000 * 60 * 2,   // 2 minutes
      onComplete() {
        console.log("Interval 1 completed");
      }
    }
  ],
  start: true
});
```

THe job extends the [`CronJob`](https://www.npmjs.com/package/cron) interface.


## Constructor Options

* **expression** : *String*
  A cron time expression.

* **onStart** : *Function*
  Callback when the job starts. This function should return immediately.

* **onStop** : *Function*
  Callback when the job is stopped, or has ended after reaching `endDate`.

* **intervals** : *Array*
  A list of intervals to chain after the job starts.

  * **duration** : *Number*
    The interval duration in milliseconds

  * **onComplete** : *Function*
    The callback to call when the interval is over. This function should return immediately.

* **start** : *Boolean*
  Start the job when created.

* **currentDate** : *Date*
  Define the date and time in reference for this job. This option is useful to simulate
  job being executed at a very specific time.

* **endDate** : *Date*
  Define a time limit for the execution of this job. When specified, `onStart` will never
  be called if `currentDate` is beyound this value.


## Properties

* **isStarted** : *Boolean*
  Returns whether or not this job has started.

* **isActive** : *Boolean*
  Returns `true` if the job has started to execute the intervals. (Implies that `isStarted === true`)

* **isRunning** : *Boolean*
  Returns `true` if a callback is being executed. (Implies that `isActive === true`)


## Methods

* **start([lateStart])**
  Start the current job. If `lateStart` is specified and `true`, then the job will be started
  right where an interval is supposed to be happening, and continue from that point.

* **stop()**
  Stop the current job. This method does not garantee that any callback will be stopped, but
  that no other callback will be executed after that.
