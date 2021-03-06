window.onload = Main;

const base_url = "https://api.thingspeak.com/channels/1225941/feeds.json";
const api_key = "5ARCYMTPGJL345PP"

let app;

function Main() {
    app = new Vue({
        el: "#app",
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],   // x軸のラベル
            datasets: [  // グラフごとにオブジェクトを定義する
                {
                    label: "brightness",
                    data: [],
                    borderWidth: 2,    // 線の太さ
                    borderColor: "rgba(0, 100, 0, 0.5)",    // 線の色
                    fill: false   // 線の下の領域塗り潰しなし
                }
            ]
        },
        mounted: function() {
            updateData();
            setInterval(updateData, 15000)
        }
    });
}

function updateData() {
    const result_num = 10
    let url = base_url +
            "?api_key=" +
            api_key +
            "&timezone=Asia/Tokyo" +
            "&results=" +
            result_num;
    fetch(url, { method: 'GET' })
    .then(function(response) {
        return response.json();
    })
    .then(function(res) {
        // console.log(res.feeds);
        let brightness = []
        res.feeds.forEach(elm => {
            brightness.push(elm.field1);
        });
        app.datasets[0].data = brightness;

        console.log(app.datasets[0].data);

        updateGraph();
    });
}

function updateGraph() {
    let ctx = document.getElementById("myChart")
    let myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: app.labels,    // x軸のラベル
            datasets: app.datasets
        },
        options: {
            responsive: true
        }
    });
}