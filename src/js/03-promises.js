import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('.form'),
}


refs.form.addEventListener('submit', onFormSubmit);
////delay
////step - delay+=step on every iteration
/////amount - (of iterations)
////position - number of iertation (from 1)

///1-2-3
//get input from formData
//iteration amount times
//make promise
//increase delay on+step
//notiflix



// console.log(createPromise(2, 1500));

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   }); 








  ////Functions

function onFormSubmit(event) {
    event.preventDefault();

    const formData = {};

    const formDataRaw = new FormData(event.currentTarget);

    formDataRaw.forEach((value, name) => {
        formData[name] = value;
    })

    console.log(formData);

    ///імітація циклу
    const position = 1;
    const delay = formData.delay;

    console.log(delay);


    ////виклик функції з промісами
    createPromise(position, delay).then(({ position, delay }) => {
    // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

    
}


function createPromise(position, delay) {
    return new Promise((resolve, reject) => {

        const shouldResolve = Math.random() > 0.3;
        
        setTimeout(() => {
            if (shouldResolve) {
                // Fulfill
                resolve({position, delay});
            } else {
                // Reject
                reject({position, delay});
            }
        }, delay);
        
    });

}
