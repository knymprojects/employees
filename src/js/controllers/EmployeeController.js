import Handlebars from 'handlebars'
import { Dialog } from '@capacitor/dialog';
import router from'../router.js'

// Handlebars template text in files. Remember we are not in a server so can not use filesystem!
// We select what properties we like to have from the object.
import {employeeHbs} from '../templates/employee.js'
import {employeeFormHbs} from '../templates/employeeForm.js'

export default class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.selectedEmployee = null;
        this.mode = "Update"; // default is to update form, we also can use the same form for create then the value shall/could be Create. ALso need to add eventhandler for this also
      
        // To show the details about the employee
        this.employeeCompiled = Handlebars.compile(employeeHbs); 
        // To modify the employee
        this.employeeFormCompiled = Handlebars.compile(employeeFormHbs); 

    }

    initialize = ()=> {
        // if needed
    }

    setupEventHandlers = ()=> {
        let element = null;

        // Only available if we have rendered the employeeForm
        element = document.getElementById('submitEmployee');
        // Are we doing a update or create
        if(element)
            element.addEventListener('submit', this.onSubmitEmployee);      
    }

    onSubmitEmployee = async (event) => {

        event.preventDefault();
        event.stopImmediatePropagation();

        // The form sending the data
        const form = event.target;
        //FormData is a helper to get key:value pairs 
        // ALL ARE STRINGS SO WE NEED TO CONVERT NUMBER STRINGS to numbers
        const formData = new FormData(form);
        
        // Convert from DTO to object.
        const formPersonObj = Object.fromEntries(formData.entries());
        formPersonObj.id = parseInt(formPersonObj.id);
        
        const result= await this.employeeService.persist(formPersonObj);
        if(result == true) {
            const employee = this.employeeService.findById(parseInt(formPersonObj.id));
            this.selectedEmployee = employee;
            
            if(this.selectedEmployee!=null) {

                // If we are here, we are on the 'bright' side!
                await Dialog.alert({
                    title: 'Save',
                    message: 'employee saved',
                });

                const url= "#employees/"+ this.selectedEmployee.id + "/read";
                // Page based switching on url
                router.load(url);

            } else {
                await Dialog.alert({
                    title: 'Save',
                    message: 'employee NOT saved',
                });
            }
    

        // We return false so the form do not try to send to noexisting server, even if we have the preventors!
        return false;
        
        }
    }

    deleteEmployee = () => {
        deleteElement = document.getElementById('onDelete')
    
        deleteFunction = async () => {
            const onDelete = await Dialog.confirm({
                title: 'Confirm',
                message: "Are you sure you'd like to remove this user permanently?",
            });
    
            if (onDelete) {
                try {
                    const deletionResult = await this.employeeService.deleteEmployee(this.selectedEmployee.id);
                    if (deletionResult) {
                        await Dialog.alert({
                            title: 'Delete',
                            message: 'Employee deleted successfully',
                        });
                        router.load("employees");
                    } else {
                        await Dialog.alert({
                            title: 'Delete',
                            message: 'Failed to delete employee',
                        });
                    }
                } catch (error) {
                    console.error('Error occurred during employee deletion:', error);
                    await Dialog.alert({
                        title: 'Delete',
                        message: 'An error occurred during employee deletion. Please try again later.',
                    });
                }
            }
        };
    
        deleteElement.addEventListener("click", deleteFunction);
    };

    render = () => {
        // We should check if there is a selectedEmployee and return an error if not!
        return this.employeeCompiled(this.selectedEmployee) // Here we give the context to use to the handlebars compiled function
    }
   
    renderForm = () => {
        return this.employeeFormCompiled({ employee: this.selectedEmployee, mode: this.mode});
    }

    renderReadById = (employeeId) => {
        const employee = this.employeeService.findById(parseInt(employeeId));
        this.selectedEmployee = employee;
  
        return this.render();
    }

    renderUpdateById = (employeeId) => {
        const employee = this.employeeService.findById(parseInt(employeeId));
        this.selectedEmployee = employee;
        this.mode = "Update";
        
        return this.renderForm(); // Handlebars will create the callback name submitEmployeeEdit
    }

}
// we declear and export at the same time look up 