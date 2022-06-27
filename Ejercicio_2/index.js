const form = document.getElementById('form-calculator');
const numMin = document.getElementById('min-number');
const numMax = document.getElementById('max-number');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {

    let min = 0, max = 0;

    e.preventDefault();

    const A = document.getElementsByTagName('input')[0].value;
    const B = document.getElementsByTagName('input')[1].value;
    const C = document.getElementsByTagName('input')[2].value;
    const D = document.getElementsByTagName('input')[3].value;

    if (A === '' || B === '' || C === '' || D === '') {
        toastr.warning('Todos los campos son requeridos', 'Ups!');
    }
    else {

        if (A === B || A === C || A === D || B === C || B === D || C === D) {
            toastr.warning('No se aceptan valores iguales', 'Ups!');
        }
        else {
            min = Math.min(A, B, C, D);
            max = Math.max(A, B, C, D);

            numMin.textContent = min;
            numMax.textContent = max;

            result.style.display = 'block';
        }
    }

});

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}