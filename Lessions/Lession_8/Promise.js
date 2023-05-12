
const promise= new Promise((resolve, reject) => {
    const number= Math.random();

    setTimeout(() => {
        if (number > 0.5) {
            resolve();
        } else {
            reject();
        }
    }, 3000);
});

const promise1= new Promise((resolve, reject) => {
    const number= Math.random();

    setTimeout(() => {
        if (number > 0.5) {
            resolve(number);
        } else {
            reject("Promise1 number too low");
        }
    }, 3000);
});

////////////////////////////////////////////////////

promise.then((number) => {
    console.log(number);
}).catch((error) => {
    console.log(error);
});

promise1.then((number) => {
    console.log(number);
}).catch((error) => {
    console.log(error);
});

Promise.race([promise, promise1]).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

function resolveProgramAfter2s() {
    return new Promise(resolve => setTimeout(() => {
        resolve("Done in 2s");
    }, 2000));
}

const myFunction = async function() {
    console.log("1");
    await resolveProgramAfter2s().then((message) => {
        console.log(message);
    });
    console.log("2");
}

console.log("11");
myFunction();
console.log("12");





//promises
//job search
//encrypt
//week 3: 2 points