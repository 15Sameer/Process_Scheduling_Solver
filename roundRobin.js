import { Process } from './process.js';

export function roundRobin(processes, quantum) {
    const n = processes.length;
    let time = 0;
    const processQueue = [];
    const inQueue = new Array(n).fill(false);
    const ganttChart = [];

    // Sort processes by arrival time to handle idle time scenarios
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Initialize remainingTime and originalBurstTime if not set
    processes.forEach(process => {
        process.remainingTime = process.remainingTime || process.burstTime;
        process.originalBurstTime = process.originalBurstTime || process.burstTime;
    });

    // Helper function to enqueue new processes up to the current time
    function enqueueProcessesUpToTime(currentTime) {
        for (let j = 0; j < n; ++j) {
            if (processes[j].arrivalTime <= currentTime && !inQueue[j] && processes[j].remainingTime > 0) {
                processQueue.push(j);
                inQueue[j] = true;
            }
        }
    }

    // Enqueue processes that arrive at time 0
    enqueueProcessesUpToTime(time);

    // Process the queue until all processes are completed
    while (processQueue.length > 0 || processes.some(p => p.remainingTime > 0)) {
        if (processQueue.length === 0) {
            // If the queue is empty, move time to the next available process (idle time)
            const nextArrival = Math.min(...processes.filter(p => p.remainingTime > 0).map(p => p.arrivalTime));
            ganttChart.push('IDLE'); // Mark idle time in the Gantt chart
            time = Math.max(time, nextArrival);

            // Re-check processes that should be enqueued after idle period
            enqueueProcessesUpToTime(time);
        } else {
            // Process the next task in the queue
            const i = processQueue.shift();
            ganttChart.push(processes[i].PID);

            // Process execution logic
            const executionTime = Math.min(processes[i].remainingTime, quantum);
            processes[i].remainingTime -= executionTime;
            time += executionTime;

            // If the process finishes, calculate its finishTime and other metrics
            if (processes[i].remainingTime === 0) {
                processes[i].finishTime = time;
                processes[i].turnaroundTime = processes[i].finishTime - processes[i].arrivalTime;
                processes[i].waitingTime = processes[i].turnaroundTime - processes[i].originalBurstTime;
            }

            // Enqueue any new processes that have arrived up to the current time
            enqueueProcessesUpToTime(time);

            // If the current process still has remaining time, re-add it to the queue
            if (processes[i].remainingTime > 0) {
                processQueue.push(i);
            }
        }
    }

    return ganttChart;
}
