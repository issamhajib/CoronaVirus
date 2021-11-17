$(document).ready(function(){
    $('#datatable2').DataTable( {
        ajax: {
            url: 'https://corona-api.com/countries',
            dataSrc: 'data'
        },
        columns: [
            { data: 'code',"render": function(data, type, row) {
                return '<img src="https://www.countryflags.io/'+data+'/flat/32.png">';}
            },
            { data: 'name' },
            { data: 'population' },
            { data: 'latest_data.confirmed' },
            { data: 'today.confirmed',render:function(data,type,row){
                return '<span style="color:#FFA500"><b>+'+data+'</b></span>';} },
            { data: 'latest_data.deaths' },
            { data: 'today.deaths',render:function(data,type,row){
                return '<span style="color:#DC143C"> <b> +'+data+"</b></span>";} },
            { data: 'latest_data.recovered',render:function(data,type,row){
                return '<span style="color:#9ACD32"> <b> '+data+"</b></span>";}},
            { data: 'latest_data.critical' },
            { data: 'latest_data.calculated.cases_per_million_population' },]
    });
                $("#select").click(function(e){
                    e.stopPropagation();
                    });
    fetch("https://api.covid19api.com/summary").then(function(response){
        return response.json();
    }).then(function(obj){
            var arr=obj.Global;
            var confirmed=arr.TotalConfirmed;
            var recovered=arr.TotalRecovered;
            var death=arr.TotalDeaths;
            $('#recovered').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: recovered
                }, {
                    duration: 5000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            $('#death').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: death
                }, {
                    duration: 5000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            $('#confirmed').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: confirmed
                }, {
                    duration: 5000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            $('#plusRecovered').html(" "+obj.Global.NewRecovered+" <span class='text-success small'>(today)</span>");
            $('#plusConfirmed').html(" "+obj.Global.NewConfirmed+" <span class='text-warning small'>(today)</span>");
            $('#plusDeaths').html(" "+obj.Global.NewDeaths+" <span class='text-danger small'>(today)</span>");
        })
        
        
        
    })