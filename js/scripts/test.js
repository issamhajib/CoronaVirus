$(document).ready(function(){
    var date = new Date();
    var currentdate= date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    var firestore=firebase.firestore();

    fetch('https://corona-api.com/countries').then(function(response){
            return response.json();
    }).then(function(obj){
        var confirmed=Array();
        var deaths=Array();
        var recovered=Array();
        var countries=Array();
        for(var i=0;i<obj.data.length;i++){
            countries.push(obj.data[i].name);
            confirmed.push(obj.data[i].latest_data.confirmed);
            recovered.push(obj.data[i].latest_data.recovered);
            deaths.push(obj.data[i].latest_data.deaths);
        }
        for(var j=0 ;j<deaths.length;j++){
            var docRef=firestore.doc(currentdate+"/"+countries[j]);
            docRef.set({
                confirmed: confirmed[j],
                recovered:recovered[j],
                deaths:deaths[j]
            });
        }
    });
})