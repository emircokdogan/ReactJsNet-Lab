
var CommentList = React.createClass({
    render: function () {
        var i = 0;
        var commentNodes = this.props.data.map(function (comment) {
            comment.Key = i++;
            return (
               <Comment key={comment.Key} author={comment.Author}>
                   {comment.Text}
               </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
