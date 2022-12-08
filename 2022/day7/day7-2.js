// Advent of Code 07/12/2022 by Roilbauk

// with demo input string

console.log(
    require('fs').readFileSync('./input.txt',"utf8").toString().split('\r').join('') // windows..
    .match(/\$ ls\n\n?[^\$]*/g)
    // splitting input on 'ls ' match, until next '^$' line to get every folder own description :
    // [
    //   '$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n',
    //   '$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n',
    //   '$ ls\n584 i\n',
    //   '$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k'
    // ]
    
    .map(line=>
        ({
            sub: line.split('dir ').length-1, // counting "dir " occurence from string => gives amount of direct subdirectories
            //example for first line : [ '$ ls\n', 'a\n14848514 b.txt\n8504156 c.dat\n', 'd\n' ].length-1  => 2 ('dir ' appeared twice in the string)
            size: ('0\n'+line).match(/[0-9]+/g) // matching every number example for first item line : [ '14848514', '8504156' ]
                // ('0\n'+line) allows me to avoid having no match if the directory has no file. At least '0' will always match regex without modifying size
                .reduce((sum,e)=>Number(sum)+Number(e)) // summing numbers from string | size of files of this folder (not counting subdirectories)
        })
    )
    // directories description string turned into data object
    //      sub : amount of direct subdirectories
    //      size : summed size of files of this folder (not counting subdirectories)
    // [
    //   { sub: 2, size: 23352670 },
    //   { sub: 1, size: 94269 },
    //   { sub: 0, size: 584 },
    //   { sub: 0, size: 24933642 }
    // ]
    
    /*** /!\ NOTE /!\ ***\
     * Notice that the tree from input is already written in a certain order : that's a pre-order traversal version of the Depth-First Search (DFS)
     * https://miro.medium.com/max/640/1*UGoV21qO6N8JED-ozsbXWw.gif
     * as : 
     *     1 Visit Node
     *     2 Go to left-subtree
     *     3 Go to right-subtree
     * Keeping this order in our data, and knowing how many subdirectrories (in node.sub) a node has, let us know the tree structure without building it.
     * 
     *** Explanation for the recursion mechanism of the dirSize function : considering  node = arr[j]
     * node.sub is then telling us how many next directories we shall read before stopping the recursion, to collect the total size of current dir.
     * each newly read directory add it's own node.sub to the subdirectories counter (dirToRead)
     * the recursion continues like this until the counter is descreinsignly consumed by enough (all, for / node) depest-level subdirectories, having their node.sub=0
     * on each step return the node.size + the subdirectories recursive size
    */
    .map((_,i,arr)=> 
        (dirSize=(arr, j, dirToRead)=>
            arr[j].size+((dirToRead+=arr[j].sub)==0?
                0:
                dirSize(arr,j+1,dirToRead-1))) //j+1 : go to next directory description in the list, | dirToRead-1 : we decrease the counter, one more directory have been read
        (arr,i,0))  //directly calling the declared function
        
    // item are replaced by their total size (with subfolder size included)
    // [ 48381165, 94853, 584, 24933642 ]

    /**part 1**/
    // .filter(size=>size<=100000)
    // .reduce((sum,e)=>sum+e,0)

    /*part 2*/
    // .filter((e,i,arr)=>e>30000000-(70000000-arr[0])).sort((a,b)=>a-b)[0] // filter sizes, sort increasingly, and take first to get min value
    .filter((e,_,arr)=>e>arr[0]-40000000) // filter sizes arr[0]-40000000<==>30000000-(70000000-arr[0]))
    .reduce((min,e)=>Math.min(min,e)) // reduce to min value
    // 24933642
)