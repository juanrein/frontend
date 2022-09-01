import Comment from "./Comment";
import { ActiveComment, CommentMessage, ReplyType } from "./CommentTypes";


type CommentAndRepliesProps = {
    currentUserUsername: string;
    username: string;
    content: string;
    score: number;
    image: string;
    createdAt: string;
    replies: ReplyType[];
    handleActionPress: (message: CommentMessage) => void;
    commentId: number;
    activeComments: ActiveComment[];
    currentUserImage: string;
    handleCommentSend: (s: string, n: number | null) => void;
    handleCommentEdit: (s: string, n: number) => void;
}

function CommentAndReplies(props: CommentAndRepliesProps) {
    let { currentUserUsername, currentUserImage, username, content,
        score, image, createdAt, replies, handleCommentSend, commentId,
        activeComments, handleActionPress, handleCommentEdit } = props;

    let repliesElement;
    if (props.replies.length > 0) {
        repliesElement = <div className='replies-container'>
            <div className='replies-indent'></div>
            <div className='replies'>
                {replies.map(r => {
                    return (<Comment
                        replyTo={r.replyingTo}
                        currentUserImage={currentUserImage}
                        textArea={activeComments.find(ac => ac.id === r.id)}
                        isReply={true}
                        username={r.user.username}
                        replyTargetId={r.id}
                        currentUserUsername={currentUserUsername}
                        content={r.content}
                        score={r.score}
                        image={r.user.image.png}
                        createdAt={r.createdAt}
                        key={r.createdAt + r.user.username}
                        handleActionPress={(s: string) => handleActionPress({actionType: s, commentId: r.id})}
                        handleCommentSend={handleCommentSend}
                        handleCommentEdit={handleCommentEdit}
                    />)
                })}
            </div>

        </div>
    }
    else {
        repliesElement = "";
    }

    return (
        <div className='comment-replies-container'>
            <Comment
                replyTo={""}
                replyTargetId={commentId}
                textArea={activeComments.find(ac => ac.id === commentId)}
                isReply={false}
                currentUserImage={currentUserImage}
                currentUserUsername={currentUserUsername}
                username={username}
                content={content}
                score={score}
                image={image}
                createdAt={createdAt}
                handleActionPress={(s) => handleActionPress({actionType:s, commentId:commentId})}
                handleCommentSend={handleCommentSend}
                handleCommentEdit={handleCommentEdit}
            />

            {repliesElement}

        </div>
    );
}

export default CommentAndReplies;