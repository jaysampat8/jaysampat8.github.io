// Get vantage data 
var seriesOptions = [];

function getTicker() {
  var tickerValue = document.getElementById("tickerTextBox").value
  getVantageData(tickerValue)
  highValue(tickerValue)
  getNews(tickerValue)
  getTweets(tickerValue)
  getStockDetails(tickerValue)
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
  console.log("")
  document.getElementById("info").style.display = "block";
  });

}


function getTweets(value)
{
  $.getJSON("https://api.stocktwits.com/api/2/streams/symbol/"+value+".json?access_token=b005fcf06b997b8ad2b627ee2c697fa545b65ece", function (data){
  console.log(data);

  var tweetMessagesArr = data["messages"]; 

  for (i = 0; i < tweetMessagesArr.length; i++) {

    var tweetMsg = tweetMessagesArr[i]["body"];
    var tweetTimestamp = tweetMessagesArr[i]["created_at"];
    var username = tweetMessagesArr[i]["user"]["username"];
    var avatar = tweetMessagesArr[i]["user"]["avatar_url"];

    console.log(tweetMsg);
    console.log(username);

    var tweetcardElement = document.createElement("div");
    tweetcardElement.id = "tweetCard" + i;
    tweetcardElement.className = "card";

    var tweetcardBody = document.createElement("div");
    tweetcardBody.className = "tweetcard-body";

    var tweetcardUsername = document.createElement("h5");
    tweetcardUsername.className = "card-username";
    tweetcardUsername.text = _.unescape(username);

    var tweetcardMsgText = document.createElement("div");
    tweetcardMsgText.className = "card-text";
    tweetcardMsgText.textContent = _.unescape(tweetMsg);
    
    var tweetcardTimestamp = document.createElement("div");
    tweetcardTimestamp.className = "card-text";
    tweetcardTimestamp.textContent = tweetTimestamp;

    var tweetcardAvatar = document.createElement("img");
    tweetcardAvatar.className = "card-text";
    tweetcardAvatar.src = avatar;

    tweetcardBody.appendChild(tweetcardAvatar);
    tweetcardBody.appendChild(tweetcardUsername);
    tweetcardBody.appendChild(tweetcardMsgText);
    tweetcardBody.appendChild(tweetcardTimestamp);
    tweetcardElement.appendChild(tweetcardBody);

    document.getElementById("tweetscoller").appendChild(tweetcardElement);  

  }

  document.getElementById("tweets").style.display = "block";

});
}

function getStockDetails(value)
{
  $.getJSON("https://api.iextrading.com/1.0/stock/"+value+"/batch?types=quote,news,chart&range=1m&last=10", function (data){
  
  var stockDetails = data["quote"];
  var exchange = stockDetails["primaryExchange"];
  var sector = stockDetails["sector"];
  var marketCap = stockDetails["marketCap"];
  var peRatio = stockDetails["peRatio"];
  var latestVolume = stockDetails["latestVolume"];
  var week52Low = stockDetails["week52Low"];
  var week52High = stockDetails["week52High"];
  var extendedPrice = stockDetails["extendedPrice"];
  var week52Low = stockDetails["week52Low"];

  document.getElementById("sector").textContent = sector;
  document.getElementById("exchange").textContent = exchange;
  document.getElementById("marketCap").textContent = marketCap;





});


  $.getJSON("https://api.iextrading.com/1.0/stock/aapl/company", function (data){


    document.getElementById("desc").textContent = "";


    var companyName = data["companyName"];
    var description = data["description"];
    var CEO = data["CEO"];
    var website = data["website"];


    document.getElementById("desc").textContent = description;
    document.getElementById("CEO").textContent = CEO;

    
  

  });

}
