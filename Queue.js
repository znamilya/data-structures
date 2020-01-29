class Queue extends Sequance {}

Queue.prototype.peek = Queue.prototype.getStart;
Queue.prototype.enqueue = Queue.prototype.push;
Queue.prototype.enqueueAll = Queue.prototype.pushAll;
Queue.prototype.dequeue = Queue.prototype.shift;
