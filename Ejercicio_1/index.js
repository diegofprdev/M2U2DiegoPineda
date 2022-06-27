const nameStudent = document.getElementById('name-student');
const nameStudentRegistered = document.getElementById('name-student-registered');
const btnAddSignature = document.getElementById('add-course');
const listOfCourses = document.getElementById('list-of-courses');
const listOfCoursesRegistered = document.getElementById('list-of-courses-registered');
const totalPrice = document.getElementById('total-price');
const totalPriceRegistered = document.getElementById('total-price-registered');
const btnMakeRegistration = document.getElementById('make-registration');
const btnCloseCardRegistered = document.getElementById('close-card-registered');
const btnNewRegistration = document.getElementById('new-registration');
const cardRegistered = document.getElementById('card-registered');
let idCourse = 0;
let registeredCourses = [];

btnAddSignature.addEventListener('click', function () {

    idCourse += 1;
    const nameCourse = document.getElementById('name-course').value;
    const priceCourse = document.getElementById('price-course').value;

    if (nameCourse === '' || priceCourse === '') {
        toastr.warning('Los campos de matrícula de asignatura no pueden estar vacíos', 'Ups!');
    }
    else if (priceCourse <= 0) {
        toastr.warning('El precio de la asignatura debe ser mayor a $0', 'Ups!');
    }
    else {
        const newCourse = document.createElement('tr');
        newCourse.id = idCourse;
        newCourse.innerHTML = `<td class="has-text-centered">${nameCourse}</td>
                           <td class="has-text-centered">$${priceCourse}</td>
                           <td class="has-text-centered">
                              <button class="button is-danger" onclick="removeCourse(${idCourse})">Remover Asignatura</button>
                           </td>`;

        listOfCourses.appendChild(newCourse);

        registeredCourses.push({
            id: idCourse,
            name: nameCourse,
            price: priceCourse
        });

        calcTotalPrice();

        toastr.success('Asignatura registrada correctamente', 'Éxito!');
    }

});

btnMakeRegistration.addEventListener('click', function () {

    if (nameStudent.value === '') {
        toastr.warning('El campo nombre del estudiante no puede estar vacío', 'Ups!');
    }
    else if (registeredCourses <= 0) {
        toastr.warning('Debe de haber por lo menos una asignatura registrada para realizar el proceso de matrícula', 'Ups!');
    }
    else {

        swal({
            title: "¿Está seguro de realizar la matrícula?",
            icon: "warning",
            buttons: ["Cancelar", "Matricular"],
        })
            .then((isConfirm) => {
                if (isConfirm) {

                    listOfCoursesRegistered.innerHTML = '<tr></tr>';

                    nameStudentRegistered.textContent = nameStudent.value;

                    registeredCourses.forEach(course => {
                        const courseRegistered = document.createElement('tr');
                        courseRegistered.innerHTML = `<td class="has-text-centered">${course.name}</td>
                           <td class="has-text-centered">$${course.price}</td>`;

                        listOfCoursesRegistered.appendChild(courseRegistered);
                    });

                    cardRegistered.style.display = 'block';

                    toastr.success('Matrícula realizada correctamente', 'Éxito!');

                    btnMakeRegistration.style.display = 'none';
                }
            });

    }
});

btnCloseCardRegistered.addEventListener('click', function () {

    listOfCoursesRegistered.innerHTML = '<tr></tr>';
    cardRegistered.style.display = 'none';

});

btnNewRegistration.addEventListener('click', function () {

    const nameCourse = document.getElementById('name-course');
    const priceCourse = document.getElementById('price-course');

    nameStudent.value = '';
    nameCourse.value = '';
    priceCourse.value = '';
    listOfCourses.innerHTML = '<tr></tr>';
    listOfCoursesRegistered.innerHTML = '<tr></tr>';
    idCourse = 0;
    registeredCourses = [];
    cardRegistered.style.display = 'none';
    btnMakeRegistration.style.display = 'inline';

    calcTotalPrice();

});

function removeCourse(id) {

    swal({
        title: "¿Está seguro de remover la asignatura?",
        text: "¡Tenga en cuenta que si remueve la asignatura no podrá revertir está acción!",
        icon: "warning",
        buttons: ["Cancelar", "Remover"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                const courseToRemove = document.getElementById(`${id}`);
                courseToRemove.remove();

                registeredCourses = registeredCourses.filter(course => course.id !== id);

                calcTotalPrice();

                swal("¡Asignatura removida con éxito!", {
                    icon: "success",
                });
            }
        });

}

function calcTotalPrice() {

    const priceStationery = 20000;
    const priceIdentificationCard = 8000;
    let priceAllCourses = 0
    let price = 0;

    registeredCourses.forEach(course => {
        priceAllCourses += Number(course.price);
    });

    price = priceStationery + priceIdentificationCard + (priceAllCourses - ((priceAllCourses * 20) / 100))

    totalPrice.textContent = `$${price}`;
    totalPriceRegistered.textContent = `$${price}`;

}

calcTotalPrice();

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