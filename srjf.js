import { Process } from './process.js';

export function SRJF(processes) {
    let currentTime = 0; 
    let completed = 0; 
    const n = processes.length; 
    const isCompleted = new Array(n).fill(false); 
    const ganttChart = []; 

    
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // While there are incomplete processes
    while (completed < n) {
        let index = -1;
        let minRemainingTime = Infinity;

        // Find the process with the shortest remaining burst time that has arrived and not completed
        for (let i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime && !isCompleted[i] && processes[i].remainingTime < minRemainingTime) {
                minRemainingTime = processes[i].remainingTime;
                index = i;
            }
        }

        if (index !== -1) {
           
            const process = processes[index];
            process.startTime = currentTime;

            // Process executes for one unit of time (remaining time for this process)
            process.remainingTime -= 1;
            currentTime++;

            // If the process has finished executing
            if (process.remainingTime === 0) {
                process.finishTime = currentTime;
                process.turnaroundTime = process.finishTime - process.arrivalTime;
                process.waitingTime = process.turnaroundTime - process.originalBurstTime;
                isCompleted[index] = true; 
                completed++; 
            }

            ganttChart.push(process.PID);
        } else {
            // If no process is available to run, just increment the time
            currentTime++;
        }
    }

    return ganttChart;
}
