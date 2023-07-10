const el1 = document.querySelector(".chart__canvas");
const el2 = document.getElementById("myChart--2");
const el3 = document.getElementById("myChart--3");
const el4 = document.getElementById("myChart--4");
console.log(el1);
const ja = [
    4,
    4.5,
    4.5,
    4.5,
    5,
    5,
    5,
    2,
    2,
    2
];
// new Chart(el1, {
//   type: "bar",
//   data: {
//     labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: ja,
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
const calcAverage = function(arr) {
    let acc = 0;
    let totalAverage = 0;
    arr.forEach(function([prime, average]) {
        acc += prime * average;
        totalAverage += average;
    });
    console.log(acc / totalAverage);
};
calcAverage([
    [
        4,
        1
    ],
    [
        4.5,
        1
    ],
    [
        4.5,
        0.5
    ],
    [
        4.5,
        1.5
    ],
    [
        5,
        0.8
    ],
    [
        5,
        1.5
    ],
    [
        5,
        1.5
    ],
    [
        2,
        2
    ],
    [
        2,
        1.5
    ],
    [
        2,
        1.5
    ]
]);

//# sourceMappingURL=index.44983732.js.map
