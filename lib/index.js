'use strict';

export default class FlyWorker { 
    /**
     * Executes a function in a worker and returns the result
     * @param  {function} funct Function to execute in the worker
     * @param  {...Object} args Parameters for the function
     * @returns {Promise} Promise object represents the result of the worker
     */
    async exec(funct, ...args) {
        // Check type of funct
        if (typeof(funct) !== 'function') {
            throw new TypeError(`${funct} is not a function`);
        }

        // Cast worker function to string and build blob
        const functionString = this.worker.toString();
        const workerString = functionString.substring(functionString.indexOf('{') + 1, functionString.lastIndexOf('}')); 
        const workerLink = window.URL.createObjectURL( new Blob([ workerString ]), {type: 'application/javascript'} );

        // Initialize worker
        const wrkr = new Worker(workerLink);

        // Send function to worker
        wrkr.postMessage({ callback: funct.toString(), args });
        const result = await new Promise((next, error) => {
            wrkr.onmessage = e => (e.data && e.data.error) ? error(e.data.error) : next(e.data);
            wrkr.onerror = e => error(e.message);
        });

        // Kill worker
        wrkr.terminate(); window.URL.revokeObjectURL(workerLink);

        return result;
    }
    worker() {
        onmessage = async function (e) {
            try {                
                const cb = new Function(`return ${e.data.callback}`)();
                const args = e.data.args;
                try {
                    const result = await cb.apply(this, args);
                    return postMessage(result);
                } catch (e) { throw new Error(`CallbackError: ${e}`); }
            } catch (e) { postMessage({error: e.message}); }
        }
    }
}