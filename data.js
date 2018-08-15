function getVantageData() {
  $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=OB0W7D8LWDCJGBMR", function (data) {
    console.log(data["Time Series (Daily)"]);
    timeSeriesdata = data["Time Series (Daily)"];
    data = [];
    for (var a in timeSeriesdata) {
      tempdata = [];
      tempdata.push(Date.parse(a));
      tempdata.push(parseFloat((timeSeriesdata[a])["1. open"]));
      data.push(tempdata);
    }
    return data;
  });
}