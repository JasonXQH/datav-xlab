var openDigger = require('./src/open_digger');
var now = new Date();
var res = now.setMonth(now.getMonth() - 1); // handle new year
var startYear = 2022, startMonth = 1, endYear = now.getFullYear(), endMonth = now.getMonth() + 1;
var forEveryMonth = f => {
    var index = 0;
    for (var y = startYear; y <= endYear; y++)
        for (var m = 1; m <= (y === endYear ? endMonth : startMonth); m++)
            f(y, m, index++);
};

openDigger.index.openrank.getRepoOpenrank({
    labelUnion: [':communities/xlab'],
    startYear, startMonth,
    endYear, endMonth,
    groupTimeRange: 'month', limit: -1,
}).then(data => {
    var x = [], v = [], g = []; g.push(0);
    forEveryMonth((y, m, index) => {
        var key = `Y${y}M${m}`;
        x.push(key); v.push(0);
        data.forEach(row => { v[index] += (row.open_rank[index] ? row.open_rank[index] : 0); row[key] = row.open_rank[index] ? row.open_rank[index] : 0; });
        if (index > 0) g.push(Math.ceil((v[index]-v[index-1])*100/v[index-1]));
    });
    data.forEach(row => { delete row.open_rank; delete row.org; });
    console.table(data);
    openDigger.render.plotly([
        { x, y: v, type: 'scatter', name: 'OpenRank' },
        { x, y: g, type: 'bar', yaxis: 'y2', name: 'Growth'}
    ], {
        title: 'X-lab OpenRank trending',
        yaxis2: { overlaying: 'y', side: 'right' }
    });
    fs.writeFileSync('all_data.json', JSON.stringify(data));
});