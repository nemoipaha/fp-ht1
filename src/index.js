const helpers = require('./helpers');
const capitalizeString = helpers.capitalizeString;
const prependUSDCurrencySymbol = helpers.prependUSDCurrencySymbol;

const input = [
    { name: 'TV', price: 300, date: '2018-10-10' },

    { name: 'laptop', price: 600, date: '2018-10-12' },

    { name: 'PC', price: 800, date: '2018-09-05' },

    { name: 'owen', price: 300 },

    { name: 'Camera', price: 500, date: '2018-03-03' },

    { name: 'Fridge', price: 1000, date: '2018-12-11' },

    { name: 'table', price: 150, date: '2018-12-10' },

    { name: 'Sofa', price: 400, date: '2018-12-10' },

    { name: 'chair', date: '2018-09-10' },

    { name: 'Window', price: 300, date: '2018-05-05' }
];

// steps
// separate valid and invalid orders (all fields)
// uppercase names
// presentPrice with $
// group items by date
// print valid rows
// print invalid rows
// use composition

// todo better validation
const orderIsValid = order => order.name && order.date && order.price;

const orderIsInValid = order => !orderIsValid(order);

const validOrders = orders => orders.filter(orderIsValid);

const invalidOrders = orders => orders.filter(orderIsInValid);

// console.log(validOrders(input));
// console.log(invalidOrders(input));

const capitalizeByName = orders => orders.map(
    order => ({
        ...order,
        name: capitalizeString(order.name)
    })
);

// console.log(
//     capitalizeByName(
//         validOrders(input)
//     )
// );

const transformPrice = orders => orders.map(
    order => ({
        ...order,
        price: prependUSDCurrencySymbol(order.price)
    })
);

// console.log(
//     transformPrice(
//         capitalizeByName(
//             validOrders(input)
//         )
//     )
// );

const groupByDate = orders => {
    return orders.reduce(
        function(ordersCopy, currentOrder) {
            const dateKey = currentOrder['date'];

            // todo remove if
            if (!ordersCopy[dateKey]) {
                ordersCopy[dateKey] = [];
            }

            ordersCopy[dateKey].push(currentOrder);

            return ordersCopy;
        },
        {}
    );
};

console.log(
    groupByDate(
        transformPrice(
            capitalizeByName(
                validOrders(input)
            )
        )
    )
);

const printValidOrders = orders => {

};

const printInValidOrders = data => {

};

// console.log('---Orders table:---');
// printValidOrders(
//     // compose() function
//     groupByDate(
//         capitalizeByName(
//             transformPrice(
//                 validOrders(input)
//             )
//         )
//     )
// );

// new string
// console.log();

// console.log('---Incorrect:---');
// printInValidOrders(
//     invalidOrders(input)
// );