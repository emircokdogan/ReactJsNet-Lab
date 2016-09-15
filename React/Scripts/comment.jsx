

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
