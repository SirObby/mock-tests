let answered = {

}
let correct_answers = {

}

let timer = 0;
let timer_enabled = false; 

let marks_awarded = 0;
let marks_achieved = 0;

let q = 0; // How many questions?

document.getElementById("check_answers").disabled = true;
document.getElementById("submit_answers").disabled = true;

function start() {
    let code = atob(document.getElementById("input").value);

    console.log(code);

    // Parse code into a JSON object
    let parsed = JSON.parse(code);

    document.getElementById("input").remove();
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
        
            if(elementt.correct == true) {
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
    if(parsed.submit) {
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

        if(element.checked == true) {
            element.checked = false;
        } 
    }
    checkbox.checked = true;
    
    answered[q] = c;
}

function submit() {
    for (let index = 0; index < q; index++) {
        if(answered[index] == correct_answers[index]) {
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