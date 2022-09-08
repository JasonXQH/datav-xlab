var openDigger = require('../../src/open_digger');
var now = new Date();
var res = now.setMonth(now.getMonth() - 1); // handle new year
var startYear = 2022, startMonth = 1, endYear = now.getFullYear(), endMonth = now.getMonth() + 1;
var forEveryMonth = f => {
    var index = 0;
    for (var y = startYear; y <= endYear; y++)
        for (var m = 1; m <= (y === endYear ? endMonth : startMonth); m++)
            f(y, m, index++);
};