

//=======Selector
function init(){document.getElementById("selDataset").selectedIndex=0;
optionChanged(document.getElementById("selDataset").value);}

// }  

//Pass through selected variable from 'this' to all functions..IE "BB_940"
function optionChanged(sample){
  metadd(sample);
  updatepie(sample);
  updatescatter(sample);
}

//Generate Names List
//Send request for names json data
d3.json("/names", function(response) {
    var $dd = document.getElementById("selDataset")
    
    for(var i=0; i< response.length; i++){
        var $selection = document.createElement("option");
        $selection.innerHTML = response[i];
        $selection.setAttribute("id", response[i]);
        $dd.appendChild($selection);} init() });

//=====================Produce Metadata Output
    function metadd(sample){
//Send request for metadata json data
    d3.json("/metadata/" + sample , function(error, response){
    if (error) return console.warn(error);
    var responseKeys = Object.keys(response);
    var $sampleInfoPanel = document.querySelector("#sampleprofile");
    $sampleInfoPanel.innerHTML = '';
    for (var i=0; i<responseKeys.length; i++){
    var $dataPoint = document.createElement('p');
    $dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
    $sampleInfoPanel.appendChild($dataPoint)};});};



//Update Pie Chart
function updatepie(sample){
//Send request for samples json data
    d3.json("/samples/" + sample, function(error, response){
        if (error) return console.warn(error);
        otuid_s= response[0]["Otu Ids"].slice(0,10)
        samv_s = response[0]["sample_values"].slice(0,10)
//Send request for otu json data 
    d3.json("/otu", function(error, response){  
    if (error) return console.warn(error);
//generate hover text list
    var bacterialabels = []
    for (var i=0; i< otuid_s.length; i++){
    bacterialabels.push(response[otuid_s[i]])
    }
//populate data
    var data = [{
    values: samv_s,
    labels: otuid_s,
    hovertext: bacterialabels,
    hoverinfo: {bordercolor: 'black'},
    type: 'pie'
    }];
//Layout for Pie
    var layout = {
    width: 500,
    height: 375,
    title: "<b>Sample</b> " + "<i>"+sample+"</i>"
    };
//Create Pie Chart  
    Plotly.newPlot('PieChart', data, layout);
    });
    });
  };
    



function updatescatter(sample){


    d3.json("/samples/" + sample, function(error, response){
        if (error) return console.warn(error);
    // parse repsonse data and take sice of first ten
    // data returnes sorted from schalchemy/flask
        otu_x = response[0]["Otu Ids"]
        samp_y = response[0]["sample_values"]
    console.log(otu_x)  
    console.log(samp_y)  

    d3.json("/otu", function(error, response){  
        if (error) return console.warn(error);
        // console.log(response)
        var bacteriaNames1 = []
        for (var i=0; i< otu_x.length; i++){
        bacteriaNames1.push(response[otu_x[i]])
        }
console.log(bacteriaNames1)





    // Build Bubble Chart
var bubbleLayout = {
    // margin: { t: 100 },

    hovermode: 'closest',

    // showlegend: false,

    xaxis:{title:"Otu Ids"},
    yaxis:{title:"Values"},
    // xaxis: {
    //     autotick: false,
    //     ticks: 'outside',
    //     tick0: 0,
    //     dtick: 500,
    //     ticklen: 8,
    //     tickwidth: 4,
    //     tickcolor: '#000'
    //   },
    //   yaxis: {
    //     autotick: false,
    //     ticks: 'outside',
    //     tick0: 0,
    //     dtick: 50,
    //     ticklen: 8,
    //     tickwidth: 4,
    //     tickcolor: '#000'
    //   }
};
var bubbleData = [{ 
    x: otu_x,   
    y: samp_y,
    text: bacteriaNames1,
    type: 'scatter',
    mode: 'markers',
    marker: {
        size: samp_y,
        color: otu_x,
        colorscale: "Earth",    
        opacity: .9,

    }
}];

Plotly.plot('scatter', bubbleData, bubbleLayout);





});
    });

};


