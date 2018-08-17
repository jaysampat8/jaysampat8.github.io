var seriesOptions = []

getMarketHeadlines();
getTrendingTweets();

function getMarketHeadlines() {
    $.getJSON("https://globalnews.xignite.com/xGlobalNews.json/GetTopMarketHeadlines?Count=10&_token=65BA2ECBF34C41BAAA7410D45C87F6FE", function (data) {

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

function getTrendingTweets(value) {
    $.getJSON("https://api.stocktwits.com/api/2/streams/trending.json?access_token=b005fcf06b997b8ad2b627ee2c697fa545b65ece", function (data) {
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