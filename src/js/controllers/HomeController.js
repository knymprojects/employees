import Handlebars from 'handlebars'

// Handlebars template text in files. Remember we are not in a server so can not use filesystem!
// We select what properties we like to have from the object.
import {homeHbs} from '../templates/home.js'

import EmployeeListController from './EmployeeListController.js';

export default class HomeController {
    constructor(employeeService) {
        this.employeeListController = new EmployeeListController();
        this.employeeService = employeeService;
        this.homeCompiled = Handlebars.compile(homeHbs); 
        // Initialize employees
        const employees =this.employeeService.findByName('')
        this.employeeListController.setEmployees(employees);
    }

    render = () => {
        return this.homeCompiled();
    }

    findByName = (event) => {
        let employees = null;
        // If we call it without an event we use what ever we got 
        if(event) {
            event.preventDefault();
            console.log('findByName event'+event);
            employees =this.employeeService.findByName(event.target.value)
        }
        // The employeeList element is commming from the home page!
        // and we assign the employees object to the compiled handlebars,
        // which generates the html result.
        window.employeeList.innerHTML = this.employeeListController.render(employees);
    }
}