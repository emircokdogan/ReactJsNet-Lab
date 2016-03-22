var CommentBox = React.createClass({

    getInitialState: function () {
        return { data: this.props.initialData };
    },

    loadCommentsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },

    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        var data = new FormData();
        data.append('Author', comment.Author);
        data.append('Text', comment.Text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    },

    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

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

var Comment = React.createClass({
    render: function () {
        var converter = new Showdown.converter();
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment" key="{this.props.key}">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

//ReactDOM.render(
//    <CommentBox url="/Home/Comments" submitUrl="/Home/AddComment" pollInterval={2000} />,
//    document.getElementById('content')
//);
