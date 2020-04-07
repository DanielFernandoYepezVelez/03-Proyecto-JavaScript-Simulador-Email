/* Accediendo Al DOM */
const email = document.querySelector('#email');
const asunto = document.getElementById('asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.getElementById('enviar-mail')
const btnEnviar = document.getElementById('enviar');
const btnReset = document.querySelector('#resetBtn');

/* Eventos Del Usuario Y El Sistema */
eventosUsuario();

function eventosUsuario() {
    document.addEventListener('DOMContentLoaded', desabilitarBotonEnviar);
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    formulario.addEventListener('submit', enviarEmail)
    btnReset.addEventListener('click', resetFormulario);
}

/* Funcionalidad Para Deshabilitar el boton de enviar, despues de que cargue todo el DOM */
function desabilitarBotonEnviar() {

    /* Inhabilitar El elemento del DOM, además de Inhabilitar su funcionalidad por defecto y futura */
    btnEnviar.disabled = true;
}

/* Funcionalidad para validar que el campo tenga contenido Interno */
function validarCampo() {
    const arroba = email.value.indexOf('@');

    if (email.value !== '' && arroba !== (-1) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
    } else {
        desabilitarBotonEnviar();
    }

    /* This, hace referencia al campo que estoy validando */
    validarLongitud(this);

    /* Validar Solo el Email sin tener encuenta los otros dos campos */
    if (this.type === 'email') {
        validarEmail(this);
    }
}

/* Funcionalidad para validar la Longitud del texto */
function validarLongitud(campo) {

    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');

    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

/* Funcionalidad Para Validar Solo El Email Y Que Tenga El Arroba */
function validarEmail(campo) {
    const email = campo.value;
    const arroba = email.indexOf('@');

    if (arroba !== (-1)) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');

    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

/* Funcionalidad para enviar los datos del email */
function enviarEmail(e) {
    e.preventDefault();

    const div = document.getElementById('loaders');
    const spinnerGif = document.getElementById('spinner');
    const img = document.createElement('img');

    spinnerGif.style.display = 'block';
    img.src = './img/mail.gif';
    // email.value = '';
    // asunto.value = '';
    // mensaje.value = '';
    formulario.reset()

    setTimeout(function() {
        spinnerGif.style.display = 'none';
        div.appendChild(img);

        setTimeout(function() {
            img.remove();
        }, 4000);

    }, 4000);
}

/* Funcionalidad Para Resetear El Formulario, Si Es Necesario */
function resetFormulario(e) {
    e.preventDefault();
    formulario.reset();
}