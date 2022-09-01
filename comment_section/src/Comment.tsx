import iconMinus from "./images/icon-minus.svg";
import iconPlus from "./images/icon-plus.svg";
import iconReply from "./images/icon-reply.svg";
import iconDelete from "./images/icon-delete.svg";
import iconEdit from "./images/icon-edit.svg";
import TextInput from "./TextInput";
import { ActiveComment } from "./CommentTypes";

type CommentScoreProps = {
    score: number;
    handleActionPress: (s: string) => void;
}

type CommentInfoProps = {
    image: string;
    username: string;
    isCurrentUser: boolean;
    createdAt: string;
}

type ActionButtonsProps = {
    isCurrentUser: boolean;
    handleActionPress: (s: string) => void;
}

type CommentProps = {
    isReply: boolean;
    username: string;
    currentUserUsername: string;
    content: string;
    score: number;
    image: string;
    createdAt: string;
    handleActionPress: (actiontype: string) => void;
    handleCommentSend: (s: string, n: number | null) => void
    handleCommentEdit: (s: string, n: number) => void
    textArea?: ActiveComment;
    currentUserImage: string;
    replyTargetId: number;
    replyTo: string;
}

function CommentScore(props: CommentScoreProps) {
    return (
        <div className='comment-score-container'>
            <img onClick={e => props.handleActionPress("plus")} className="icon-plus" src={iconPlus} alt="" />
            <p className="score">{props.score}</p>
            <img onClick={e => props.handleActionPress("minus")} className="icon-minus" src={iconMinus} alt="" />
        </div>
    )
}



function CommentInfo(props: CommentInfoProps) {
    return (<div className='comment-info-left'>
        <img src={props.image} alt="" />
        <p>{props.username}</p>
        {props.isCurrentUser && <p className='you'>You</p>}
        <p>{props.createdAt}</p>
    </div>)
}



function ActionButtons(props: ActionButtonsProps) {
    if (props.isCurrentUser) {
        return (
            <div className='icons'>
                <button className='action-button' onClick={e => props.handleActionPress("delete")}><img src={iconDelete} alt="" /><span>Delete</span></button>
                <button className='action-button' onClick={e => props.handleActionPress("edit")}><img src={iconEdit} alt="" /><span>Edit</span></button>
            </div>
        )
    }
    return (
        <div>
            <button 
            className='action-button' 
            onClick={e => props.handleActionPress("reply")}>
                <img src={iconReply} alt="" /><span>Reply</span>
            </button>
        </div>
    )
}




function Comment(props: CommentProps) {
    let {
        isReply,
        username,
        replyTargetId,
        currentUserUsername,
        currentUserImage,
        content,
        score,
        image,
        createdAt,
        replyTo
    } = props;

    let contentElement;
    if (props.textArea && props.textArea.type === "edit") {
        contentElement = <TextInput 
            buttonText="Update"
            handleCommentSend={props.handleCommentSend}
            handleCommentEdit={props.handleCommentEdit}
            image={""}
            isReply={isReply}
            replyTarget={username}
            replyTargetId={replyTargetId}
            showImage={false}
        >
            {content}
        </TextInput>
    }
    else if (isReply) {
        contentElement = <p><b>@{replyTo}</b> {content}</p>
    }
    else {
        contentElement = <p>{content}</p>
    }

    let isCurrentUser = username === currentUserUsername;

    let textareaElement;
    if (props.textArea && props.textArea.type === "reply") {
        textareaElement = <TextInput
            showImage={true}   
            buttonText="Reply"
            handleCommentSend={props.handleCommentSend}
            handleCommentEdit={props.handleCommentEdit}
            image={currentUserImage}
            isReply={isReply}
            replyTarget={username}
            replyTargetId={replyTargetId}
        />
    }
    else {
        textareaElement = "";
    }

    return (
        <div className="comment-and-textarea">
            <div className='comment-container'>
                <CommentScore score={score} handleActionPress={props.handleActionPress} />

                <div className='comment-content-container'>

                    <div className='comment-info'>
                        <CommentInfo
                            image={image}
                            username={username}
                            createdAt={createdAt}
                            isCurrentUser={isCurrentUser}
                        />

                        <ActionButtons
                            isCurrentUser={isCurrentUser}
                            handleActionPress={props.handleActionPress}
                        />
                    </div>
                    {contentElement}
                </div>
            </div>
            <div>
                {textareaElement}

            </div>
        </div>

    );
}

export default Comment;