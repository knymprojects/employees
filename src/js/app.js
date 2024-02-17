// Import the classes and modules
import EmployeeService from './services/memory/EmployeeService.js';
import HomeController from './controllers/HomeController.js';
import EmployeeController from './controllers/EmployeeController.js';
import router from './router.js';

// Define the setupApplication function
const setupApplication = () => {
    console.log('windows loaded - setting up application');
    
    // Create an instance of the EmployeeService
    const service = new EmployeeService();
    console.log("Employee service initialized");

    // Define the showDeleteConfirmationDialog function
    async function showDeleteConfirmationDialog(employee) {
        return new Promise((resolve) => {
            // Example: using the built-in confirm dialog
            const confirmed = confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`);
            resolve(confirmed);
        });
    }

    // Setup routes
    router.addRoute('', () => {
        console.log('empty fragment route');

        // Set the body, the controller takes care of its own list
        const homeController = new HomeController(service);
        document.body.innerHTML = homeController.render();
        console.log("body html assigned");

        // Setup the start list
        homeController.findByName();
        
        // Event registration
        window.searchString.oninput = homeController.findByName;
    });

    router.addRoute('employees/:id/read', (employeeId) => {
        console.log('employee details route');
        const employeeController = new EmployeeController(service);
        window.content.innerHTML = employeeController.renderReadById(employeeId);
        console.log("content html assigned for read");
    });

    router.addRoute("employees/:id/edit", (employeeId) => {
        console.log("employee update route ");
        const employeeController = new EmployeeController(service);
        window.content.innerHTML = employeeController.renderUpdateById(employeeId);
        employeeController.setupEventHandlers();
        console.log("content for html assigned for update");
    });

    router.addRoute('employees/:id/delete', async (employeeId) => {
        console.log('employee delete route');
        const employeeController = new EmployeeController(service);
        
        // Get the employee ID from the route parameters
        const id = parseInt(employeeId);
        
        // Find the employee by ID
        const employee = service.findById(id);
        
        // Show a confirmation dialog
        const confirmed = await showDeleteConfirmationDialog(employee);
        
        if (confirmed) {
            // Delete the employee directly from the service
            const deletionResult = service.deleteEmployee(id);
            if (deletionResult) {
                await Dialog.alert({
                    title: 'Delete',
                    message: 'Employee deleted successfully',
                });
                // Reload the route to update the employee list
                router.load('');
            } else {
                await Dialog.alert({
                    title: 'Delete',
                    message: 'Failed to delete employee',
                });
            }
        } else {
            // If user cancels deletion, you may want to navigate back or do something else
            // router.load("employees");
        }
    });

    // Start the router
    router.parseRoute(); 
}

// Add an event listener for when the window is loaded
window.onload = setupApplication;
