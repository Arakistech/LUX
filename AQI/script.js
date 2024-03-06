"use strict";
class Charts {
    constructor() {
        this.initLine();
    }
    initLine() {
        var borderColor = "#4EDEFD", ctx = $("#mainChart"), chartData = {
            type: 'line',
            data: {
                labels: ["5 Feb", "", "", "12 Feb", "", "", "19 Feb", "", "", "26 Feb", "", "", "4 Mar", ""],
                datasets: [
                    {
                        label: "Current",
                        lineTension: 0,
                        borderWidth: 2,
                        borderColor: borderColor,
                        backgroundColor: this.convertHex(borderColor, 10),
                        pointBackgroundColor: borderColor,
                        pointBorderColor: "white",
                        pointBorderWidth: 1,
                        pointRadius: 0,
                        pointHoverBackgroundColor: borderColor,
                        pointHoverBorderColor: "white",
                        pointHoverBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHitRadius: 10,
                        data: [24, 109, 88, 94, 102, 107, 156, 135, 124, 109, 108, 114, 109, 157, 56, 165, 5]
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                            gridLines: {
                                color: "grey",
                                zeroLineColor: "transparent"
                            },
                            ticks: {
                                fontColor: "white",
                                min: 0,
                                max: 175,
                                stepSize: 25
                            }
                        }],
                    xAxes: [{
                            gridLines: {
                                display: false,
                                drawOnChartArea: false,
                                zeroLineColor: "transparent",
                                zeroLineWidth: 1,
                            },
                            ticks: {
                                fontColor: "white"
                            }
                        }],
                },
                legend: {
                    display: false
                }
            }
        }, myChart = new Chart(ctx, chartData);
        this.updateChart(myChart);
    }
    updateChart(chartObject) {
        var tabs = $('.tabs li');
        tabs.click((event) => {
            event.preventDefault();
            var target = $(event.currentTarget);
            this.changeActiveTab(target);
            if (target.parent().hasClass("average-tabs")) {
                this.updateContent(target);
            }
            // get new values from tab
            var newValues = target.attr("data-values").split(',');
            // assign new values to chart
            for (let i = 0; i <= newValues.length; i++) {
                chartObject.data.datasets[0].data[i] = newValues[i];
            }
            // update chart with new values
            chartObject.update();
        });
    }
    changeActiveTab(target) {
        target.siblings().removeClass("is-active");
        target.addClass("is-active");
    }
    updateContent(clickedTab) {
        var sectionTitle = clickedTab.data("title"), sectionDesc = clickedTab.data("desc"), statusText = clickedTab.data("status"), status = clickedTab.data("status"), level = clickedTab.data("level");
        $('.body .section-title').text(sectionTitle);
        $('.body .section-description').text(sectionDesc);
        $('.status .status-circle').removeClass().addClass("status-circle " + status);
        $('.status .status-text').text(statusText);
        $('.average .average-value').text(level);
    }
    convertHex(hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return result;
    }
}
new Charts();
