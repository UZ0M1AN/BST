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
        this.root = this._buildTree();
    }

    _buildTree (arr = this.arr) {
        // Sort the array and remove duplicates
        const modArr = [...new Set(arr)].sort((a, b) => a - b);

        return this._bst(modArr);
    }

    _bst (arr, start = 0, end = arr.length - 1) {
        // Get the middle of the array;
        const mid = ~~((start + end) / 2);

        // Base case
        if (start > end) return null;

        // Create the balanced tree
        const root = new Node(arr[mid]);
        root.left = this._bst(arr, start, mid - 1);
        root.right = this._bst(arr, mid + 1, end);

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

    delete (value, node = this.root) {
        const delNode = this.find(value);
        
        // if (node.data === delNode.data) this.root = null;
        if (!delNode.right && !delNode.left) this._deleteLeaf(value, node);
        if ((!delNode.right && delNode.left) || (delNode.right && !delNode.left)) this._deleteOneBranch(value, node)
        if (delNode.right && delNode.left) this._deleteBothBranches(value, node);

        return delNode.data;
    }

    _deleteLeaf (value, node) {
        if (!node) return;

        if (node.data > value) {
            const leftNode = this._deleteLeaf(value, node.left);
            if (leftNode === null) node.left = null;
        }
        if (node.data < value) {
            const rightNode = this._deleteLeaf(value, node.right);
            if (rightNode === null) node.right = null;
        }
        if (node.data == value) return null;
    }

    _deleteOneBranch(value, node) {
        if (!node) return;

        if (node.data > value) {
            const leftNode = this._deleteOneBranch(value, node.left);
            node.left = leftNode.left || leftNode.right;
        }
        if (node.data < value) {
            const rightNode = this._deleteOneBranch(value, node.right);
            node.right = rightNode.left || rightNode.right;
        }
        if (node.data === value) return node;
    }

    _deleteBothBranches(value, node) {
        // if (!node) return;

        // if (node.data > value) {
        //     const leftNode = this._deleteBothBranches(value, node.left);
        //     node.left = leftNode;
        // }
        // if (node.data < value) {
        //     const rightNode = this._deleteBothBranches(value, node.right);
        //     node.right = rightNode;
            
        // }
        // if (node.data === value) {
        //     let nextBigNode = node.right,
        //         lastLeftNode;

        //     while (nextBigNode) {
        //         if (!nextBigNode.left) lastLeftNode = nextBigNode;
        //         nextBigNode = nextBigNode.left;
        //     }

        //     [lastLeftNode.right, lastLeftNode.left] = [node.right, node.left];
        //     return lastLeftNode;
        // }
    }

    find (value, node = this.root) {
        if (!node) return;
        if (node.data === value) return node;

        const leftNode = this.find(value, node.left);
        const rightNode = this.find(value, node.right);

        return leftNode || rightNode || null;
    }
}

// const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
const tree = new Tree([50, 30, 20, 40, 32, 34, 36, 70, 60, 80, 65, 75, 85]);
log(tree.root);
tree.prettyPrint();
// log(tree.delete(70));
// tree.prettyPrint();
// log(tree.root);