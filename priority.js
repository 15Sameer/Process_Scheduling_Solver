import { Process } from './process.js';

export function PriorityScheduling(processes) {
    let currentTime = 0; // Tracks the current time during scheduling
    let completed = 0;
    const n = processes.length;
    const isCompleted = new Array(n).fill(false);
    const ganttChart = [];

    // Sort by arrival time first, and then by priority if arrival times are the same
    processes.sort((a, b) => {
        if (a.arrivalTime === b.arrivalTime) {
            return a.priority - b.priority;
        }
        return a.arrivalTime - b.arrivalTime;
    });

    while (completed < n) {
        let index = -1;
        let highestPriority = Infinity;

        // Find the process with the highest priority that has arrived and not completed
        for (let i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime && !isCompleted[i] && processes[i].priority < highestPriority) {
                highestPriority = processes[i].priority;
                index = i;
            }
        }

        if (index !== -1) {
            // Process found; execute it
            const process = processes[index];
            process.startTime = currentTime;

            // Process executes for the full burst time
            process.finishTime = currentTime + process.burstTime;
            process.turnaroundTime = process.finishTime - process.arrivalTime;
            process.waitingTime = process.turnaroundTime - process.burstTime;

            // Mark the process as completed
            isCompleted[index] = true;
            completed++;

            currentTime = process.finishTime; // Update the current time
            ganttChart.push(process.PID);
        } else {
            // No process is available to run, record idle time
            ganttChart.push('IDLE');
            currentTime++;
        }
    }

    return ganttChart;
}
