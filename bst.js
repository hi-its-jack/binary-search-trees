class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree([...new Set(arr)].sort((a,b) => a-b))
    }

    buildTree(arr){
        if (arr.length == 0) return null
        const mid = Math.floor(arr.length / 2)
        const root = new Node(arr[mid])
        root.left = this.buildTree(arr.slice(0,mid))
        root.right = this.buildTree(arr.slice(mid+1))
        return root
    }

    insert(value, node = this.root) {
        if (!node) return new Node(value)
        if (value < node.data) {
            node.left = this.insert(value, node.left)
        } else if (value > node.data) {
            node.right = this.insert(value, node.right)
        } 
        return node
    }

    deleteItem(value, node = this.root) {
        if (!node) return null
        if (value < node.data) {
            node.left = this.deleteItem(value, node.left)
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right)
        } else {
            if (!node.left) return node.right 
            if (!node.right) return node.left 
            let successor = node.right
            while (successor.left) {
                successor = successor.left
            }
            node.data = successor.data 
            node.right = this.deleteItem(successor.data, node.right)   
        }
        return node
    }

    find(value, node = this.root) {
        if (!node || node.data == value) return node
        return value < node.data ? this.find(value, node.left) : this.find(value, node.right)
    }

    levelOrder(callback) {
        if (!callback) throw new Error("Callback required")
        const queue = [this.root]   
        while (queue.length) {
            const node = queue.shift() 
            callback(node)
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }   
    }

    inOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback required")
        if (node) {
            this.inOrder(callback, node.left)
            callback(node)
            this.inOrder(callback, node.right)
            }
    } 

    preOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback required")
            if (node) {
                callback(node)
                this.preOrder(callback, node.left)
                this.preOrder(callback, node.right)
            }
    } 
    
    postOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback required")
            if (node) {
                this.postOrder(callback, node.left)
                this.postOrder(callback, node.right)
            }
    }

    height(node) {
        if (!node) return -1
        return 1 + Math.max(this.height(node.left), this.height(node.right))
    }

    depth(node, root = this.root, level = 0) {
        if (!root || !node) return -1
        if (root === node) return level
        return node.data < root.data
          ? this.depth(node, root.left, level + 1)
          : this.depth(node, root.right, level + 1)
      }
    
      isBalanced(node = this.root) {
        if (!node) return true
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        if (Math.abs(leftHeight - rightHeight) > 1) return false
        return this.isBalanced(node.left) && this.isBalanced(node.right)
      }
    
      rebalance() {
        const nodes = [];
        this.inOrder(node => nodes.push(node.data))
        this.root = this.buildTree(nodes)
      }

      prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      }

    }
 

// Generate a random array of numbers less than 100
const generateRandomArray = () => {
    const arr = [];
    const length = Math.floor(Math.random() * 20) + 10; // Random array size between 10 and 30
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 100)); // Random number between 0 and 99
    }
    return arr;
  };
  
  // Create a binary search tree from the random array
  const arr = generateRandomArray();
  console.log('Generated array:', arr);
  const tree = new Tree(arr);
  
  // Confirm that the tree is balanced
  console.log('Is the tree balanced initially?', tree.isBalanced());
  
  // Pretty print the tree after initial creation
  console.log('\nInitial tree structure:');
  tree.prettyPrint();
  
  // Print out all elements in level, pre, post, and in order
  console.log('\nLevel order traversal:');
  tree.levelOrder(node => console.log(node.data));
  
  console.log('\nPre-order traversal:');
  tree.preOrder(node => console.log(node.data));
  
  console.log('\nPost-order traversal:');
  tree.postOrder(node => console.log(node.data));
  
  console.log('\nIn-order traversal:');
  tree.inOrder(node => console.log(node.data));
  
  // Unbalance the tree by adding several numbers > 100
  console.log('\nAdding numbers greater than 100 to unbalance the tree:');
  tree.insert(150);
  tree.insert(200);
  tree.insert(250);
  tree.insert(300);
  tree.insert(400);
  
  // Confirm that the tree is unbalanced
  console.log('Is the tree balanced after adding large numbers?', tree.isBalanced());
  
  // Pretty print the tree after unbalancing
  console.log('\nTree structure after unbalancing:');
  tree.prettyPrint();
  
  // Print out all elements after unbalancing
  console.log('\nLevel order traversal (after unbalancing):');
  tree.levelOrder(node => console.log(node.data));
  
  console.log('\nPre-order traversal (after unbalancing):');
  tree.preOrder(node => console.log(node.data));
  
  console.log('\nPost-order traversal (after unbalancing):');
  tree.postOrder(node => console.log(node.data));
  
  console.log('\nIn-order traversal (after unbalancing):');
  tree.inOrder(node => console.log(node.data));
  
  // Balance the tree
  console.log('\nRebalancing the tree...');
  tree.rebalance();
  
  // Confirm that the tree is balanced after rebalancing
  console.log('Is the tree balanced after rebalancing?', tree.isBalanced());
  
  // Pretty print the tree after rebalancing
  console.log('\nTree structure after rebalancing:');
  tree.prettyPrint();
  
  // Print out all elements after rebalancing
  console.log('\nLevel order traversal (after rebalancing):');
  tree.levelOrder(node => console.log(node.data));
  
  console.log('\nPre-order traversal (after rebalancing):');
  tree.preOrder(node => console.log(node.data));
  
  console.log('\nPost-order traversal (after rebalancing):');
  tree.postOrder(node => console.log(node.data));
  
  console.log('\nIn-order traversal (after rebalancing):');
  tree.inOrder(node => console.log(node.data));
  