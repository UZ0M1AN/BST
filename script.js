console.log('uzomian...');

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
        
        if (!delNode.right && !delNode.left) this._deleteLeafNode(value, node);
        if ((!delNode.right && delNode.left) || (delNode.right && !delNode.left)) this._deleteOneBranchNode(value, node)
        if (delNode.right && delNode.left) this._deleteTwoBranchNode(value, node);

        return value;
    }

    _deleteLeafNode (value, node) {
        if (!node) return;

        if (node.data > value) {
            const leftNode = this._deleteLeafNode(value, node.left);
            if (leftNode === null) node.left = null;
        }
        if (node.data < value) {
            const rightNode = this._deleteLeafNode(value, node.right);
            if (rightNode === null) node.right = null;
        }
        if (node.data == value) return null;
    }

    _deleteOneBranchNode (value, node) {
        if (!node) return;

        if (node.data > value) {
            const leftNode = this._deleteOneBranchNode(value, node.left);
            node.left = leftNode.left || leftNode.right;
        }
        if (node.data < value) {
            const rightNode = this._deleteOneBranchNode(value, node.right);
            node.right = rightNode.left || rightNode.right;
        }
        if (node.data === value) return node;
    }

    _deleteTwoBranchNode (value, node) {
        if (!node) return;

        if (node.data > value) {
            const leftNode = this._deleteTwoBranchNode(value, node.left);
            node.left = leftNode;
        }
        if (node.data < value) {
            const rightNode = this._deleteTwoBranchNode(value, node.right);
            node.right = rightNode;
        }
        if (node.data === value) {
            // Find the next biggest node
            let nextBigNode = node.right,
                lastLeftNode;

            while (nextBigNode) {
                if (!nextBigNode.left) lastLeftNode = nextBigNode;
                nextBigNode = nextBigNode.left;
            }

            // Replace the node to be deleted with the next biggest node
            const data = lastLeftNode.data;
            lastLeftNode.right ? this._deleteOneBranchNode(data, node) : this._deleteLeafNode(data, node);
            node.data = data;
        }
        return node;
    }

    find (value, node = this.root) {
        if (!node) return;
        if (node.data === value) return node;

        const leftNode = this.find(value, node.left);
        const rightNode = this.find(value, node.right);

        return leftNode || rightNode || null;
    }

    levelOrder (fxn) {
        const arr = [this.root];
        let i = 0;
        
        while (arr[i]) {
            if (arr[i].left) arr.push(arr[i].left);
            if (arr[i].right) arr.push(arr[i].right);
            i++;
        }
        
        const dataArr = arr.map(x => x.data);
        const modArr = dataArr.map(fxn || (x => x));
        return modArr;
    }

    preOrder (fxn, node = this.root, arr = []) {
        if (!node) return;

        arr.push(fxn ? fxn(node.data) : node.data);
        const left = this.preOrder(fxn, node.left, arr);
        const right = this.preOrder(fxn, node.right, arr);

        return arr;
    }

    inOrder (fxn, node = this.root, arr = []) {
        if (!node) return;

        const left = this.inOrder(fxn, node.left, arr);
        arr.push(fxn ? fxn(node.data) : node.data);
        const right = this.inOrder(fxn, node.right, arr);

        return arr;
    }

    postOrder (fxn, node = this.root, arr = []) {
        if (!node) return;

        const left = this.postOrder(fxn, node.left, arr);
        const right = this.postOrder(fxn, node.right, arr); 
        arr.push(fxn ? fxn(node.data) : node.data);

        return arr;
    }

    height (node) {
        if (typeof node === 'number') node = this.find(node);
        if (!node) return -1;

        const left = this.height(node.left);
        const right = this.height(node.right);

        return left > right ? left + 1 : right + 1;
    }

    depth (node, root = this.root) {
        let n = 0;

        while (root.data !== node) {
            if (node > root.data) root = root.right;
            else root = root.left;
            n++;
        }

        return n;
    }

    isBalanced (node = this.root) {
        if (!node) return 0;

        const left = this.isBalanced(node.left);
        const right = this.isBalanced(node.right);

        if (left === false || right === false) return false;
        return Math.abs(this.height(node.left) - this.height(node.right)) < 2;
    }

    rebalance() {
        const arr = this.preOrder();
        this.root = this._buildTree(arr);
        return this.root;
    }
}
