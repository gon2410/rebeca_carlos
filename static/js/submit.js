/* constantes del menu */
const menu1 = document.querySelector("#menu1"); // Sin Condicion
const menu2 = document.querySelector("#menu2"); // Vegetariano
const menu3 = document.querySelector("#menu3"); // Vegano
const menu4 = document.querySelector("#menu4"); // Celiaco

/* boton de confirmacion */
const submitBtn = document.querySelector("#submit-btn");

/* constantes de los contenedores de mensajes de exito y error */
const submit_message_success = document.querySelector("#submit_message_success")
const submit_message_error = document.querySelector("#submit_message_error")

/* ocultar contenedores de mensaje por defecto */
submit_message_success.style.display = "none";
submit_message_error.style.display = "none";

document.getElementById("inviform").addEventListener("submit", function(e){
    e.preventDefault();

    first_name = usernameField.value;
    last_name = lastnameField.value;

    if (menu1.checked) {
        menu = menu1.value;
    } else if (menu2.checked) {
        menu = menu2.value;
    } else if (menu3.checked) {
        menu = menu3.value;
    } else if (menu4.checked) {
        menu = menu4.value;
    } else {
        menu = 'none'
    }

    const formData = new FormData();
    
    formData.append('first_name', first_name);
    formData.append('last_name', last_name)
    formData.append('menu', menu);
    formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
    /* console.log(formData); */

    
    fetch("", {
        method: 'POST',
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.username_error) {
            submit_message_error.style.display = "block"
            submit_message_error.innerHTML = `<p>${data.username_error}</p>`
            usernameField.value = "";
            lastnameField.value = "";

            menu1.checked = false;
            menu2.checked = false;
            menu3.checked = false;
            menu4.checked = false;

            setTimeout(function(){
                submit_message_error.style.display = "none"
            }, 3000)
        } else {
            submit_message_success.style.display = "block"
            submit_message_success.innerHTML = `<p>${data.username_success}&#128512</p>`
            usernameField.value = "";
            lastnameField.value = "";

            menu1.checked = false;
            menu2.checked = false;
            menu3.checked = false;
            menu4.checked = false;

            setTimeout(function(){
                submit_message_success.style.display = "none";
            }, 20000)
        }

    })
    .catch(error => {
        console.error('Error:', error);
    })
});