import Handlebars from 'handlebars'

// Handlebars template text in files. Remember we are not in a server so can not use filesystem!
// We select what properties we like to have from the object.
import {employeeListHbs} from '../templates/employeeList.js'

export default class EmployeeListController {
    constructor() {
        this.employees=[];
        this.employeeListCompiled = Handlebars.compile(employeeListHbs);    
    }

    setEmployees = (employees) => {
        this.employees = employees;
    }

    render = (employees=null) => {
        // employees parameter overrides the this.employees
        if(employees) {
            this.employees = employees;
        }

        if(employees || this.employees) {
            return this.employeeListCompiled(this.employees);
        } else {
            return '<div> Employee list empty </div>'
        }
    }
}