var json = null;

document.addEventListener('DOMContentLoaded', function(){
	let req = new XMLHttpRequest();
	req.open("GET", "/getcomments", true);
	req.send();
	req.onload = function(){
		json = JSON.parse(req.responseText);
		console.log(JSON.stringify(json));
		ReactDOM.render(<CommentStream/>, document.getElementById('commentstream'));
	}
});

class CommentStream extends React.Component{
	constructor(props){
		super(props);
		this.state = {comments: json};
		this.handleDelete = this.handleDelete.bind(this);
		this.handlePost = this.handlePost.bind(this);
	}
	handlePost(event){
		//let req = new XMLHttpRequest();
		//req.open("POST","/postcomment",true);
		//req.setRequestHeader('Content-Type','application/json');
		//req.send(JSON.stringify({comment: "placeholder"}));
	}
	handleDelete(event){
		let commentId = event.target.parentNode.id;
		let req = new XMLHttpRequest();
		req.open("POST","/deletecomment",true);
		req.setRequestHeader('Content-Type','application/json');
		//req.onreadystatechange=function(){
		//  if(req.readyState==4 && req.status==200){
		//    document.getElementsByClassName('message')[0].innerHTML=req.responseText;
		//  }
		//};
		let sendCommentId = JSON.stringify({comment_id: commentId});
		req.send(sendCommentId);
		this.setState({comments: this.state.comments.filter( (val) => {return (val.commentid != commentId);} ) });
	}
	render(){
		let commentList = this.state.comments.map((value, index) => {return(<div id = {value.commentid} key = {index}><p>{value.comment}</p> <button onClick = {this.handleDelete}>Delete</button></div>)});
		return (<div>
					<form onSubmit = {this.handlePost} method = "POST" action = "">
						<textarea rows="3" cols="50" >
		  				</textarea>
		  				<button type = "submit">Submit</button>
		  			</form>
						{commentList}
				</div>);
	}
}