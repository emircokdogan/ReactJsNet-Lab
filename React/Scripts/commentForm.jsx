
var CommentForm = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();

        if (!author || !text)
            return;

        this.props.onCommentSubmit({ Author: author, Text: text });

        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
    },

    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your Name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" placeholder="Post" />
            </form>
        );
    }
});