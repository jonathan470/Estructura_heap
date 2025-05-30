class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }
}
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(task) {
    this.heap.push(task);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority < this.heap[parentIndex].priority) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
   }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }

      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  printHeap() {
    console.log(this.heap.map(task => `(${task.name}, ${task.priority})`).join(", "));
  }

  printHeapPretty() {
    console.log("Estado actual del heap:");
    this.heap.forEach(task => console.log(`Tarea: ${task.name}, Prioridad: ${task.priority}`));
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}


function insertRandomTasksToHeap(heap, n, maxPriority = 10) {
  console.log(`Insertando ${n} tareas aleatorias en el heap:\n`);

  for (let i = 0; i < n; i++) {
    const taskName = `Tarea${i + 1}`;
    const priority = Math.floor(Math.random() * maxPriority) + 1;
    console.log(`Insertando: ${taskName}, Prioridad: ${priority}`);
    heap.insert(new Task(taskName, priority));
  }

  console.log("\n ---- Representación del heap: ----");
  heap.printHeapPretty();

  console.log("\n ---- Heap como arreglo: ----");
  heap.printHeap();

  console.log("\n ---- Extrayendo tareas en orden de prioridad ----");
  while (!heap.isEmpty()) {
    const task = heap.extractMin();
    console.log(`>> Ejecutando: ${task.name} (Prioridad: ${task.priority})`);
  }

  console.log("\nHeap vacío.");
}

const heap = new MinHeap();
insertRandomTasksToHeap(heap, 5);