// back tick ` = literal string
const employeeHbs = `
<header class="navbar navbar-light bg-light navbar-expand">
    <a class="nav-link" href="#">
        <h1 class="btn btn-primary bi-chevron-left">Back</h1>
    </a>
    <h2 class="navbar-text">&nbsp; &nbsp; Employee details</h1>
</header>
<div class="content">
    <div class="card">
        <img class="card-img-top" style="width: 5rem;" src="/pics/{{pic}}">
        <div class="card-body">
            <h5 class="card-title">
                {{ firstName }} {{ lastName }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
                {{ title }}
            </h6>
        </div>
        <ul class="list-group list-group-flush d-flex ">
            <a href="tel:{{ officePhone }}"  class="list-group-item list-group-item-action align-items-start" >
                <div class="ml-5">
                    <h5 class="text-left">Call Office: {{ officePhone }}<span class="bi-chevron-right"></span> </h5>
                </div>
            </a>
            <a href="tel:{{ cellPhone }}"  class="list-group-item list-group-item-action align-items-start">
                <div class="ml-5">
                    <h5 class="text-left">Call Cell: {{ cellPhone }} <span class="bi-chevron-right"></span></h5>
                </div>
            </a>
            <a href="sms:{{ cellPhone }}" class="list-group-item list-group-item-action align-items-start">
                <div class="ml-5">
                    <h5 class="text-left">SMS: {{ cellPhone }} <span class="bi-chevron-right"></span> </h5>
                </div>
            </a>
<a href="mailto:{{ email }}" class="list-group-item list-group-item-action align-items-start">
                <div class="ml-5">
                    <h5 class="text-left">Email: {{ email }} <span class="bi-chevron-right"></span> </h5>
                </div>
            </a>
            <a href='#employees/{{ id }}/edit' class="btn btn-primary" role="button">Edit</a>
            <a href='#employees/{{ id }}/delete' class="btn btn-primary" id="onDelete" role="button">Remove</a>
        </ul>
    </div>
</div>
`
export {employeeHbs}