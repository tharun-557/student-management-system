const express=require("express");
const fs=require("fs");
const cors=require("cors");
const app=express();

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to the page!!")
})

app.get("/students",(req,res)=>{
    fs.readFile("./students.json","utf-8",(err,data)=>{
        if(err){
            console.log("cannot retrieve file!!")
        }
        const students=JSON.parse(data)
        res.json(students);
    })
})

app.get("/students/:id",(req,res)=>{
    var id=req.params.id;
    fs.readFile("./students.json","utf-8",(err,data)=>{
        if(err){
            console.log("cannot retrieve file!!");
        }
        const students=JSON.parse(data);
        const findstud=students.find(item=>item.id==id);
        res.send(findstud)
    })
})

app.post("/students",(req,res)=>{
    const newdata={
        id:req.body.id,
        name:req.body.name,
        age:req.body.age,
        loc:req.body.loc
    }
    fs.readFile("./students.json","utf-8",(err,data)=>{
        if(err){
            console.log("cannot retrieve file!!")
        }
        else{
            var newstudent=JSON.parse(data);//data is string by parsing we will get array
            newstudent.push(newdata)
            fs.writeFile("./students.json",JSON.stringify(newstudent),(err)=>{
                console.log("cannot perform write operation!!")
            })
            res.send(newdata)
        }
    })
})

app.put("/students/:id",(req,res)=>{
    var id=req.params.id;
    fs.readFile("./students.json","utf-8",(err,data)=>{
        if(err){
            console.log("cannot retrieve file!!");
        }
        const students=JSON.parse(data);
        const findstud=students.find(item=>item.id==id);
        findstud.name=req.body.name
        findstud.age=req.body.age
        findstud.loc=req.body.loc
        

        fs.writeFile("./students.json",JSON.stringify(students),(err)=>{
            console.log("cannot perform write operation!!")
        })
    

        res.send(findstud)
    })
    
})

app.delete("/students/:id",(req,res)=>{
    var id=req.params.id;
    fs.readFile("./students.json","utf-8",(err,data)=>{
        if(err){
            console.log("cannot retrieve file!!");
        }
        const students=JSON.parse(data);
        const findstud=students.filter(item=>item.id!=id);
        

        fs.writeFile("./students.json",JSON.stringify(findstud),(err)=>{
            console.log("cannot perform write operation!!")
        })
    

        res.send("deleted successfully!!")
    })
})


app.listen(4000,()=>{
    console.log("app is listening at port no 4000")
})