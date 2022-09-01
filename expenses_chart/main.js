const values =
    [
        {
            "day": "mon",
            "amount": 17.45
        },
        {
            "day": "tue",
            "amount": 34.91
        },
        {
            "day": "wed",
            "amount": 52.36
        },
        {
            "day": "thu",
            "amount": 31.07
        },
        {
            "day": "fri",
            "amount": 23.39
        },
        {
            "day": "sat",
            "amount": 43.28
        },
        {
            "day": "sun",
            "amount": 25.48
        }
    ]


window.onload = () => {
    const labels = values.map(v => v.day);
    const amounts = values.map(v => v.amount);
    const colors = values.map(v => {
        if (v.day === "wed") {
            return "rgb(118 181 188)";
        }
        return "rgb(236 117 93)";
    })

    addChart(labels, amounts, colors);

}



function addChart(labels, amounts, colors) {

    const data = {
        labels: labels,
        datasets: [{
            label: "",
            data: amounts,
            backgroundColor: colors
        }]
    }

    const config = {
        type: "bar",
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    display: false
                }
            }
        }
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, config);
}