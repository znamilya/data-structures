class Stack extends Sequance {}

Stack.prototype.peek = Stack.prototype.getStart;
Stack.prototype.push = Stack.prototype.unshift;
Stack.prototype.pushAll = Stack.prototype.unshiftAll;
Stack.prototype.pop = Stack.prototype.shift;
