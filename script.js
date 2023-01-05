console.log('uzomian...');

const log = (...a) => console.log(...a);

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor (arr) {
        this.arr = arr;
        this.root = this.buildTree();
    }

    buildTree (arr = this.arr) {
        // Sort the array and remove duplicates
        const modArr = [...new Set(arr)].sort((a, b) => a - b);

        return this.bst(modArr);
    }

    bst (arr, start = 0, end = arr.length - 1) {
        // Get the middle of the array;
        const mid = ~~((start + end) / 2);

        // Base case
        if (start > end) return null;

        // Create the balanced tree
        const root = new Node(arr[mid]);
        root.left = this.bst(arr, start, mid - 1);
        root.right = this.bst(arr, mid + 1, end);

        return root;
    }

    prettyPrint (node = this.root, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
          }
          console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
          if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
          }
    }

    insert (value) {
        let node = this.root;

        while (node) {
            if (node.data == value) return;

            if (node.data < value) {
                if (!node.right) node.right = new Node(value);
                node = node.right;
            }
            if (node.data > value) {
                if (!node.left) node.left = new Node(value);
                node = node.left;
            }
        }  
    }

    delete (value) {}
}

const tree = new Tree([1, 2, 3, 4, 5]);
tree.insert(10);
log(tree.root);

tree.prettyPrint();