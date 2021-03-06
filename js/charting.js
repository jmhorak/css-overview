/**
 * Create a HighCharts bar chart from a table source.
 *
 * Code copied from http://www.highcharts.com/demo/column-parsed
 * Author: Jeff Horak
 * Date: 7/2/12
 */
window.chart;
// On document ready, call visualize on the datatable.
$(document).ready(function() {

  /**
   * Visualize an HTML table using Highcharts. The top (horizontal) header
   * is used for series names, and the left (vertical) header is used
   * for category names. This function is based on jQuery.
   * @param {Object} table The reference to the HTML table to visualize
   * @param {Object} options Highcharts options
   */
  Highcharts.visualize = function(table, options) {
     // the categories
     options.xAxis.categories = [];
     $('tbody th', table).each( function(i) {
        options.xAxis.categories.push(this.innerHTML);
     });

     // the data series
     options.series = [];
     $('tr', table).each( function(i) {
        var tr = this;
        $('th, td', tr).each( function(j) {
           if (j > 0) { // skip first column
              if (i == 0) { // get the name and init the series
                 options.series[j - 1] = {
                    name: this.innerHTML,
                    data: []
                 };
              } else { // add values
                 options.series[j - 1].data.push(parseFloat(this.innerHTML));
              }
           }
        });
     });

     var chart = new Highcharts.Chart(options);
  }

  var table = document.getElementById('performanceDataTable'),
  options = {
    chart: {
      renderTo: 'performanceResults',
      type: 'column',
      width: 778,
      height: 300,
      marginLeft: 50,
      marginBottom: 25
    },
    credits: {
      y: 0
    },
    title: {
      text: 'CSS Performance'
    },
    xAxis: {
      labels: {
        style: {
          fontSize: 16
        },
        y: 20
      }
    },
    yAxis: {
      title: {
        text: 'ms',
        margin: 40
       }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      y: 100,
      x: 0
    },
    tooltip: {
      formatter: function() {
        return '<b>'+ this.series.name +'</b><br/>'+
          this.y +'ms on '+ this.x;
      }
    }
  };

  // Defer creating the chart, lots of other JS needs to happen first
  setTimeout(function() {
    Highcharts.visualize(table, options);
  }, 100);
});