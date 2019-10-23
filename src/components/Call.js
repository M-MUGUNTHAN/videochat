import React from 'react';
import {CometChat} from '@cometchat-pro/chat';

class Call extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: props.location.state? props.location.state.user : '',
      receiver_id:"superhero1",
      sessionId:"",
      sessionIdSTate:false,
    };
  }
  sesid="";



componentDidMount(){
    var listnerID = "UNIQUE_LISTENER_ID";
    var setMyState= (call)=>this.setState({sessionId:call.sessionId},()=>console.log("STATE SET"));

    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived(call) {
          console.log("Incoming 1:", call);
            console.log("Income", call.sessionId);
            setMyState(call)
              console.log("state set")
            //   this.sesid=call.sessionId;
        },
        onOutgoingCallAccepted(call) {
          console.log("Outgoing call accepted:", call);
          CometChat.startCall(
            call.sessionId,
            document.getElementById("callScreen"),
            new CometChat.OngoingCallListener({
              onUserJoined: user => {
                /* Notification received here if another user joins the call. */
                console.log("User joined call:", user);
                /* this method can be use to display message or perform any actions if someone joining the call */
              },
              onUserLeft: user => {
                /* Notification received here if another user left the call. */
                console.log("User left call:", user);
                /* this method can be use to display message or perform any actions if someone leaving the call */
              },
              onCallEnded: call => {
                /* Notification received here if current ongoing call is ended. */
                console.log("Call ended:", call);
                /* hiding/closing the call screen can be done here. */
              }
            })
          );
          // Outgoing Call Accepted
        },
        onOutgoingCallRejected(call) {
          console.log("Outgoing call rejected:", call);
          // Outgoing Call Rejected
        },
        onIncomingCallCancelled(call) {
          console.log("Incoming call calcelled:", call);
        }
      })
    );
    }
 
  rejectCall=()=>{
      var sessionID=this.state.user.sessionId;
    var status = CometChat.CALL_STATUS.REJECTED;
    CometChat.rejectCall(sessionID, status).then(
      call => {
        console.log("Call rejected successfully", call);
      },
      error => {
        console.log("Call rejection failed with error:", error);
      }
    );
  }
  startVideoChat=()=>{
    var receiverID = this.state.receiver_id;
    var callType = CometChat.CALL_TYPE.VIDEO;
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    var call = new CometChat.Call(receiverID, callType, receiverType);
    console.log(receiverID);
    CometChat.initiateCall(call).then(
      outGoingCall => {
        console.log("Call initiated successfully:", outGoingCall.sessionId);
        this.setState({sessionId: outGoingCall.sessionId},()=>{
            if(this.state.sessionIdSTate === true){
                this.acceptCall(this.state.sessionId)
            }
        })
        // perform action on success. Like show your calling screen.
      },
      error => {
        console.log("Call initialization failed with exception:", error);
      }
    );
  }
  
  acceptCall=()=>{
      console.log("accept call",this.state.sessionId);
    CometChat.acceptCall(this.state.sessionId).then(
      call => {
        console.log("Call accepted successfully:", call,);
        console.log("call accepted now....");
        // start the call using the startCall() method
        CometChat.startCall(
          call.sessionId,
          document.getElementById("callScreen"),
          new CometChat.OngoingCallListener({
            onUserJoined: user => {
              /* Notification received here if another user joins the call. */
              console.log("User joined call:", user);
              /* this method can be use to display message or perform any actions if someone joining the call */
            },
            onUserLeft: user => {
              /* Notification received here if another user left the call. */
              console.log("User left call:", user);
              /* this method can be use to display message or perform any actions if someone leaving the call */
            },
            onCallEnded: call => {
              /* Notification received here if current ongoing call is ended. */
              console.log("Call ended:", call);
              /* hiding/closing the call screen can be done here. */
            }
          })
        );
      },
      error => {
        console.log("Call acceptance failed with error", error);
        // handle exception
      }
    );
  }

  render() {
    console.log('render',this.state.sessionId)
    return(
        <div>
        <div>
          {/* <button  Onlick="logoutUser">Logout</button>  */}
        </div>
        <div>
          <div>
            <p>Welcome <b>{ this.state.user.name}</b>, your UID is <b>{ this.state.user.uid }</b> <br/>
            Enter the receiver Id to start a chat </p>
            <input type="text" className="form-control" placeholder="Enter receiver UID"
             value={this.state.receiver_id}  onChange={(event)=>this.setState({receiver_id:event.target.value})}/>
          </div>
    
          <div>
            <button className="" onClick={()=>this.acceptCall()}>Accept Call</button>  
            <button className="" onClick={this.rejectCall}>Reject Call</button> 
          </div>
          <div>
            <button className="btn btn-secondary"> Ongoing Call ... </button>
          </div>
          <div>
            <button  onClick={this.startVideoChat} className=""> Start Call </button>
          </div>
        </div>
        <div id="callScreen"></div>
      </div>
    );
  };
}

export default Call;
