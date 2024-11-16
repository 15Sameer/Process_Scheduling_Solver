# Operating System Project - Process Scheduling Solver

## Overview

This project is a comprehensive **Process Scheduling Solver** that demonstrates the implementation of various CPU scheduling algorithms. The goal of the project is to visualize and simulate how different algorithms manage process scheduling, calculate related metrics, and optimize process management. This application provides a web-based interface to enter process data, apply different scheduling algorithms, and visualize the results using Gantt charts and detailed tables.

## Features

- **Algorithms Supported**:
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF) )
  - Shortest Remaining Time First (SRTF)
  - Round Robin (RR)
  - Priority Scheduling 
  - Highest Response Ratio Next (HRRN)

- **Process Data Entry**:
  - Allows input of process information like arrival time, burst time, priority (if applicable), and time quantum for Round Robin.
  - Input fields adapt dynamically based on the selected algorithm.

- **Visualization**:
  - Gantt chart for visualizing the scheduling of processes over time.
  - Detailed table for displaying metrics:
    - Completion Time (CT)
    - Turnaround Time (TAT)
    - Waiting Time (WT)
    - Response Time (RT)
    - Average TAT
    - Average WT


## How It Works

1. Choose the scheduling algorithm you want to visualize.
2. Enter the process details in the dynamic input fields.
3. Submit the information to generate the Gantt chart and metrics.
4. Analyze the output in the Gantt chart and process metrics table.

## Usage
1. Open the application in your preferred web browser.
2. Select the desired CPU scheduling algorithm from the dropdown menu.
3. Enter the required process details (e.g., arrival time, burst time, priority).
4. Click Submit to view the scheduling output:
5. Gantt chart to visualize the process execution timeline.
6. Table with calculated metrics like CT, TAT, WT, RT, Average WT, and Average TAT.

