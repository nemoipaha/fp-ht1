const capitalizeString = string => string[0].toUpperCase() + string.slice(1);

const prependUSDCurrencySymbol = price => `$${price}`;

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

// todo better validation
const orderIsValid = order => order.name && order.date && order.price;

const orderIsInValid = order => !orderIsValid(order);

const validOrders = orders => orders.filter(orderIsValid);

const invalidOrders = orders => orders.filter(orderIsInValid);

const capitalizeByName = orders => orders.map(
    order => ({
        ...order,
        name: capitalizeString(order.name)
    })
);

const transformPrice = orders => orders.map(
    order => ({
        ...order,
        price: prependUSDCurrencySymbol(order.price)
    })
);

const sortByDate = orders => [...orders].sort((a, b) => new Date(a.date) - new Date(b.date));

const groupByDate = orders => orders.reduce(
    (ordersCopy, currentOrder) => ({
        ...ordersCopy,
        [currentOrder['date']]: ordersCopy[currentOrder['date']]
            ? [
                ...ordersCopy[currentOrder['date']],
                currentOrder
            ]
            : [currentOrder]
    }),
    {}
);

const maxRowsCount = orderGroups => Object.keys(orderGroups)
    .map(date => orderGroups[date].length)
    .reduce((a, b) => Math.max(a, b)
);

const renderOrdersAsHtmlTable = ordersGroupedByDate => {
    const dates = Object.keys(ordersGroupedByDate);

    let table = `<thead>${dates.reduce((table, date) => table + `<th>${date}</th>`, '')}</thead>`;
    let rows = '';
    let rowIndex = 0;

    const maxRows = maxRowsCount(ordersGroupedByDate);

    while (rowIndex < maxRows) {
        const columns = dates.reduce(
            (table, date) => {
                const order = ordersGroupedByDate[date][rowIndex];
                const content = order ? `<td>${order.name} - ${order.price}</td>` : '<td></td>';

                return table + content;
            },
            ''
        );

        rows += `<tr>${columns}</tr>`;

        rowIndex++;
    }

    table += `<tbody>${rows}</tbody>`;

    return `<table>${table}</table>`;
};

const printInValidOrders = data => console.log(data);

// this was spizjeno s developer.mozilla.org
const pipe = (...functions) => input => functions.reduce(
    (acc, fn) => fn(acc),
    input
);

const processing = pipe(
    validOrders,
    transformPrice,
    capitalizeByName,
    sortByDate,
    groupByDate,
    renderOrdersAsHtmlTable
);

console.log('Incorrect:');
printInValidOrders(
    invalidOrders(input)
);

document.getElementById('app').innerHTML = processing(input);