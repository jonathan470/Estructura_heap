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
}
