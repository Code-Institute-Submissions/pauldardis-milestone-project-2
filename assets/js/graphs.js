queue()
    .defer(d3.csv, "assets/data/election-2016.csv")
    .await(makeGraphs);

function makeGraphs(error, electionData) {
    var ndx = crossfilter(electionData);


    // these are the working graphs 
    region_selector(ndx);
    constituency_selector(ndx);
    party_first_preference_graphs(ndx);
    // candidate_graphs(ndx);
    // show_data_table(ndx);
    show_count_candidate_fg(ndx, "F", "#count-of-women-candidate-fg");
    show_count_candidate_fg(ndx, "M", "#count-of-men-candidate-fg");
    show_count_elected_fg(ndx, "F", "#count-of-women-elected-fg");
    show_count_elected_fg(ndx, "M", "#count-of-men-elected-fg");
    show_count_candidate_ff(ndx, "F", "#count-of-women-candidate-ff");
    show_count_candidate_ff(ndx, "M", "#count-of-men-candidate-ff");
    show_count_elected_ff(ndx, "F", "#count-of-women-elected-ff");
    show_count_elected_ff(ndx, "M", "#count-of-men-elected-ff");
    show_count_candidate_gp(ndx, "F", "#count-of-women-candidate-gp");
    show_count_candidate_gp(ndx, "M", "#count-of-men-candidate-gp");
    show_count_elected_gp(ndx, "F", "#count-of-women-elected-gp");
    show_count_elected_gp(ndx, "M", "#count-of-men-elected-gp");
    show_count_candidate_lab(ndx, "F", "#count-of-women-candidate-lab");
    show_count_candidate_lab(ndx, "M", "#count-of-men-candidate-lab");
    show_count_elected_lab(ndx, "F", "#count-of-women-elected-lab");
    show_count_elected_lab(ndx, "M", "#count-of-men-elected-lab");
    show_count_candidate_sf(ndx, "F", "#count-of-women-candidate-sf");
    show_count_candidate_sf(ndx, "M", "#count-of-men-candidate-sf");
    show_count_elected_sf(ndx, "F", "#count-of-women-elected-sf");
    show_count_elected_sf(ndx, "M", "#count-of-men-elected-sf");
    show_count_candidate_others(ndx, "F", "#count-of-women-candidate-others");
    show_count_candidate_others(ndx, "M", "#count-of-men-candidate-others");
    show_count_elected_others(ndx, "F", "#count-of-women-elected-others");
    show_count_elected_others(ndx, "M", "#count-of-men-elected-others");


    dc.renderAll();
}

// queue()
//     .defer(d3.csv, "assets/data/generalelection2016constituencydetails.csv")
//     .await(makeTable);

// function makeTable(error, tableData) {
//     var ndx = crossfilter(tableData);


//     // these are the working graphs 
//     show_constituency_table(ndx)

//     dc.renderAll();
// }


function refreshPage() {
    window.location.reload();
}

function region_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('Region'));
    group = dim.group();

    dc.selectMenu("#region-selector")
        .dimension(dim)
        .group(group)
        .title(function(d) {
            return d.key;
        });
}

function constituency_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('Constituency_Name'));
    group = dim.group();

    dc.selectMenu("#constituency-selector")
        .dimension(dim)
        .group(group)
        .title(function(d) {
            return d.key;
        });
}


function show_count_candidate_fg(ndx, gender, element) {
    var countThatArecandidate = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Gender === gender) {
                p.count++;
                if (v.Party_Abbreviation === "F.G.") {
                    p.are_party++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.Gender === gender) {
                p.count--;
                if (v.Party_Abbreviation === "F.G.") {
                    p.are_party--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_party: 0 };
        },
    );

    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_party);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatArecandidate)
}

function show_count_elected_fg(ndx, gender, element) {
    var countThatAreElected = ndx.groupAll().reduce(
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count++;
                if ((v.Party_Abbreviation === "F.G.") && (v.Result === "Elected")) {
                    p.are_elected++;
                }
            }
            return p;
        },
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count--;
                if ((v.Party_Abbreviation === "F.G.") && (v.Result === "Elected")) {
                    p.are_elected--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_elected: 0 };

        },
    );

    console.log(countThatAreElected);
    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_elected);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatAreElected)
}

function show_count_candidate_ff(ndx, gender, element) {
    var countThatArecandidate = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Gender === gender) {
                p.count++;
                if (v.Party_Abbreviation === "F.F.") {
                    p.are_party++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.Gender === gender) {
                p.count--;
                if (v.Party_Abbreviation === "F.F.") {
                    p.are_party--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_party: 0 };
        },
    );

    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_party);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatArecandidate)
}

function show_count_elected_ff(ndx, gender, element) {
    var countThatAreElected = ndx.groupAll().reduce(
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count++;
                if ((v.Party_Abbreviation === "F.F.") && (v.Result === "Elected")) {
                    p.are_elected++;
                }
            }
            return p;
        },
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count--;
                if ((v.Party_Abbreviation === "F.F.") && (v.Result === "Elected")) {
                    p.are_elected--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_elected: 0 };

        },
    );

    console.log(countThatAreElected);
    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_elected);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatAreElected)
}

function show_count_candidate_gp(ndx, gender, element) {
    var countThatArecandidate = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Gender === gender) {
                p.count++;
                if (v.Party_Abbreviation === "G.P.") {
                    p.are_party++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.Gender === gender) {
                p.count--;
                if (v.Party_Abbreviation === "G.P.") {
                    p.are_party--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_party: 0 };
        },
    );

    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_party);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatArecandidate)
}

function show_count_elected_gp(ndx, gender, element) {
    var countThatAreElected = ndx.groupAll().reduce(
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count++;
                if ((v.Party_Abbreviation === "G.P.") && (v.Result === "Elected")) {
                    p.are_elected++;
                }
            }
            return p;
        },
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count--;
                if ((v.Party_Abbreviation === "G.P.") && (v.Result === "Elected")) {
                    p.are_elected--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_elected: 0 };

        },
    );

    console.log(countThatAreElected);
    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_elected);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatAreElected)
}

function show_count_candidate_lab(ndx, gender, element) {
    var countThatArecandidate = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Gender === gender) {
                p.count++;
                if (v.Party_Abbreviation === "LAB.") {
                    p.are_party++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.Gender === gender) {
                p.count--;
                if (v.Party_Abbreviation === "LAB.") {
                    p.are_party--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_party: 0 };
        },
    );

    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_party);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatArecandidate)
}

function show_count_elected_lab(ndx, gender, element) {
    var countThatAreElected = ndx.groupAll().reduce(
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count++;
                if ((v.Party_Abbreviation === "LAB.") && (v.Result === "Elected")) {
                    p.are_elected++;
                }
            }
            return p;
        },
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count--;
                if ((v.Party_Abbreviation === "LAB.") && (v.Result === "Elected")) {
                    p.are_elected--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_elected: 0 };

        },
    );

    console.log(countThatAreElected);
    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_elected);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatAreElected)
}

function show_count_candidate_sf(ndx, gender, element) {
    var countThatArecandidate = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Gender === gender) {
                p.count++;
                if (v.Party_Abbreviation === "S.F.") {
                    p.are_party++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.Gender === gender) {
                p.count--;
                if (v.Party_Abbreviation === "S.F.") {
                    p.are_party--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_party: 0 };
        },
    );

    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_party);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatArecandidate)
}

function show_count_elected_sf(ndx, gender, element) {
    var countThatAreElected = ndx.groupAll().reduce(
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count++;
                if ((v.Party_Abbreviation === "S.F.") && (v.Result === "Elected")) {
                    p.are_elected++;
                }
            }
            return p;
        },
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count--;
                if ((v.Party_Abbreviation === "S.F.") && (v.Result === "Elected")) {
                    p.are_elected--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_elected: 0 };

        },
    );

    console.log(countThatAreElected);
    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_elected);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatAreElected)
}

function show_count_candidate_others(ndx, gender, element) {
    var countThatArecandidate = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Gender === gender) {
                p.count++;
                if (v.Party_Abbreviation === "Others") {
                    p.are_party++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.Gender === gender) {
                p.count--;
                if (v.Party_Abbreviation === "Others") {
                    p.are_party--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_party: 0 };
        },
    );

    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_party);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatArecandidate)
}

function show_count_elected_others(ndx, gender, element) {
    var countThatAreElected = ndx.groupAll().reduce(
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count++;
                if ((v.Party_Abbreviation === "Others") && (v.Result === "Elected")) {
                    p.are_elected++;
                }
            }
            return p;
        },
        function(p, v, ) {
            if (v.Gender === gender) {
                p.count--;
                if ((v.Party_Abbreviation === "Others") && (v.Result === "Elected")) {
                    p.are_elected--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_elected: 0 };

        },
    );

    console.log(countThatAreElected);
    dc.numberDisplay(element)
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_elected);
            }
        })
        // .transitionDuration(1500)
        .formatNumber(d3.format("1.s"))
        .group(countThatAreElected)
}


function party_first_preference_graphs(ndx) {

    var dim = ndx.dimension(dc.pluck('Party_Abbreviation'));
    var group = dim.group().reduceSum(dc.pluck('Count_1'));

    dc.pieChart('#party_first_preference_graphs')
        .height(400)
        .width(400)
        .innerRadius(95)
        .transitionDuration(1500)
        .colors(d3.scale.ordinal().range(["#8B8C8A", "#00A3DF", "#12A853", "#014B45", "#D6323D", "#91B905"]))
        .dimension(dim)
        .renderLabel(true)
        .legend(dc.legend().x(150).y(130).itemHeight(14).gap(5))
        .title(function(d) {
            return d.key + ": " + ((d.value / d3.sum(group.all(),
                function(d) { return d.value; })) * 100).toFixed(2) + "%";
        })
        .on("pretransition", function(chart) {
            chart.selectAll("text.pie-slice").text(function(d) {
                if (dc.utils.printSingleValue(
                        (d.endAngle - d.startAngle) /
                        (2 * Math.PI) * 100) >= 6) {
                    return dc.utils.printSingleValue(
                        (d.endAngle - d.startAngle) /
                        (2 * Math.PI) * 100) + "%";
                }
            })
        })
        .group(group);
}