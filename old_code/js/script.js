 const Chart = require('Chart');

 // const jsonFile = require('../budget-data.json');
 const createChartJSPieChart = async (data) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myPieChart = new Chart(ctx, { type: 'pie', data });
}

const getBudget = async () => {
    try {
        const res = await axios.get('/budget');
        return res.data;
    } catch (error) {
         // handle error
        console.log('error', error);
        return [];
    }
}
const structureTheBudget = (data) => {
    let schema = {
        datasets: [{
            data: [100, 350, 90],
            backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Eat out',
            'Rent',
            'Groceries'
        ]
    };
    if (data.length > 0) {
        schema.datasets[0].data = [];
        schema.labels = [];
        schema.datasets[0].backgroundColor = [];
        for (let i = 0; i < data.length; i++) {
            schema.datasets[0].data.push(data[i].budget);
            schema.datasets[0].backgroundColor.push(`rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`)
            schema.labels.push(data[i].title);
        }
    }
    return schema
}

const init = async () => {
    const rawData = await getBudget();
    const structuredData = await structureTheBudget(rawData);
    await createChartJSPieChart(structuredData);
}

init().then(() => {
    console.log(d3);
    console.log('all changes made');
});