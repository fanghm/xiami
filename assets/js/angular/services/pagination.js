'use strict';


/**
 *    Services that paginate entities
 */


app.factory('Pagination', function () {
    return {
        iLength: 10,
        iLengthOptions: [10, 25, 50, 100],
        iPage: 1,
        iPages: 1,
        iStart: 0,
        iEnd: 0,
        iTotal: 0,
        maxSize: 10,
        paginate: function (total) {
            var p = this
            p.iTotal = total
            p.iPages = Math.ceil(p.iTotal / p.iLength)
            p.iPage = p.iPages < p.iPage ? p.iPages : p.iPage
            if (!total) { // fix the bug: when total=0 then iStart=-9 and $skip=-10.
                p.iStart = 0;
                p.iEnd = 0;
                p.iPage = 1;
            } else {
                p.iStart = p.iLength * (p.iPage - 1) + 1
                p.iEnd = p.iLength * p.iPage > p.iTotal ? p.iTotal : p.iLength * p.iPage
            }

        }
    }
})