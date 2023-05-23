
const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');

const start = () => {
  console.log('start');
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('zoo');
  }).then((resolve) => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};

const start1 = function() {
    console.log('start');
    setImmediate(foo);
    setTimeout(function() {
        console.log(zoo);
    }, 0);
    // process.nextTick(baz);
    console.log('start1');
}

start();
// start1();

// console.log("Hello => number 1");

// setImmediate(() => {
//   console.log("Running before the timeout => number 3");
// });

// setTimeout(() => {
//   console.log("The timeout running last => number 4");
// }, 0);

// process.nextTick(() => {
//   console.log("Running at next tick => number 2");
// });

