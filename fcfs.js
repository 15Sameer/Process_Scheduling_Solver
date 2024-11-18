import { Process } from './process.js';

export function FCFS(processes) {
    const n = processes.length;
    let time = 0; // Track the current time
    let ganttChart = [];

    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    processes.forEach(p => {
        // Check if there's idle time before the next process arrives
        if (time < p.arrivalTime) {
            // If the current time is before the arrival time, record idle time
            ganttChart.push('IDLE');
            time = p.arrivalTime; // Jump to the next process's arrival time
        }

        // Process execution
        p.finishTime = time + p.burstTime;
        p.turnaroundTime = p.finishTime - p.arrivalTime;
        p.waitingTime = p.turnaroundTime - p.burstTime;
        ganttChart.push(p.PID); // Record the process in the Gantt chart

        // Update the current time to the finish time of the current process
        time = p.finishTime;
    });

    return ganttChart;
}
