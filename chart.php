    <!DOCTYPE html>
    <html>
    <head>
    <title>AmCharts Demo</title>

    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/timeline.css" rel="stylesheet" media="screen">
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/amcharts.js" type="text/javascript"></script> 
    <script src="js/timeline.js"></script>
 </head>


<body>
    <div id="wrapper">
	    <!--TIMELINE DROP MENU FILTER-->
    <div class="btn-group" id="timeline_filter">       
		<select  id="select-menu" onchange="fetchData();">
		  <option value="1">All</option>
		  <option value="2">Photos</option>
		  <option value="3">Videos</option>
        </select> 
    </div>
          <!--USED BY BOOTSTRAP TO POP HOVER LAYER IN CORRECT SPOT-->
          <div id="hover_layer"></div>


     <!--DIV LAYER USED BY AMCHARTS-->
     <div id="chartdiv" style="margin-top:200px;width:95%; height:300px;"></div>

     <!--HTML TEMPLATE FOR CHART BULLET HOVER LAYER-->
     <div id="timeline_hover_html" style="display:none">
      <div class="hover_wrapper">
        <button aria-hidden="true" class="close" type="button">×</button>
        <ul>
           %%THUMBS%%
        </ul>
      </div>
     </div>
<!--END MAIN LAYOUT DIV-->  
</div>
	<script type="text/javascript">
		
		    <!--AMCHART SETUP PARAMS--> 
    
            var chart;
            var graph;
            <!--DATES FOR CHART TO SHOW-->
            var chartDat = [
            {
                date: new Date(2012,8,22),
                value: 12
            },
            {
                date: new Date(2012,9,1),
                value: 9
            },
            {
                date: new Date(2012,9,5),
                value: 1
            },
            {
                date: new Date(2012,9,7),
                value: 3
            },
            {
                date: new Date(2012,9,11),
                value: 3
            },
            {
                date: new Date(2012,9,14),
                value: 5
            },
            {
                date: new Date(2012,9,22),
                value: 4
            },
            {
                date: new Date(2012,9,28),
                value: 6
            },
            {
                date: new Date(2012,10,6),
                value: 4
            },
            {
                date: new Date(2012,10,13),
                value: 13
            },
            {
                date: new Date(2012,10,17),
                value: 8
            },
            {
                date: new Date(2012,10,21),
                value: 11
            },
            {
                date: new Date(2012,10,26),
                value: 2
            },
            {
                date: new Date(2012,11,2),
                value: 3
            },
            {
                date: new Date(2012,11,6),
                value: 6
            },
            {
                date: new Date(2012,11,16),
                value: 17
            },
            {
                date: new Date(2012,11,19),
                value: 13
            },
            {
                date: new Date(2012,11,31),
                value: 11
            },
            {
                date: new Date(2013,0,1),
                value: 1
            }
            ];
		
		 function parseDate(chartData){
                
                for( var i = 0; i < chartData.length; ++i ) {
                    //var dateArray = chartData[i]["date"].split("/");
                    var date = new Date(chartData[i]["date"]);
                    chartData[i]["date"] =  date;
                    //window.alert(chartData[i]["date"]);
                }
				return chartData;
            }
		
		function amchart(chartData){		 
		
		   chartData= parseDate(chartData);
		 
		  // SERIAL CHART
                chart = new AmCharts.AmSerialChart();
                chart.pathToImages = "img/";
                chart.dataProvider = chartData;
                chart.marginLeft = 10;
                chart.categoryField = "date";
                chart.balloon.enabled = false;
                chart.backgroundColor = "#f3f3f3";
                chart.zoomOutButton = {
                    backgroundColor: '#000000',
                    backgroundAlpha: 0.15
                };

                // listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
			
                chart.addListener("dataUpdated", zoomChart);
					
                //chart.addListener("clickGraphItem", Timeline.bulletClick);
                chart.addListener("rollOverGraphItem", Timeline.rolledOverBullet);
				//chart.addListener("zoomed", f);
             //   chart.addListener("zoomed", Timeline.scaled);
				


                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
                categoryAxis.minPeriod = "DD"; // our data is yearly, so we set minPeriod to YYYY
                categoryAxis.gridAlpha = 0;
                categoryAxis.groupToPeriods = "MM";
				categoryAxis.ignoreAxisWidt =true;

				//categoryAxis.centerLabelOnFullPeriod=true;


                //SETTINGS TO NOT SHOW LEFT VALUE AXIS
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.gridAlpha = 0;
                valueAxis.axisAlpha = 0;
                valueAxis.labelsEnabled = false;
                valueAxis.minimum = 0;
				valueAxis.tickLength=110;

                chart.addValueAxis(valueAxis);

                // GRAPH                
                graph = new AmCharts.AmGraph();
                graph.type = "smoothedLine"; // this line makes the graph smoothed line.
                graph.lineColor = "#c8e9e0";
                graph.negativeLineColor = "#c8e9e0"; // this line makes the graph to change color when it drops below 0
                graph.bullet = "round";
                graph.bulletSize = 11;
				graph.bulletBorderThickness = 3;
                graph.bulletColor = "#ffffff";
                graph.bulletBorderColor = "#2490d0";
                graph.lineThickness = 0;
                graph.valueField = "value";
                graph.fillAlphas = 1;
                chart.addGraph(graph);
                
                // SCROLLBAR
                var chartScrollbar = new AmCharts.ChartScrollbar();
                chartScrollbar.graph = graph;
                chartScrollbar.backgroundColor = "#F0F0F0";
				chartScrollbar.selectedGraphFillColor = "#D0D0D0";
				chartScrollbar.graphFillColor = "#DCDCDC";	
                chartScrollbar.scrollbarHeight = 38;
				chartScrollbar.backgroundAlpha = 10;
                chartScrollbar.selectedBackgroundColor = "#FFFFFF";
				
				
                chart.addChartScrollbar(chartScrollbar);
				
				
				
                // WRITE
                chart.write("chartdiv");

		
      }

   function fetchData(){
		   var q = $("#select-menu").val();
	       if(q==1){
             Url="http://localhost/amcharts/json/all.txt";
		    }else if(q=='2'){
			  Url="http://localhost/amcharts/json/photos.txt";
			}else if(q=='3'){
	       	Url="http://localhost/amcharts/json/videos.txt";
			}
		   $.ajax({
			 url: Url,
			 type: "GET",
			 dataType: "json",
			 success: function (data) {
			    amchart(data);
			  }
		   });
	  }   
					
            //AMCHARTS SETUP VALUES
              $(document).ready(function() {
			          fetchData();
					  //amchart(chartDat);
			     });
            // this method is called when chart is first inited as we listen for "dataUpdated" event
            function zoomChart() {	
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                chart.zoomToDates(new Date(2012, 10, 1), new Date(2013, 0, 8));
            }
	
        </script>

    </body>
    </html>
	