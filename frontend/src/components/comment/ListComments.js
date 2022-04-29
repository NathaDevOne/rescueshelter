import React from 'react'

const ListComments = ({ comments }) => {
    return (
        <div className="comments">
            <hr />
            <h5><strong>Comments</strong></h5>
            {/*<hr />*/}
            {comments && comments.map(comment => (
                <div key={comment._id} className="comment-card my-3">
                    <p className="review_user">by: {comment.name} on: {String(comment.createdAt).substring(0, 10)}</p>
                    <p className="review_comment">{comment.text}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListComments