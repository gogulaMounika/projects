let expressionAndValue = {};
let history = [];

history = JSON.parse(localStorage.getItem("calHistory") || "[]");


expressionAndValue = { expressioin: '2+3', result: '5' }


function Solve(val) {
    var v = document.getElementById('res');
    v.value += val;
}

function Result() {
    var num1 = document.getElementById('res').value;
    var num2 = eval(num1);
    history.push({ expressioin: num1, result: num2 });

    localStorage.setItem('calHistory', JSON.stringify(history));

    $('.history').append(`<h4>${num1}</h4>
                            <h5>${num2}</h5>
                        <hr>`);
    document.getElementById('res').value = num2;
}

function Clear() {
    var inp = document.getElementById('res');
    inp.value = '';
}

function Back() {
    var ev = document.getElementById('res');
    ev.value = ev.value.slice(0, -1);
}

$('#res').on("keypress", function (e) {
    if (e.keyCode == 13) {
        Result();
    }
});

if (history.length > 0) {
    history.map(({ expressioin, result }) => {
        // let {expressioin, result} = element;
        $('.history').append(`<h4>${expressioin}</h4>
                            <h5>${result}</h5>
                        <hr>`);
    })
}

function clearHistory() {
    $('.history').empty();
    $('.history').append(`<button onclick="clearHistory()">Clear</button>`);

    // Clear the local storage
    localStorage.clear();

}