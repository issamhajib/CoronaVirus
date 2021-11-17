$(document).ready(function () {
    Chart.defaults.global.legend.labels.usePointStyle = true;
    fetch('https://api.covid19api.com/summary').then(function (response) {
        return response.json();
    })
        .then(function (obj) {
            for (var i = 0; i < obj.Countries.length; i++) {
                if (obj.Countries[i].Country == "Morocco") {
                    $('#plusRecovered').html(" " + obj.Countries[i].NewRecovered + " <span class='text-success small'>(اليوم)</span>");
                    $('#plusConfirmed').html(" " + obj.Countries[i].NewConfirmed + " <span class='text-warning small'>(اليوم)</span>");
                    $('#plusDeaths').html(" " + obj.Countries[i].NewDeaths + " <span class='text-danger small'>(اليوم)</span>");
                    $('#update').html(obj.Countries[i].Date.replace('T', ' ').replace('Z', "") + " :آخر تعديل ");
                    break;
                }
            }
            fetch('https://nepalcorona.info/api/v1/data/world').then(function (response) {
                return response.json();
            }).then(function (data) {
                for(var i=0;i<data.length;i++){
                    if(data[i].country=="Morocco"){
                    var confirmed = data[i].totalCases;
                    var deaths = data[i].totalDeaths;
                    var recovered = data[i].totalRecovered;
                    var excluded= data[i].activeCases;
                    }
                }
                $('#confirmed').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: confirmed
                    }, {
                        duration: 5000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
                $('#death').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: deaths
                    }, {
                        duration: 5000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
                $('#excluded').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: excluded
                    }, {
                        duration: 5000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
                $('#recovered').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: recovered
                    }, {
                        duration: 5000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            });
        })

    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (day < 10) {
        day = "0" + getDate();
    }
    if (month < 10) {
        month = "0" + (date.getMonth() + 1);
    }
    var currentDate = date.getFullYear() + "-" + month + '-' + day;
    fetch('https://covidapi.info/api/v1/country/MAR/timeseries/2020-02-01/' + currentDate).then(function (response) {
        return response.json();
    }).then(function (obj) {
        var confirmed = Array();
        var deaths = Array();
        var recovered = Array();
        var labels = Array();
        for (var i = 0; i < obj.result.length; i++) {
            var att = obj.result[i];
            confirmed.push(att.confirmed);
            recovered.push(att.recovered);
            deaths.push(att.deaths);
            labels.push(att.date);
        }
        var label = ["Confirmed | المؤكدة", "Deaths | الوفيات", "Recovered | المتعافون"]
        var col = ["#0074D9", "#DC143C", "#9ACD32"]
        var donnee = [confirmed, deaths, recovered];
        var ctxmor = document.getElementById('mor').getContext('2d');
        var chartmor = new Chart(ctxmor, {
            type: 'bar',
            data: {
                labels: labels,

            },
            options: {
                legend: {
                    display: true,
                }
            }
        });
        for (let i = 0; i < donnee.length; i++) {
            chartmor.data.datasets.push({
                fill: true,
                data: donnee[i],
                label: label[i],
                backgroundColor: col[i],
                pointBorderColor: col[i],
                pointHoverBackgroundColor: col[i],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                borderWidth: 2,
                pointBackgroundColor: col[i],
                pointBorderWidth: 0,
                pointHoverRadius: 3,
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 5,

            });
        }
        chartmor.update();



    });
    fetch("https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Covid_19/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json").then(function (response) {
        return response.json();
    }).then(function (obj) {
        var donnee = Array();
        var labels = Array();
        obj.features.forEach((e) => {
            donnee.push(e.attributes.Cases);
            labels.push(e.attributes.Nom_Région_AR + " " + e.attributes.Nom_Région_FR);
        })
        var ctxpie = document.getElementById('pie').getContext('2d');
        var chart4 = new Chart(ctxpie, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: donnee,
                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]

                }]
            },
            options: {}
        });

    });
    $('#datatable2').DataTable({
        ajax: {
            url: 'https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Covid_19/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=',
            dataSrc: 'features'
        },
        columns: [
            { data: 'attributes.Nom_Région_FR' },
            { data: 'attributes.Nom_Région_AR' },
            { data: 'attributes.Cases' },
            { data: 'attributes.Deaths' },
            { data: 'attributes.Recoveries' },]
    });
    $('#datatable').DataTable({
        ajax: {
            url: 'https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Hopitaux/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
            dataSrc: 'features'
        },
        columns: [
            { data: 'attributes.Région' },
            { data: 'attributes.province' },
            { data: 'attributes.Nom' },
        ]
    });
})