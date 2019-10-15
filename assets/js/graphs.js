queue()
    .defer(d3.csv, "assets/data/election-2016.csv")
    .await(makeGraphs);

function makeGraphs(error, electionData) {
    var ndx = crossfilter(electionData);


    // these are the working graphs 
    region_selector(ndx);
    constituency_selector(ndx);
    // party_first_preference_graphs(ndx);
    // candidate_graphs(ndx);
    // show_data_table(ndx);
    // show_count_candidate_fg(ndx, "F", "#count-of-women-candidate-fg");
    // show_count_candidate_fg(ndx, "M", "#count-of-men-candidate-fg");
    // show_count_elected_fg(ndx, "F", "#count-of-women-elected-fg");
    // show_count_elected_fg(ndx, "M", "#count-of-men-elected-fg");
    // show_count_candidate_ff(ndx, "F", "#count-of-women-candidate-ff");
    // show_count_candidate_ff(ndx, "M", "#count-of-men-candidate-ff");
    // show_count_elected_ff(ndx, "F", "#count-of-women-elected-ff");
    // show_count_elected_ff(ndx, "M", "#count-of-men-elected-ff");
    // show_count_candidate_gp(ndx, "F", "#count-of-women-candidate-gp");
    // show_count_candidate_gp(ndx, "M", "#count-of-men-candidate-gp");
    // show_count_elected_gp(ndx, "F", "#count-of-women-elected-gp");
    // show_count_elected_gp(ndx, "M", "#count-of-men-elected-gp");
    // show_count_candidate_lab(ndx, "F", "#count-of-women-candidate-lab");
    // show_count_candidate_lab(ndx, "M", "#count-of-men-candidate-lab");
    // show_count_elected_lab(ndx, "F", "#count-of-women-elected-lab");
    // show_count_elected_lab(ndx, "M", "#count-of-men-elected-lab");
    // show_count_candidate_sf(ndx, "F", "#count-of-women-candidate-sf");
    // show_count_candidate_sf(ndx, "M", "#count-of-men-candidate-sf");
    // show_count_elected_sf(ndx, "F", "#count-of-women-elected-sf");
    // show_count_elected_sf(ndx, "M", "#count-of-men-elected-sf");
    // show_count_candidate_others(ndx, "F", "#count-of-women-candidate-others");
    // show_count_candidate_others(ndx, "M", "#count-of-men-candidate-others");
    // show_count_elected_others(ndx, "F", "#count-of-women-elected-others");
    // show_count_elected_others(ndx, "M", "#count-of-men-elected-others");


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
