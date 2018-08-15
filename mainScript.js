// Get vantage data 
var seriesOptions = [];

function getTicker() {
  var tickerValue = document.getElementById("tickerTextBox").value
  getVantageData(tickerValue)
  highValue(tickerValue)
  getNews(tickerValue)
}

function highValue(value){
  
  $.getJSON("https://www.alphavantage.co/query?function=BATCH_QUOTES_US&symbols="+value+"&apikey=QZILF3F6R62NT4DK", function (data) {

    document.getElementById("openVal").textContent = "";
    document.getElementById("highVal").textContent = "";
    document.getElementById("lowVal").textContent = "";
    
    dailyopenclose = data["Stock Batch Quotes"][0];

    document.getElementById("openVal").textContent = "Open: "+dailyopenclose["2. open"];;
    document.getElementById("highVal").textContent = "High: "+dailyopenclose["3. high"];
    document.getElementById("lowVal").textContent = "Low: "+dailyopenclose["4. low"];;
  });
}

function getVantageData(value) {
  $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+value+"&apikey=WMBFRSX5QSV82FO7", function (data) {
    var actualData = [];

    timeSeriesdata = data["Time Series (Daily)"];

    for (var a in timeSeriesdata) {
      tempdata = [];
      tempdata.push(Date.parse(a));
      tempdata.push(parseFloat((timeSeriesdata[a])["1. open"]));
      actualData.push(tempdata);
    }

    Highcharts.chart('stockPriceChart', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Time Series graph'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Exchange rate'
        }
      },
      series: [{
        name: value,
        data: actualData
      }]
    });
  });
}

function getNews(value)
{
  $.getJSON("https://globalnews.xignite.com/xGlobalNews.json/GetHistoricalReleasesBySecurity?IdentifierType=Symbol&Identifier="+value+"&StartDate=7/15/2018&EndDate=8/14/2018&_token=38527712EA544C378B995743C919D125", function (data) {
  console.log(data);
  
  var headlinesArr = data["Headlines"];


  // var headline1 = headlinesArr[0]["Title"];
  // var headline2 = headlinesArr[1]["Title"];
  // var headline3 = headlinesArr[2]["Title"];

  // var url1 = headlinesArr[0]["Url"];
  // var url2 = headlinesArr[1]["Url"];
  // var url3 = headlinesArr[2]["Url"];

  // document.getElementById("headlines1").textContent = _.unescape(headline1);
  // document.getElementById("headlines2").textContent = _.unescape(headline2);
  // document.getElementById("headlines3").textContent = _.unescape(headline3);

  // document.getElementById("url1").setAttribute("href", url1);
  // document.getElementById("url2").setAttribute("href", url2);
  // document.getElementById("url3").setAttribute("href", url3);


for (i = 0; i < headlinesArr.length; i++) {

  var title = headlinesArr[i]["Title"];
  var url = headlinesArr[i]["Url"];
  var timeStamp = headlinesArr[i]["Time"] + " " + headlinesArr[i]["Date"];
  var source = headlinesArr[i]["Source"];

  var cardElement = document.createElement("div");
  cardElement.id = "newsCard" + i;
  cardElement.className = "card";

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  var cardTitleLink = document.createElement("a");
  cardTitleLink.text = _.unescape(title);
  cardTitleLink.href = url;
  cardTitle.appendChild(cardTitleLink);

  var cardTitleText = document.createElement("div");
  cardTitleText.className = "card-text";
  cardTitleText.textContent = timeStamp + "         Source: " + source;
  
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardTitleText);

  cardElement.appendChild(cardBody);


  // alert(cardElement);

  document.getElementById("newsscroller").appendChild(cardElement);  
}
  
  document.getElementById("newsscroller").style.display = "block";
  });

}



