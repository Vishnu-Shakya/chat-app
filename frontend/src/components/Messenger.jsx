import React, { useEffect, useState ,useRef} from 'react'
import { FaEllipsisH, FaEdit, FaSearch } from "react-icons/fa";
import ActiveFriend from './ActiveFriend';
import { Friends } from './Friends';
import RightSide from './Rightside';
import { useDispatch, useSelector } from 'react-redux'
import { getFriends, messageSend, getMessage } from '../store/actions/messengerAction';
import {io} from 'socket.io-client'

export default function Messenger() {
    // this state for current friends on right portion 
    const [currentFriend, setCurrentFriend] = useState('')
    const [activeUser,setActiveUser]=useState(''); // this is for active user with green dot 

    const [newMessage, setNewMessage] = useState('')
    const { friends, messages } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)

    const scrollRef=useRef();
    const socket = useRef();
   
    useEffect(() => {
       socket.cuurent=io('ws://localhost:8000'); // this command connect the socket with socket .js file 
    }, [])

    useEffect(()=>{
        socket.cuurent.emit('adduser',myInfo.id,myInfo)
    },[])

    useEffect(()=>{
        socket.cuurent.on('getUser',(users)=>{
            
            const fileterUser=users.filter(u=>u.userId!==myInfo.id)
           
            setActiveUser(fileterUser)
    })
    },[activeUser,setActiveUser])




    const inputHandle = (e) => {
        e.preventDefault()

        setNewMessage(e.target.value)



    }
    const sendMessage = (e) => {
        e.preventDefault()






        const data = {
            senderName: myInfo.userName,
            receiverId: currentFriend._id,
            message: newMessage ? newMessage : '💜'
        }

        dispatch(messageSend(data))
        socket.current.emit('sendMessage',{
            senderId:myInfo.myId,
            senderName:myInfo.userName,
            message: newMessage ? newMessage : '💜'
        })
        setNewMessage('')
        // here we dispatch our data to messanger action then action tranferred it to backend 
    }


  
   




    const dispatch = useDispatch()
    useEffect(() => {
        socket.current = io('ws://localhost:8000');
    },[]);

    useEffect(() => {
        dispatch(getFriends())
    }, [])
    useEffect(() => {
        if (friends && friends.length > 0) {

            setCurrentFriend(friends[0])
        }
    }, [friends])

    // useffect to get message of current user 
    useEffect(() => {
        dispatch(getMessage(currentFriend._id))
    }, [currentFriend?._id])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages])


    return (
        <div className='messenger'>
            <div className="row">
                <div className="col-3">
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img src={`./image/${myInfo.image}`} alt="" />
                                </div>
                                <div className="name">
                                    <h3>{myInfo.userName}</h3>
                                </div>
                            </div>
                            <div className="icons">
                                <div className="icon">
                                    <FaEllipsisH />
                                </div>
                                <div className="icon">
                                    <FaEdit />
                                </div>
                            </div>  </div>
                        <div className="friend-search">
                            <div className="search">
                                <button><FaSearch /></button>
                                <input type="text" placeholder='search' className='form-control' />
                            </div>
                        </div>
                        <div className="active-friends">
                            {
                                activeUser && activeUser.length>0 ? activeUser.map(u=> <ActiveFriend user={u}/>):null
                            }
                           
                        </div>
                        <div className="friends">

                            {

                                friends && friends.length > 0 ? friends.map((fd) => <div className={currentFriend._id === fd._id ? 'hover-friend active' : 'hover-friend'} onClick={() => setCurrentFriend(fd)}>
                                    <Friends friend={fd} />
                                </div>

                                ) : 'No Friends'
                            }


                        </div>
                    </div>


                </div>
                {
                    currentFriend ? <RightSide
                        messages={messages}
                        currentFriend={currentFriend}
                        newMessage={newMessage}
                        inputHandle={inputHandle}
                        sendMessage={sendMessage}
                        scrollRef={scrollRef}
                       

                    /> : "Please select a friends "
                }
            </div>

        </div>

    )
}
