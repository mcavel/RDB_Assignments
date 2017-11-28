
//test out print responses from flask API
d3.json("/names", function(response) {
    console.log(response);
  });
  d3.json("/otu", function(response) {
    console.log(response);
  });

  d3.json("/metadata/952", function(response) {
    console.log(response);
  });
  d3.json("/wfreq/952", function(response) {
    console.log(response);
  });
  d3.json("/samples/BB_952", function(response) {
    console.log(response);
  });


//=======Selector
  
d3.json("/names", function(response) {
    var $dd = document.getElementById("selDataset")
    
    for(var i=0; i< response.length; i++){
        var $selection = document.createElement("option");
        $selection.innerHTML = response[i];
        $selection.setAttribute("id", response[i]);
        $dd.appendChild($selection);} });

//=====================PIE Placeholder
        var data = [{
            values: [19, 26, 55],
            labels: ['Residential', 'Non-Residential', 'Utility'],
            type: 'pie'
          }];
          
          var layout = {

            height: 400,
            width: 450
          };
            
          Plotly.newPlot('PieChart', data, layout);

// SCATTER Placeholder======================



Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv", function(err, rows){
    
      function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }
    
      var data = [{
          type: 'scatter',
          mode: 'markers',
          x: unpack(rows, 'lifeExp'),
          y: unpack(rows, 'gdpPercap'),
          text: unpack(rows, 'continent'),
          marker: {
            size: unpack(rows, 'pop'),
            sizemode: "area",
            sizeref: 200000
          },
          transforms: [
            {
            type: 'filter',
            target: unpack(rows, 'year'),
            operation: '=',
            value: '2007'
            }, {
            type: 'groupby',
            groups: unpack(rows, 'continent'),
            styles: [
              {target: 'Asia', value: {marker: {color: 'red'}}},
              {target: 'Europe', value: {marker: {color: 'blue'}}},
              {target: 'Americas', value: {marker: {color: 'orange'}}},
              {target: 'Africa', value: {marker: {color: 'green'}}},
              {target: 'Oceania', value: {marker: {color: 'purple'}}}
            ]
      }]
        }]
    
    var layout = {
      yaxis: {
        type: 'log'
      }
    }
    
    Plotly.plot('scatter', data, layout)
    });


