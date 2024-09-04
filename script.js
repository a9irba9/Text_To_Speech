
(function (c, l, a, r, i, t, y) {
    c[a] =
        c[a] ||
        function () {
            (c[a].q = c[a].q || []).push(arguments);
        };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script', '94daxaeywm');

async function submit() {
    let text = document.getElementById('text').value;

    if (text === '') {
        alert('You must enter some text...');
        return;
    }

    let speak = await fetch('https://api.streamelements.com/kappa/v2/speech?voice=en-AU-Wavenet-C&text=' + encodeURIComponent(text.trim()));

    if (speak.status != 200) {
        alert(await speak.text());
        return;
    }

    let mp3 = await speak.blob();

    let blobUrl = URL.createObjectURL(mp3);
    document.getElementById('source').setAttribute('src', blobUrl);
    let audio = document.getElementById('audio');
    audio.pause();
    audio.load();
    audio.play();
}

document.getElementById('text').oninput = function () {
    document.getElementById('message').innerHTML = document.getElementById('text').value.length;
};

document.getElementById('text').onkeydown = function (e) {
    if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
        submit();
    }
};

document.getElementById('button').onclick = submit;
