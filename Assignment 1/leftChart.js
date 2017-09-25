//GLOBAL VARIABLES
//Store width, height and margin in variables
const wLine = 600;//(window.innerWidth)/2;
const hLine = 450//(window.innerHeight/1.2);
const marginLine = {top: 30, right: 60, bottom: 40, left: 70};

let data;

d3.csv("wiid.csv", function(error, data) {
    if (error) {
        throw error;
    } else {

//CLEANING THE DATA
        let countries = ["Angola","Benin","Botswana", "Burkina Faso", 'Burundi', 'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Cote d\'Ivoire', 'Djibouti', 'Ethiopia', 'Gabon', 'The Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Mozambique', 'Namibia', 'Niger', 'Reunion', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe'];


        // Only countries in SSA
        let dataForChart = [];
        for (let item of countries) {
            for (let row of data) {
                if (row.Country.includes(item)) {
                    dataForChart.push(row)
                } //close if
            }
        } // close for loops

        // set up data on years
        let years = [];
        let yearlist = function (y) {
            for (let i in dataForChart) {
                if ((y.includes(dataForChart[i].Year))) {
                    console.log(dataForChart[1].Year);
                }
                else {
                    y.push(data[i].Year);
                } // close else
            } // close for
            return y;
        }; //All years to use:
        yearlist(years);
        let sortedYears = years.sort();
        // find extremes
        let yearsMin = d3.min(years);
        console.log("Min year in data: " + yearsMin);
        let yearsMax = d3.max(years);
        console.log("Max year in data: " + yearsMax);

        // get highest Gini
        let allGiniRow = [];
        for(row of dataForChart) {
            allGiniRow.push(row.Gini);
        }
        let giniMax = d3.max(allGiniRow);
        console.log("Highest Gini in SSA: " + giniMax);

        console.log(countries[1]);

// BUILD DIRECTORY FOR GRAPH
        console.log(dataForChart); // check format dataForChart
        // check format dataForChart
        let dataGraph = {};
        for (let i of countries) {
            let obKey = i;
            yearData = [];
            // console.log(obKey); //check
            for (let k in dataForChart) {
                if (dataForChart[k].Country === obKey) {
                    let oneYearData = {
                        'year': dataForChart[k].Year,
                        'gini': dataForChart[k].Gini
                    };
                    yearData.push(oneYearData);
                }
                dataGraph[obKey] = yearData;
            }
        }
        console.log(dataGraph["Benin"]); //check if correct data


// BUILDING ELEMENTS
        //Create an empty svg called "chart"
        let chartHeight = hLine - marginLine.top - marginLine.bottom;
        let chartWidth = wLine - marginLine.left - marginLine.right;
        let chart = d3.select("#chartLeft").append("svg")
            // .attr("width", wLine + 60)
            // .attr("height", hLine - (marginLine.bottom - 150))
            .attr("height", chartHeight + marginLine.top + marginLine.bottom)
            .attr("width", chartWidth + marginLine.left + marginLine.right);

        let g = chart.append('g')
                    .attr("transform", "translate(" + (marginLine.left) + "," + (marginLine.top) + ")");


        // Set the ranges of the graphs lines
        let x = d3.scaleLinear().range([0,chartWidth]);
        let y = d3.scaleLinear().range([chartHeight, 0]);

        // Scale the range of the data
        x.domain([yearsMin, yearsMax]);
        y.domain([0, giniMax]);

        for (let key in dataGraph) {
                if (dataGraph.hasOwnProperty(key)){
                    console.log(key + " >> " + dataGraph[key]);

                    let data = dataGraph[key];
                    console.log(data[1]); //check what data is

                    // create valuelines
                    let valueline = d3.line()
                        .x(function (d) {return x(d.year);
                        })
                        .y(function (d) {return y(d.gini);
                        });
                    // Add the valueline path.
                    g.append("path") // class "line"
                        .data([data])
                        .attr("class", "line")
                        .attr("d", valueline);
                }
        }// end for loop for all countries in dataGraph4

        // Add x axis
        let xStart = chartHeight - marginLine.bottom - marginLine.top;
        g.append("g")
            .attr("class", "axis") // mind class of "axis"
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.format("d")))
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("transform", "rotate(-65)");
            // Add text label for the x axis
            // chart.append("text")
            //     .attr("class", "labels")
            //     .attr("transform",
            //         // "translate(" + ((wLine - ((marginLine.left - 110) + marginLine.right))/2) + " ," +
            //         // (hLine - marginLine.bottom + ")")
            //     .style("text-anchor", "middle")
            //     .text("Years");


        // Add the Y Axis
        g.append("g")
            .attr("class", "axis") // mind class of "axis"
            //.attr("transform", "translate(" + (marginLine.left) + "," + marginLine.top + ")")
            .call(d3.axisLeft(y)
                .tickFormat(d3.format("d"))
            );
        // Add text label for the y axis
        g.append("text")
            .attr("class", "labels") // attach id
            .attr("transform", "rotate(-90)")
            .attr("y", -43)
            .attr("x",0 - (chartHeight / 2))
            .style("text-anchor", "middle")
            .text("Gini coefficient (in %)");

    } // closes else after error
}); // closes data read and call back


// //BUILDING THE GRAPH

        // // Scale the width and height
        // let xScaleLine = d3.scaleLinear()
        //     .domain([0, sortedYears.length]) //****************needs to be something else!!
        //     .range([marginLine.left, wLine - marginLine.right - marginLine.left]);
        //
        // let yScaleLine = d3.scaleLinear()
        //     .domain([0, 78.6])
        //     .range([marginLine.top, hLine - marginLine.bottom]);






// // set the ranges
//         let x = d3.scaleTime().range([0, wLine]);
//         let y = d3.scaleLinear().range([hLine, 0]);
//
//     for (item of dataForChart[1]) {
//     // define the line
//         let valueline = d3.line()
//             .x(function (dataForChart) {
//                 return x(dataForChart[1][]Year);
//             })
//             .y(function (dataForChart) {
//                 return y(d.Gini);
//             });
//     }

//         linechart.append("text")
//             .attr("id", "hoverLabel")
//             .attr("x", xPosition)
//             .attr("y", yPosition)
//             .attr("text-anchor", "start")
//             .attr("font-family", "ff-nuvo-sc-web-pro-1,ff-nuvo-sc-web-pro-2, sans-serif")
//             .attr("font-size", "20px")




// let activeDistrict;

// Load in csv data

//
//
//     function svg(data) {
//         let tmp = [];
//         for(let i in data) {
//             tmp.push(data[i].operatingExpenses);
//         }
//         let max = d3.max(tmp);
//         console.log(max);
//
//
//
//
// // // Setting x position for line labels
// // let xLabelLine = wLine - marginLine.right - marginLine.left;
//
//
// //Create an empty svg
//
//     let linechart = d3.select("#chartLeft")
//         .append("svg")
//         .attr("width", wLine)
//         .attr("height", hLine);
//
//
// //let dataset; // Global variable
//
//     let activeCountry; // Will be used for linked hovering
//

//
//
// //Make dataset an empty array (for now) to hold our restructured dataset
// dataset = [];
//
// // Loop once for each row in data
// for (let i=0; i < data.length; i++) {
//
//     //Create a new object with the Country name and empty array
//     dataset[i] = {
//         country: data[i].Country,
//         Gini: []
//     };
//
//     //Loop through all the years
//     for (let j = 0; j < years.length; j++) {
//
//         //If value is empty
//         if (data[i][years[j]]) {
//             //Add a new object to the Gini data array for that country
//             dataset[i].Gini.push({
//                 year: years[j],
//                 amount: data[i][years[j]]
//
//             }); // end of push( function
//         } //end of if(
//     } // end of for loop for years
// } // end of for loop for data

// Set scale domains
//
// xScaleLine.domain([
//     d3.min(years, function(d) {
//         return dateFormat.parse(d);
//     }),
//     d3.max(years, function(d) {
//         return dateFormat.parse(d);
//     })
// ]);
//
// yScaleLine.domain([
//     d3.max(dataset, function(d) {
//         return d3.max(d.rate, function(d) {
//             return +d.amount;
//         });
//     }),
//     0
// ]);

// // Make a group for each country
// let groups = linechart.selectAll("g")
//     .data(data)
//     .enter()
//     .append("g")
//     // .classed("national", function(d) {
//     //     if (d.district == "UGANDA") return true;
//     //     else return false;
//     // })
//     .on("mouseover", function (d) {
//
//         activeCountry = d.Country;
//
//         // Setting positio for the district label
//         let xPosition = wLine / 2 + 35;
//         let yPosition = marginLine.top - 10;
//
//         linechart.append("text")
//             .attr("id", "hoverLabel")
//             .attr("x", xPosition)
//             .attr("y", yPosition)
//             .attr("text-anchor", "start")
//             .attr("font-family", "ff-nuvo-sc-web-pro-1,ff-nuvo-sc-web-pro-2, sans-serif")
//             .attr("font-size", "20px")
//             .text(activeCountry);
//
//         d3.selectAll("rect")
//             .classed("barLight", function (d) {
//                 if (d.Country === activeCountry) return true;
//                 else return false;
//             });
//
//     }) // end of .on mouseover
//
//     .on("mouseout", function () {
//         d3.select("#hoverLabel").remove();
//
//         d3.selectAll("rect")
//             .attr("class", "barBase");
//
//     })// end of .on mouseout
//
//
// // Append a title with the district name (for easy tooltips)
// groups.append("title")
//     .text(function (d) {
//         return d.Country;
//     });
//
// //Within each group, create a new line/path,
// //binding just the div9 rate data to each one
// groups.selectAll("path")
//     .data(function (d) {
//         return [d.Gini];
//     })
//     .enter()
//     .append("path")
//     .attr("class", "line")
//     .attr("d", line);
//
// //Axes
// linechart.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + (hLine - marginLine.bottom) + ")")
//     .call(xAxisLine);
//
// linechart.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(" + (marginLine.left) + ",0)")
//     .call(yAxisLine)
//     .append("text")
//     .attr("x", 0 - marginLine.left)
//     .attr("y", marginLine.top - 10)
//     .style("text-anchor", "start")
//     .text("Gini coefficient development");

// //Labels for highlighted lines - probably better to wrap these into the line elements themselves
// //with some logic for selecting the ones you want to highlight? Use anonymous function to match objects for highlighting?
// //National label
// linechart.append("text")
//     .attr("transform", "translate(" + xLabelLine + ", " + yScaleLine(data[20][years[4]]) + ")")
// //     .attr("dy", ".15em")
// //     .attr("dx", ".25em")
// //     .attr("text-anchor", "start")
// //     .attr("class","labelNation")
// //     .text(data[20][years[4]]);
//
//    } //else close on top
// });// end of function "d3.csv(" where data were loaded.