
// "audiobuffer-to-wav": "^1.0.0",

const audioBufferToWav = require("audiobuffer-to-wav");

function extractAudioFromVideo(videoUrl) {
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var reader = new FileReader();
    var myBuffer;
    const sampleRate = 16000; // 采样率，越高越清晰
    const numberOfChannels = 1;

    return new Promise((resolve, reject) => {
        fetch(videoUrl, {
                responseType: "blob",
            })
            .then((res) => res.blob())
            .then((blob) => {
                reader.readAsArrayBuffer(blob);
            });

        reader.onload = function () {
            var videoFileAsBuffer = reader.result;
            audioContext.decodeAudioData(videoFileAsBuffer).then(function (decodedAudioData) {
                var duration = decodedAudioData.duration;
                var offlineAudioContext = new OfflineAudioContext(
                    numberOfChannels,
                    sampleRate * duration,
                    sampleRate
                );
                var soundSource = offlineAudioContext.createBufferSource();

                myBuffer = decodedAudioData;
                soundSource.buffer = myBuffer;
                soundSource.connect(offlineAudioContext.destination);
                soundSource.start();

                offlineAudioContext.startRendering().then(function (renderedBuffer) {

                    console.log("renderedBuffer ==>", renderedBuffer);

                        var wav = audioBufferToWav(renderedBuffer);
                        var blob = new window.Blob([new DataView(wav)], {
                            type: "audio/wav",
                        });

                        console.log("成功 ！！！！！！")

                        resolve(window.URL.createObjectURL(blob));
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        };
    });
};

console.log("777")

extractAudioFromVideo(require("./Worth.mp4")).then((result) => {

    console.log("result", result)

      var anchor = document.createElement('a')
      document.body.appendChild(anchor)
      anchor.style = 'display: none'

       anchor.href = result
       anchor.download = 'audio.wav'
       anchor.click()
       window.URL.revokeObjectURL(url)
       
     

}).catch((error) => {

     console.log("error", error)

});;