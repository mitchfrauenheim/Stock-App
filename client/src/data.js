const stocks = [
    {
        abbr: 'TSLA',
        perc: 0.25,
        holding: '5,024.76'
    },
    {
        abbr: 'TSLA',
        perc: 0.25,
        holding: '5,024.76'
    },
    {
        abbr: 'TSLA',
        perc: 0.25,
        holding: '5,024.76'
    },
    {
        abbr: 'TSLA',
        perc: 0.25,
        holding: '5,024.76'
    }
];

const users = [
    {
        name: 'Sandy Frauenheim',
        place: 1,
        amount: '$19,578'
    },
    {
        name: 'Mitch Frauenheim',
        place: 2,
        amount: '$17,283'
    },
    {
        name: 'Bill Frauenheim',
        place: 3,
        amount: '$12,902'
    },
    {
        name: 'Dan Frauenheim',
        place: 4,
        amount: '$12,902'
    },

    {
        name: 'Bob Frauenheim',
        place: 5,
        amount: '$12,902'
    },
    {
        name: 'Greg Frauenheim',
        place: 6,
        amount: '$12,902'
    }
];

const data = {
    mitch: {
        total: '$17,283',
        stocks: [
            {
                id: "TSLA",
                label: "Tesla",
                value: "6025",
                color: "#FDAB00"
            },
            {
                id: "TMUS",
                label: "T-Mobile",
                value: "5175",
                color: "#F4508D"
            },
            {
                id: "C",
                label: "Citigroup",
                value: "5023",
                color: "#516CF7"
            },
            {
                id: "SHOP",
                label: "Shopify",
                value: "5594",
                color: "#56C1B9"
            },
            {
                id: "Cash",
                label: "Cash",
                value: "3000",
                color: "#D1D5DB"
            }
        ]
    }
}

export default data;
export {
    users,
    stocks
}