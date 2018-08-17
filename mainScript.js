// Get vantage data 
var seriesOptions = [];

function getTicker(tickerValue) {
    getVantageData(tickerValue)
    getNews(tickerValue)
    getTweets(tickerValue)
    getStockDetails(tickerValue)
    document.getElementById("container").style.display = "block"
}

function getVantageData(value) {
    $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + value + "&apikey=WMBFRSX5QSV82FO7", function (data) {
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
                text: value.toUpperCase() + " Stock Price"
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
                name: value.toUpperCase(),
                data: actualData
            }]
        });
    });
}

function getNews(value) {
    $.getJSON("https://globalnews.xignite.com/xGlobalNews.json/GetHistoricalReleasesBySecurity?IdentifierType=Symbol&Identifier=" + value + "&StartDate=7/15/2018&EndDate=8/14/2018&_token=65BA2ECBF34C41BAAA7410D45C87F6FE", function (data) {
        console.log(data);

        var headlinesArr = data["Headlines"];

        for (i = 0; i < headlinesArr.length; i++) {

            var title = headlinesArr[i]["Title"];
            var url = headlinesArr[i]["Url"];
            var timeStamp = headlinesArr[i]["Date"] + " " + headlinesArr[i]["Time"];
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
            cardTitleText.textContent = timeStamp + " | " + source;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardTitleText);

            cardElement.appendChild(cardBody);

            document.getElementById("newsscroller").appendChild(cardElement);
        }
        console.log("")
        document.getElementById("info").style.display = "block";
    });

}


function getTweets(value) {
    $.getJSON("https://api.stocktwits.com/api/2/streams/symbol/" + value + ".json?access_token=b005fcf06b997b8ad2b627ee2c697fa545b65ece", function (data) {
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
            tweetcardBody.className = "card-body row";

            var tweetcardBodyAvatar = document.createElement("div");
            tweetcardBodyAvatar.className = "col-md-2";
            
            var tweetcardAvatar = document.createElement("img");
            tweetcardAvatar.src = avatar;

            var tweetcardBodyText = document.createElement("div");
            tweetcardBodyText.className = "col-md-10";

            var tweetCardTextHeader = document.createElement("div");
            tweetCardTextHeader.className = "row";

            var tweetcardUsername = document.createElement("div");
            tweetcardUsername.className = "card-text username col-md-8";
            tweetcardUsername.textContent = _.unescape(username);

            var tweetcardTimestamp = document.createElement("div");
            tweetcardTimestamp.className = "card-text timestamp";
            tweetcardTimestamp.textContent = tweetTimestamp;

            var tweetcardMsgText = document.createElement("div");
            tweetcardMsgText.className = "tweet";
            tweetcardMsgText.textContent = _.unescape(tweetMsg);   

            tweetcardBodyAvatar.appendChild(tweetcardAvatar);
        
            tweetCardTextHeader.appendChild(tweetcardUsername);
            tweetCardTextHeader.appendChild(tweetcardTimestamp);

            tweetcardBodyText.appendChild(tweetCardTextHeader);
            tweetcardBodyText.appendChild(tweetcardMsgText);

            tweetcardBody.appendChild(tweetcardBodyAvatar);
            tweetcardBody.appendChild(tweetcardBodyText);

            tweetcardElement.appendChild(tweetcardBody);

            document.getElementById("tweetscroller").appendChild(tweetcardElement);

        }
    });
}

function getStockDetails(value) {
    $.getJSON("https://api.iextrading.com/1.0/stock/" + value + "/batch?types=quote,news,chart&range=1m&last=10", function (data) {

        var stockDetails = data["quote"];
        var exchange = stockDetails["primaryExchange"];
        var sector = stockDetails["sector"];
        var marketCap = stockDetails["marketCap"];
        var peRatio = stockDetails["peRatio"];
        var latestVolume = stockDetails["latestVolume"];
        var week52Low = stockDetails["week52Low"];
        var week52High = stockDetails["week52High"];
        var extendedPrice = stockDetails["extendedPrice"];
        var open = stockDetails["open"];
        var high = stockDetails["high"];
        var low = stockDetails["low"];

        document.getElementById("sector").textContent = sector;
        document.getElementById("exchange").textContent = exchange;
        document.getElementById("marketCap").textContent = marketCap;
        document.getElementById("peRation").textContent = peRatio;
        document.getElementById("latestVolume").textContent = latestVolume;
        document.getElementById("week52Low").textContent = week52Low;
        document.getElementById("week52High").textContent = week52High;
        document.getElementById("extendedPrice").textContent = extendedPrice;
        document.getElementById("openVal").textContent = open;
        document.getElementById("highVal").textContent = high;
        document.getElementById("lowVal").textContent = low;

    });


    $.getJSON("https://api.iextrading.com/1.0/stock/"+value+"/company", function (data){

    var companyName = data["companyName"];
    var description = data["description"];
    var CEO = data["CEO"];
    var website = data["website"];

    document.getElementById("desc").textContent = description;
    document.getElementById("ceo").textContent = CEO;

    var a = document.getElementById("website");
    a.textContent = website;
    a.setAttribute('href', website);
    // document.getElementById("companyName").textContent = companyName; 

  });

}