var json = null;

function toggleCommentGrow(isGrow){
	let postComment = document.getElementById("postComment");
	if(isGrow){
		postComment.classList.remove('shrink-post-comment');
		postComment.classList.add('grow-post-comment');
	}
	else{
		postComment.classList.remove('grow-post-comment');
		postComment.classList.add('shrink-post-comment');
	}
}

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
		event.preventDefault();
		let commentValue = event.target[0].value;
		//send comment you want to post to the server
		let req = new XMLHttpRequest();
		req.open("POST","/postcomment",true);
		req.setRequestHeader('Content-Type','application/json');
		req.send(JSON.stringify({comment: commentValue}));
		req.onload = function(){
			let commentList = this.state.comments;
			console.log(req.responseText);
			let comment_id = JSON.parse(req.responseText).comment_id;
			commentList.unshift({comment: commentValue, commentid: comment_id});
			this.setState({comments: commentList});
		}.bind(this);
	}
	handleDelete(event){
		let commentId = event.target.parentNode.id;
		let req = new XMLHttpRequest();
		req.open("POST","/deletecomment",true);
		req.setRequestHeader('Content-Type','application/json');
		let sendCommentId = JSON.stringify({comment_id: commentId});
		req.send(sendCommentId);
		this.setState({comments: this.state.comments.filter( (val) => {return (val.commentid != commentId);} ) });
	}
	render(){
		let commentList = this.state.comments.map((value, index) => {return(<div id = {value.commentid} key = {index}><p>{value.comment}</p> <button onClick = {this.handleDelete}>Delete</button></div>)});
		return (<div>
					<div className = "container">
						<form onSubmit = {this.handlePost}>
							<div className = "row mb-2">
								<div className = "col">
									<textarea id = "postComment" className = "form-control comment-input" onClick = {() => {toggleCommentGrow(true);}} onBlur = {() => {toggleCommentGrow(false);}}>
			  						</textarea>
			  					</div>
			  				</div>
			  				<div className = "row mb-2">
			  					<div className = "col">
			  						<button type = "submit" className = "btn btn-outline-success">Submit</button>
			  					</div>
			  					<div className = "col">
			  						<button type = "submit" className = "btn btn-outline-success">Submit</button>
			  					</div>
			  				</div>
			  			</form>
			  		</div>
						{commentList}
				</div>);
	}
}

