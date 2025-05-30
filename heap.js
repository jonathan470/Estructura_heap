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

  parentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  leftChildIndex(i) {
    return 2 * i + 1;
  }

  rightChildIndex(i) {
    return 2 * i + 2;
  }

  insert(task) {
    this.heap.push(task);
    let current = this.heap.length - 1;

    while (
      current > 0 &&
      this.heap[current].priority < this.heap[this.parentIndex(current)].priority
    ) {
      [this.heap[current], this.heap[this.parentIndex(current)]] = [
        this.heap[this.parentIndex(current)],
        this.heap[current],
      ];
      current = this.parentIndex(current);
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
    const size = this.heap.length;

    while (true) {
      let left = this.leftChildIndex(index);
      let right = this.rightChildIndex(index);
      let smallest = index;

      if (
        left < size &&
        this.heap[left].priority < this.heap[smallest].priority
      ) {
        smallest = left;
      }

      if (
        right < size &&
        this.heap[right].priority < this.heap[smallest].priority
      ) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  printHeap() {
    console.log(
      this.heap.map((task) => `(${task.name}, ${task.priority})`).join(", ")
    );
  }

  printHeapPretty() {
    console.log("Estado actual del heap:");
    this.heap.forEach((task) =>
      console.log(`Tarea: ${task.name}, Prioridad: ${task.priority}`)
    );
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

  console.log("\nHeap vacío.");
}

const heap = new MinHeap();
insertRandomTasksToHeap(heap, 5);
