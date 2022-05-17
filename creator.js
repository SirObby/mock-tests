var q_index = 0;

let generated_code = {
    "subject": "generated test",
    "description": "generated exam.",
    "submit": false, 
    "submit_info": {
        "email": "",
        "rules": [
            // strings with what emails that are ending in can submit.
        ]
    },
    "questions": []
}

function create_mcq() {

    for (let index = 0; index < q_index; index++) {

        console.log(q_index)

        document.getElementById(`${index}-title`).value = generated_code.questions[index].question ;
        document.getElementById(`c-0-${index}`).value = generated_code.questions[index].choices[0].text ;
        document.getElementById(`cc-0-${index}`).checked = generated_code.questions[index].choices[0].correct ;
        document.getElementById(`c-1-${index}`).value = generated_code.questions[index].choices[1].text;
        document.getElementById(`cc-1-${index}`).checked = generated_code.questions[index].choices[1].correct; 
        document.getElementById(`c-2-${index}`).value = generated_code.questions[index].choices[2].text;
        document.getElementById(`cc-2-${index}`).checked = generated_code.questions[index].choices[2].correct;

    }

    console.log(`creationarea-${q_index}`) // ${document.getElementById("creationarea").innerHTML}
    document.getElementById(`creationarea-${q_index}`).innerHTML = `<div id="${q_index}"><b>${q_index}.</b> <input type="text" name="${q_index}-title" id="${q_index}-title"><br><input type="checkbox" name="cc-0-${q_index}" id="cc-0-${q_index}"> <input type="text" name="c-0-${q_index}" id="c-0-${q_index}"><br><input type="checkbox" name="cc-1-${q_index}" id="cc-1-${q_index}"> <input type="text" name="c-1-${q_index}" id="c-1-${q_index}"><br><input type="checkbox" name="cc-2-${q_index}" id="cc-2-${q_index}"> <input type="text" name="c-2-${q_index}" id="c-2-${q_index}"><br></div><br> <div id="creationarea-${q_index + 1}">
    </div>`
    generated_code.questions.push({
        "type": "multiple_choice",
        "question": "",
        "c": 3,
        "choices": [{
                "type": "answer",
                "text": "",
                "correct": false
            },
            {
                "type": "answer",
                "text": "",
                "correct": false
            },
            {
                "type": "answer",
                "text": "",
                "correct": false
            }
        ],
        "marks_awarded": 1
    });

    q_index++;
}

function generate() {
    console.log("gen");

    for (let index = 0; index < q_index; index++) {

        console.log(q_index)

        generated_code.questions[index].question = document.getElementById(`${index}-title`).value;
        generated_code.questions[index].choices[0].text = document.getElementById(`c-0-${index}`).value;
        generated_code.questions[index].choices[0].correct = document.getElementById(`cc-0-${index}`).checked;
        generated_code.questions[index].choices[1].text = document.getElementById(`c-1-${index}`).value;
        generated_code.questions[index].choices[1].correct = document.getElementById(`cc-1-${index}`).checked;
        generated_code.questions[index].choices[2].text = document.getElementById(`c-2-${index}`).value;
        generated_code.questions[index].choices[2].correct = document.getElementById(`cc-2-${index}`).checked;

    }

    generated_code.subject = document.getElementById("sub").value
    generated_code.description = document.getElementById("desc").value
    generated_code.submit = document.getElementById("submit").checked
    generated_code.submit_info.email = document.getElementById("allow_email").value
    generated_code.submit_info.rules = document.getElementById("email").value.split(",")
    
    document.getElementById("out").value = btoa(JSON.stringify(generated_code));
}

// Trigger generate on event listener on click and keypress
document.getElementById("b").addEventListener("click", generate);
document.getElementById("b").addEventListener("keypress", generate);