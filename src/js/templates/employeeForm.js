const employeeFormHbs = `
<header class="navbar navbar-light bg-light navbar-expand">
    <a class="nav-link" href="#employees/{{ employee.id }}/read">
        <h1 class="btn btn-primary bi-chevron-left">Back&nbsp;&nbsp;</h1>
    </a>
    <h2 class="navbar-text">{{mode}} Employee</h2>
</header>

<form id="submitEmployee" >
    <input type="hidden" class="form-control" id="id" name="id" value={{ employee.id }}>
    <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName" name="firstName" value = "{{employee.firstName}}" placeholder="Enter first name">
    </div>
    <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName" name="lastName" value = "{{employee.lastName}}" placeholder="Enter last name"/>
    </div>
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" name="title" value = "{{employee.title}}" placeholder="Enter title"/>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary" value="Save">Save</button>
    </div>
</form>
`
export {employeeFormHbs};