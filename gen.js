let found_body = {};

let yo = false;

function generate_page(x) {
    let ok = "";
    if (x == "yes") {
        ok = `<textarea id="input" rows="10" cols="50" placeholder="Insert test data information here."></textarea>
<br>`
        yo = true;
    }
    /*
    
    */
    document.getElementById("entire-page").innerHTML = `
    ${ok}
    <button id="start-btn" onclick="start()">Start mock</button>
    <div id="exam-area">

    </div>
    <button id="check_answers" onclick="javascript:submit();" disabled>Check answers.</button>
    <button id="submit_answers" onclick="javascript:send();" disabled>Submit answers.</button> <span data-toggle='tooltip' title='This will email the teacher with your answers.'>?</span>

    <div id="mark_count">

    </div>`

    document.getElementById("check_answers").disabled = true;
    document.getElementById("submit_answers").disabled = true;

    //document.getElementById("input").value = found_body.body;
}

function get_mock() {
    // GET get.php/?id=${document.getElementById("id").value}
    // And set found_body to the returned JSON object
    // If nothing is returned set found_body to null
    // If something is returned, set found_body to the returned JSON object
    console.log(`get.php?id=${document.getElementById("id").value}`);
    fetch(`get.php?id=${document.getElementById("id").value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            found_body = data;

            setTimeout(() => {
                generate_page("no");
            }, 100);
            //
        })
        .catch(error => {
            console.error(error);
            console.log(response)
        });

}

let answered = {

}
let correct_answers = {

}

let timer = 0;
let timer_enabled = false;

let marks_awarded = 0;
let marks_achieved = 0;

let q = 0; // How many questions?

function start() {
    let code = "";
    if (yo == false) code = /*document.getElementById("input").value*/ found_body.body.toString();
    else {
        code = atob(document.getElementById("input").value);
        document.getElementById("input").remove();
    }
    console.log(code);

    // Parse code into a JSON object
    let parsed = JSON.parse(code);

    //document.getElementById("input").remove();
    document.getElementById("start-btn").remove();

    let result = "";

    for (let index = 0; index < parsed["questions"].length; index++) {
        const element = parsed["questions"][index];

        console.log(element.question)

        let choices = "";

        for (let indexy = 0; indexy < element["c"]; indexy++) {
            const elementt = element["choices"][indexy];

            console.log(element.text);
            choices += `<button class="choice_btn" onclick="select_choice(${index}, ${indexy})"><b>${indexy + 1}.</b> <input type="checkbox" id="c-${index}-${indexy}" tabindex="-1"> ${elementt.text}</button><br>`

            if (elementt.correct == true) {
                correct_answers[index] = indexy;
            }
        }

        marks_awarded += element.marks_awarded;

        result += `<div class='question'> <span class="question_title">${element.question}</span><br>${choices}<b>[ ${element.marks_awarded} ]</b>  <span id="${index}-corr"></span> <br><br></div>`;
        q++;
    }

    document.getElementById("exam-area").innerHTML = result;

    document.getElementById("check_answers").disabled = false;
    //document.getElementById("check_answers").onclick = "javascript:submit();"
    if (parsed.submit) {
        document.getElementById("submit_answers").disabled = false;
        //document.getElementById("submit_answers").onclick = "javascript:send();"
    }
}
/**
 * 
 * @param {*} q question
 * @param {*} c choice
 */
function select_choice(q, c) {
    let checkbox = document.getElementById(`c-${q}-${c}`);

    for (let index = 0; index < 3; index++) {
        const element = document.getElementById(`c-${q}-${index}`);

        if (element.checked == true) {
            element.checked = false;
        }
    }
    checkbox.checked = true;

    answered[q] = c;
}

function submit() {
    for (let index = 0; index < q; index++) {
        if (answered[index] == correct_answers[index]) {
            marks_achieved++;
            document.getElementById(`${index}-corr`).innerHTML = "Correct";
        } else {
            document.getElementById(`${index}-corr`).innerHTML = `Incorrect, the answer is ${correct_answers[index] + 1}`;
        }
    }

    document.getElementById("mark_count").innerHTML = `You achived ${marks_achieved} out of ${marks_awarded} marks.`;
}

function send() {
    let body = ``;
}