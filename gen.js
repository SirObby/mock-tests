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
        }

        result += `<div class='question'> <span class="question_title">${element.question}</span><br>${choices}<b>[ ${element.marks_awarded} ]</b><br><br></div>`;
    }

    document.getElementById("exam-area").innerHTML = result;
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
    
}