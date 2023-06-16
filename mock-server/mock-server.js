import { mockTasks } from './mock-tasks.js';

const TOTAL_TASKS_QUANTITY = 10;

export class MockServer {
    getTasks() {
        const quantity = getRundomNumber(TOTAL_TASKS_QUANTITY);
        const indexes = getIndexes(quantity);
        const tasks = indexes.map(index => mockTasks[index]);

        return new Promise(r => setTimeout(r, 350, tasks));
    }
}

function getIndexes(quantity) {
    const indexes = [];

    for (let index = 0; index < quantity;) {
        const rundomIndex = getRundomNumber(TOTAL_TASKS_QUANTITY - 1);

        if (!indexes.includes(rundomIndex)) {
            indexes.push(rundomIndex);
            index++;
        }
    }

    return indexes;
}

function getRundomNumber(quantity) {
    return Math.floor(Math.random() * quantity);
}
