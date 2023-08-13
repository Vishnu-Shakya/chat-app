
var io = require('socket.io')(8000,{
    cors:{
        origin:"*",
        methods:['GET','POST']
    }
});

let users=[];
const addUser=(userId,socketId,userInfo)=>{
    const checkUser=users.some(m=>{
        return m.id===userId
    })
   
    if(!checkUser){
        users.push({
            userId,userInfo,socketId
        })
        console.log(users)
    }
}



io.on('connection', (socket) => {
    console.log('Socket is connecting...')
    socket.on('adduser', (userId,userInfo) => {
        addUser(userId,socket.id,userInfo);
        io.emit('getUser',users);
       
    })
    



   

})

