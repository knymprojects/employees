// Import the EmployeeController class
import EmployeeController from './controllers/EmployeeController.js';

// Create a new object to hold the router functionality
const router = (function () {
    "use strict";
    
    // Local variable to hold the routes
    const routes = [];

    // Function to add a new route
    function addRoute(route, handler) {
        routes.push({parts: route.split('/'), handler: handler});
    }

    // Function to load a route
    function load(route) {
        window.location.hash = route;
    }

    // Function to parse the current route
    function parseRoute() {
        const path = window.location.hash.substring(1);
        const parts = path.split('/');
        const partsLength = parts.length;

        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.parts.length === partsLength) {
                const params = [];
                let j;
                for (j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

    // Event listener for hashchange event
    window.addEventListener('hashchange', parseRoute);

    // Export the router functions
    return {
        addRoute: addRoute,
        load: load,
        parseRoute: parseRoute
    };

})();

// Export the router object
export default router;