// class Creature {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   move(speed) {
//     console.log(`Moved ${speed}`);
//   }

//   die() {
//     console.log('Died');
//   }
// }

// class Herbivore extends Creature {
//   eat() {
//     console.log('Eaten');
//   }

//   reproduce() {
//     console.log('Reproduced');
//   }

//   chooseCell() {
//     console.log('Cell chosen');
//   }
// }

// class Predator extends Creature {
//   constructor(x, y, energy) {
//     super(x, y);
//     this.energy = energy;
//   }
// }

// const myHerbivore = new Herbivore(10, 20);
// console.log(myHerbivore.x);

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._penultimate = null;
  }

  add(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this._penultimate = this.tail;
    this.tail = node;
  }

  remove() {
    this._penultimate.next = null;
    this.tail = this._penultimate;
  }
}
