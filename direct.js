var fs = require("fs")
//function to print the directories using path specified
async function print(path,s) {
    //async opening a directory
    const dir = await fs.promises.opendir(path)
    //to count the number of files and folders
    let i = 0;
    //dirent are objects for directory object
    for await (const dirent of dir) {
        if(i<9){
            console.log(indent(s)+dirent.name)
        }
        else{
            console.log(indent(s)+"...other")
            return
        }
        i+=1
        try {
            //if dirent object is a folder then aynchronously
            //enter it and print the contents.
            if (dirent.isDirectory()) {
                await print("/home/Desktop" + DirectoryIncrement(path,dirent.name),s*4).catch(console.error)
            }
        }
        catch(e)
        {
            console.error(e.name)
        }
    }
}
//calling the print directory from the root path provided.
print("/home/Desktop",1).catch(console.error)
// function to give indentation
function indent(i,msg){
    let space = " "
    for(let ind = 0; ind<i ; ind++){
        space = space + ''
    }
    return space;
}
//function to increment the directory address.
function DirectoryIncrement(current,next){
    current = current+"/home/Desktop"+next
    return current
}