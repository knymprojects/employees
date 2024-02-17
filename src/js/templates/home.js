const homeHbs = `
<nav class="navbar navbar-expand-sm bg-primary navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Employees</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </div>       
    </div>
</nav>
<p></p>
<div id='content' class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="searchString" class="form-label">Search:</label>
          <input id="searchString" class='search-key' type="text" placeholder="Enter search string" name="searchString">
        </div>
      </div>
    </div>
    <div class="row">
        <div class="col">
            <article id="employeeList"></article>
        </div>
    </div>
</div>

`
export {homeHbs}; // returning a object in case we want many templates in the same file
