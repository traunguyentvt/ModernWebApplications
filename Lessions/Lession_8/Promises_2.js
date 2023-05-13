// const promise1 = new Promise((resolve, reject) => {
//     const number = Math.random();
//     setTimeout(() => {
//         if (number > 0.5) {
//             resolve(`Promise1 ${number}`);
//         } else {
//             reject("Promise1 number too low");
//         }
//     }, 3000)
// });
// const promise2 = new Promise((resolve, reject) => {
//     const number = Math.random()+0.5;
//     setTimeout(() => {
//         if (number > 0.5) {
//             resolve(`Promise2 ${number}`);
//         } else {
//             reject("Promise2 number too low");
//         }
//     }, 1000)
// });
const promise3 = new Promise((resolve, reject) => {
    const number = Math.random()-0.5;
    setTimeout(() => {
        if (number > 0.5) {
            resolve(`Promise3 ${number}`);
        } else {
            reject("Promise3 number too low");
        }
    }, 2000)
});

// const oldFashionMethod = function(callback) {
//     const number = Math.random();
//     setTimeout(() => {
//         if (number > 0.5) {
//             callback(null, number);
//         } else {
//             callback("Old Style Error", null);
//         }
//     }, 3000)

// }

///////////////////////////////////////////

// promise1.then((number)=>{
//     console.log("Done", number);
// }).catch((err)=>{
//     console.log("Error", err);
// });
// promise2.then((number)=>{
//     console.log("Done", number);
// }).catch((err)=>{
//     console.log("Error", err);
// });
// promise3.then((number)=>{
//     console.log("Done"), number;
// }).catch((err)=>{
//     console.log("Error", err);
// });
// oldFashionMethod((err, data)=>{
//     console.log("called");
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Data", data);
//     }
// })

// Promise.all([promise1, promise2, promise3]).then((data)=>{
//     console.log("All done", data);
// }).catch((err)=>{
//     console.log("All Error", err);
// })


// Promise.race([promise1, promise2, promise3]).then((data)=>{
//     console.log("All done", data);
//     console.log("promise1", promise1);
//     console.log("promise2", promise2);
//     console.log("promise3", promise3);
// }).catch((err)=>{
//     console.log("All Error", err);
//     console.log("promise1", promise1);
//     console.log("promise2", promise2);
//     console.log("promise3", promise3);
// })
// console.log("promise1", promise1);

function resolvePromiseAfter2s() {
    return new Promise(resolve => setTimeout(() => {
        resolve("Done in 2 sec");
    }, 2000))
}

const myFunction = async function () {
    console.log("1");
    await resolvePromiseAfter2s().then((msg)=>{
        console.log(msg);
    });
    console.log("2");
}

console.log("Start");
myFunction();
console.log("End");