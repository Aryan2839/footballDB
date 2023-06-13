const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
// const mongodb="mongodb://localhost:27017/footballDB";
const mongoose=require("mongoose")

app.set('view engine' ,'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static("public"));

// const PORT=3000;
mongoose.connect("mongodb://127.0.0.1:27017/footballDB");

// mongoose
//     .connect(' mongodb://127.0.0.1:27017/footballDB'
// , {
//     userNewUrlPaser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   }
//   )
//     .then(() => {
//       console.log('Connected to MongoDB');
//     })
//     .catch((e) => {
//       console.log('not connected');
//     });

const playerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name required!!"]
    },
    age:{
        type:Number,
        min:20,
        max:40
    },
    team:String
});

const Player=mongoose.model('player',playerSchema);

const player1= new Player({
    name:"Neymar",
    age:30,
    team:"PSG"
});
const player2= new Player({
    name:"Messi",
    age:35,
    team:"PSG"
});
const player3= new Player({
    name:"M-bappe",
    age:24,
    team:"PSG"
});
const player4= new Player({
    name:"Ramos",
    age:37,
    team:"PSG"
});
const player5= new Player({
    name:"Pereira",
    age:31,
    team:"PSG"
});

// player.save();  
Player.insertMany([player1,player2,player3,player4,player5])


// Another Collection!!
const Coach=mongoose.model('coach',playerSchema)
const coach=new Coach({
    name:"zadane",
    age:50,
    team:"PSG"
})
// coach.save()
app.get("/players", async(req,res)=>{
    // Player.find(function(err, foundPlayers){
    //     res.send(foundPlayers);
    // })
    // res.send(Player);
    const allPlayer=  await Player.find({});
    res.send({allPlayer});
})
app.listen(3000,function(){
    console.log("server initiated!!");
})
