$(document).ready(function () {
    chartInit();
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    document.getElementById("select").style.display = "none"
    document.getElementById("dropdown").onclick = function () {
        if (document.getElementById("select").style.display == "none") {
            document.getElementById("select").style.display = "block";
        } else {
            document.getElementById("select").style.display = "none";
        }
    }
    fetch('https://corona.lmao.ninja/v2/continents?yesterday=true&sort').then(function (response) {
        return response.json();
    }).then(function (data) {
        var cases9 = Array();
        for (var i = 0; i < data.length; i++) {


            cases9.push(data[i].cases);
        }
        cases9.sort(function (a, b) {
            return a - b;
        });
        cases9.reverse();
        var ctx = document.getElementById('doughnut').getContext('2d');
        
        mychart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Australia/Oceania'],
                datasets: [{
                    data: cases9,
                    backgroundColor: ["#ff0a0a", "#fc5d5d", "#ff8a8a", "#ffa6a6", "#fcbbbb", "#ffd1d1", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                    cutoutPercentage: 50,
                }],
            }

        });


    })


    fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/cases.json').then(function (response) {
        return response.json();
    }).then(function (obj) {
        var country = Array();
        for (var i = 0; i < obj.length; i++) {
            country.push(obj[i].id);
        }
        var op = ' ';
        country.forEach((e) => {
            op += '<li class="list-group-item"><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="' + e + '" value="' + e + '" name=type ><label class="custom-control-label" for="' + e + '">' + e + '</label></div></li>';
        })
        $('#select').append(op);

        document.getElementById("dropdown").onclick = function () {
            if (document.getElementById("select").style.display == "none") {
                document.getElementById("select").style.display = "block";

            } else {
                document.getElementById("select").style.display = "none";
            }
        }
        $('.custom-control-input').click(function () {
            var cases = Array();
            var labels = Array();
            var casestemp = Array();
            var selectedcountries = [];
            $("input:checkbox[name=type]:checked").each(function () {
                selectedcountries.push($(this).val());
                $('.msg').html('');
            });
            if (selectedcountries.length == 0) {
                chartInit();
            } else {
                fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/deaths.json').then(function (response) {
                    return response.json();
                }).then(function (obj) {
                    var deaths = Array();
                    casestemp = [];
                    var deaths = Array();
                    for (var i = 0; i < selectedcountries.length; i++) {
                        for (var j = 0; j < obj.length; j++) {
                            if (selectedcountries[i] == obj[j].id) {
                                for (var k = 0; k < obj[j].data.length; k++) {
                                    casestemp.push(obj[j].data[k].y);
                                }
                                break;
                            }
                        }
                        deaths.push(casestemp);
                        casestemp = [];
                    }
                    ////chart deaths
                    $('#chart2').remove(); // this is my <canvas> element
                    $('#hDeaths').remove();
                    $('.chart2').append(`<h4 class="mt-0 header-title" id="hDeaths">Every Day Deaths Chart</h4>              
                    <canvas style=" max-height : 420px" id="chart2" height="200"></canvas>`);
                    var ctx2 = document.getElementById('chart2').getContext('2d');

                    window.chart2 = new Chart(ctx2, {
                        type: 'line',
                        data: {
                            labels: labels,

                        },
                        options: {
                            legend: {
                                display: true,
                            }
                        }
                    });
                    for (let i = 0; i < deaths.length; i++) {
                        chart2.data.datasets.push({
                            fill: false,
                            data: deaths[i],
                            label: selectedcountries[i],
                            borderColor: dynamicColors(),
                            pointBorderColor: dynamicColors(),
                            pointHoverBackgroundColor: dynamicColors(),
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            borderWidth: 2,
                            pointBackgroundColor: dynamicColors(),
                            pointBorderWidth: 0,
                            pointHoverRadius: 3,
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 3,
                            pointRadius: 0,
                            pointHitRadius: 5,
                        });
                    }
                    chart2.update();
                })
                fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/recovered.json').then(function (response) {
                    return response.json();
                }).then(function (obj) {
                    var recovered = Array();
                    casestemp = [];
                    var deaths = Array();
                    for (var i = 0; i < selectedcountries.length; i++) {
                        for (var j = 0; j < obj.length; j++) {
                            if (selectedcountries[i] == obj[j].id) {
                                for (var k = 0; k < obj[j].data.length; k++) {
                                    casestemp.push(obj[j].data[k].y);
                                }
                                break;
                            }
                        }
                        recovered.push(casestemp);
                        casestemp = [];
                    }
                    ////chart recovered
                    $('#chart3').remove(); // this is my <canvas> element
                    $('#hRecovered').remove();
                    $('.chart1').append(`<h4 class="mt-0 header-title" id="hRecovered">Every Day Recovery Chart</h4>
                    <canvas style=" max-height : 420px" id="chart3" height="200"></canvas>`);
                    var ctx3 = document.getElementById('chart3').getContext('2d');

                    window.chart3 = new Chart(ctx3, {
                        type: 'line',
                        data: {
                            labels: labels,

                        },
                        options: {
                            legend: {
                                display: true,
                            }
                        }
                    });
                    for (let i = 0; i < recovered.length; i++) {
                        chart3.data.datasets.push({
                            fill: false,
                            data: recovered[i],
                            label: selectedcountries[i],
                            borderColor: dynamicColors(),
                            pointBorderColor: dynamicColors(),
                            pointHoverBackgroundColor: dynamicColors(),
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            borderWidth: 2,
                            pointBackgroundColor: dynamicColors(),
                            pointBorderWidth: 0,
                            pointHoverRadius: 3,
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 3,
                            pointRadius: 0,
                            pointHitRadius: 5,

                        });
                    }
                    chart3.update();
                })
                for (var k = 0; k < obj[0].data.length; k++) {
                    labels.push(obj[0].data[k].date);
                }
                for (var i = 0; i < selectedcountries.length; i++) {
                    for (var j = 0; j < obj.length; j++) {
                        if (selectedcountries[i] == obj[j].id) {
                            for (var k = 0; k < obj[j].data.length; k++) {
                                casestemp.push(obj[j].data[k].y);
                            }
                            break;
                        }
                    }
                    cases.push(casestemp);
                    casestemp = [];
                }
                var dynamicColors = function () {
                    var r = Math.floor(Math.random() * 255);
                    var g = Math.floor(Math.random() * 255);
                    var b = Math.floor(Math.random() * 255);
                    return "rgb(" + r + "," + g + "," + b + ")";
                };
                /////chart cases
                $('#chart1').remove(); // this is my <canvas> element
                $('#hConfirmed').remove();
                $('.chart3').append(`<h4 class="mt-0 header-title" id="hConfirmed">Confirmed Cases</h4>
                   <canvas style=" max-height : 420px" id="chart1" height="140"></canvas>`);
                var ctx = document.getElementById('chart1').getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,

                    },
                    options: {
                        legend: {
                            display: true,
                        }
                    }
                });
                for (let i = 0; i < cases.length; i++) {
                    chart.data.datasets.push({
                        fill: false,
                        data: cases[i],
                        label: selectedcountries[i],
                        borderColor: dynamicColors(),
                        pointBorderColor: dynamicColors(),
                        pointHoverBackgroundColor: dynamicColors(),
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        borderWidth: 2,
                        pointBackgroundColor: dynamicColors(),
                        pointBorderWidth: 0,
                        pointHoverRadius: 3,
                        pointHoverBorderColor: "#fff",
                        pointHoverBorderWidth: 3,
                        pointRadius: 0,
                        pointHitRadius: 5,

                    });
                }
                chart.update();

            }




        })

    })


    fetch('https://corona-api.com/timeline').then(function (response) {
        return response.json();
    }).then(function (obj) {
        var arr = obj.data;
        var lastUpdate = arr[0].updated_at.replace('Z', '').replace('T', ' at ');
        $('#title').html("LastUpdate : " + lastUpdate)
        var confirmed = [];
        var deaths = [];
        var recovered = [];
        var date = [];
        var size = arr.length - 1;
        var j = 0
        for (var i = size; i >= 0; i--) {
            confirmed[j] = arr[i].confirmed;
            deaths[j] = arr[i].deaths;
            recovered[j] = arr[i].recovered;
            date[j] = arr[i].date;
            j++;
        }
        donnee = [];
        donnee.push(confirmed);
        donnee.push(recovered);
        donnee.push(deaths);
        labels = ["Cases", "Recovered", "Deaths"];
        var dynamicColors = function () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        };
        var ctxgen = document.getElementById('genChart').getContext('2d');
        var chartgen = new Chart(ctxgen, {
            type: 'line',
            data: {
                labels: date,

            },
            options: {
                legend: {
                    display: true,
                }
            }
        });
        for (let i = 0; i < donnee.length; i++) {
            chartgen.data.datasets.push({
                fill: false,
                data: donnee[i],
                label: labels[i],
                borderColor: dynamicColors(),
                pointBorderColor: dynamicColors(),
                pointHoverBackgroundColor: dynamicColors(),
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                borderWidth: 2,
                pointBackgroundColor: dynamicColors(),
                pointBorderWidth: 0,
                pointHoverRadius: 3,
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 5,

            });
        }
        chartgen.update();

    })


    fetch('https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateByAge').then(function (response) {
        return response.json();
    }).then(function (obj) {
        var labels = Array();
        var donnee = Array();
        for (var i = 0; i < obj.table.length - 1; i++) {
            var str = obj.table[i].DeathRateAllCases;
            labels.push(obj.table[i].Age);
            str = str.substring(0, str.length - 1);
            donnee.push(parseInt(str));
        }
        var ctx4 = document.getElementById('chart4').getContext('2d');
        var chart4 = new Chart(ctx4, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'My First dataset',
                    data: donnee,
                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                }]
            },

            options: {}
        });
    })
})
var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};



function chartInit() {
    Chart.defaults.global.legend.labels.usePointStyle = true;

    fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/recovered.json').then(function (response) {
        return response.json();
    }).then(function (obj) {
        var recovered = Array();
        var casestemp = [];
        var labels = [];
        for (var i = 0; i < obj[0].data.length; i++) {
            labels.push(obj[0].data[i].date);
        }
        var selectedcountries = ["US", "India", "Brazil"]
        for (var i = 0; i < selectedcountries.length; i++) {
            for (var j = 0; j < obj.length; j++) {
                if (selectedcountries[i] == obj[j].id) {
                    for (var k = 0; k < obj[j].data.length; k++) {
                        casestemp.push(obj[j].data[k].y);
                    }
                    break;
                }
            }
            recovered.push(casestemp);
            casestemp = [];
        }
        ////chart recovered
        $('#chart3').remove(); // this is my <canvas> element
        $('#hRecovered').remove();
        $('.chart1').append(`<h4 class="mt-0 header-title" id="hRecovered">Every Day Recovery Chart</h4>
                    <canvas style=" max-height : 420px" id="chart3" height="200"></canvas>`);
        var ctx3 = document.getElementById('chart3').getContext('2d');
        var chart3 = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: labels,

            },
            options: {
                legend: {
                    display: true,
                }
            }
        });
        for (let i = 0; i < recovered.length; i++) {
            chart3.data.datasets.push({
                fill: false,
                data: recovered[i],
                label: selectedcountries[i],
                borderColor: dynamicColors(),
                pointBorderColor: dynamicColors(),
                pointHoverBackgroundColor: dynamicColors(),
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                borderWidth: 2,
                pointBackgroundColor: dynamicColors(),
                pointBorderWidth: 0,
                pointHoverRadius: 3,
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 5,

            });
        }
        chart3.update();
    })
    fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/deaths.json').then(function (response) {
        return response.json();
    }).then(function (obj) {
        var deaths = Array();
        var casestemp = [];
        var labels = [];
        for (var i = 0; i < obj[0].data.length; i++) {
            labels.push(obj[0].data[i].date);
        }
        var selectedcountries = ["US", "India", "Brazil"]
        for (var i = 0; i < selectedcountries.length; i++) {
            for (var j = 0; j < obj.length; j++) {
                if (selectedcountries[i] == obj[j].id) {
                    for (var k = 0; k < obj[j].data.length; k++) {
                        casestemp.push(obj[j].data[k].y);
                    }
                    break;
                }
            }
            deaths.push(casestemp);
            casestemp = [];
        }
        ////chart deaths
        $('#chart2').remove(); // this is my <canvas> element
        $('#hDeaths').remove();
        $('.chart2').append(`<h4 class="mt-0 header-title" id="hDeaths">Every Day Deaths Chart</h4>              
                    <canvas style=" max-height : 420px" id="chart2" height="200"></canvas>`);
        var ctx2 = document.getElementById('chart2').getContext('2d');
        var chart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: labels,

            },
            options: {
                legend: {
                    display: true,
                }
            }
        });
        for (let i = 0; i < deaths.length; i++) {
            chart2.data.datasets.push({
                fill: false,
                data: deaths[i],
                label: selectedcountries[i],
                borderColor: dynamicColors(),
                pointBorderColor: dynamicColors(),
                pointHoverBackgroundColor: dynamicColors(),
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                borderWidth: 2,
                pointBackgroundColor: dynamicColors(),
                pointBorderWidth: 0,
                pointHoverRadius: 3,
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 5,

            });
        }
        chart2.update();
    })
    fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/cases.json').then(function (response) {
        return response.json();
    }).then(function (obj) {
        var confirmed = Array();
        var casestemp = [];
        var labels = [];
        for (var i = 0; i < obj[0].data.length; i++) {
            labels.push(obj[0].data[i].date);
        }
        var selectedcountries = ["US", "India", "Brazil"]
        for (var i = 0; i < selectedcountries.length; i++) {
            for (var j = 0; j < obj.length; j++) {
                if (selectedcountries[i] == obj[j].id) {
                    for (var k = 0; k < obj[j].data.length; k++) {
                        casestemp.push(obj[j].data[k].y);
                    }
                    break;
                }
            }
            confirmed.push(casestemp);
            casestemp = [];
        }
        ////chart confirmed
        $('#chart1').remove(); // this is my <canvas> element
        $('#hConfirmed').remove();
        $('.chart3').append(`<h4 class="mt-0 header-title" id="hConfirmed">Confirmed Cases</h4>
                   <canvas style=" max-height : 420px" id="chart1" height="140"></canvas>`);
        var ctx1 = document.getElementById('chart1').getContext('2d');
        var chart1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: labels,

            },
            options: {
                legend: {
                    display: true,
                }
            }
        });
        for (let i = 0; i < confirmed.length; i++) {
            chart1.data.datasets.push({
                fill: false,
                data: confirmed[i],
                label: selectedcountries[i],
                borderColor: dynamicColors(),
                pointBorderColor: dynamicColors(),
                pointHoverBackgroundColor: dynamicColors(),
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                borderWidth: 2,
                pointBackgroundColor: dynamicColors(),
                pointBorderWidth: 0,
                pointHoverRadius: 3,
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 5,

            });
        }
        chart1.update();
    })


}