import CommentCard from "./CommentCard"


const CommentList = (props) => {
    const {comments} = props

    return (      
      <div className="comment-list">
      <h3>Comments</h3>
        {comments.map((comment) => {
          return (  
            <CommentCard key={comment.comment_id} comment={comment}/>
          )
        })}
      </div>
    )
}   


export default CommentList  