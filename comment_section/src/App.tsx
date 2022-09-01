import React, { useState } from 'react';
import './App.css';
import CommentAndReplies from "./CommentAndReplies"
import { ActiveComment, CommentMessage, CommentType, PersonData } from "./CommentTypes";
import { ModalWindow } from './ModalWindow';
import TextInput from './TextInput';

type AppProps = {
    data: PersonData;
}


function App(props: AppProps) {
    let [activeComments, setActiveComments] = useState<ActiveComment[]>([]);
    let commentsClone = JSON.parse(JSON.stringify(props.data.comments));
    let [comments, setComments] = useState<CommentType[]>(commentsClone);
    let [activeDeleteId, setActiveDeleteId] = useState<number>(-1);

    function findCommentIndex(id: number) {
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === id) {
                return [i,-1] 
            }
            for (let j = 0; j < comments[i].replies.length; j++) {
                if (comments[i].replies[j].id === id) {
                    return [i,j];
                }
            }            
        }
        return [-1, -1];
    }

    function commentsCopy(): CommentType[] {
        return JSON.parse(JSON.stringify(comments));
    }

    function activeCommentsCopy(): ActiveComment[] {
        return JSON.parse(JSON.stringify(activeComments));
    }

    function handleCommentSend(commentText: string, replyId: number | null) {
        let maxId = 
            comments
            .flatMap((v) => [v.id, ...v.replies.map(r => r.id)])
            .reduce((p,c) => Math.max(p,c))

        let newComment: CommentType = {
            content: commentText,
            createdAt: "just now",
            id: maxId + 1,
            replies: [],
            score: 0,
            user: props.data.currentUser
        }

        if (replyId === null) {//top level
            setComments(comments.concat(newComment));
        }
        else {
            let [ci, ri] = findCommentIndex(replyId)

            let copyC = commentsCopy();

            //top level reply
            if (ci !== -1 && ri === -1) {
                let replyingTo = comments[ci].user.username;
                let reply = {
                    content: commentText,
                    createdAt: "just now",
                    id: maxId + 1,
                    score: 0,
                    user: props.data.currentUser,
                    replyingTo: replyingTo
                }
                copyC[ci].replies.push(reply);
            }
            else {
                let replyingTo = comments[ci].replies[ri].user.username
                let reply = {
                    content: commentText,
                    createdAt: "just now",
                    id: maxId + 1,
                    score: 0,
                    user: props.data.currentUser,
                    replyingTo: replyingTo
                }
                copyC[ci].replies.splice(ri + 1, 0, reply);
            }

            setComments(copyC);

            let activeCommentsCopy = activeComments.slice();
            let removeId = activeCommentsCopy.findIndex(c => c.id === replyId);
            activeCommentsCopy.splice(removeId, 1);

            setActiveComments(activeCommentsCopy);

        }
    }

    function handleCommentEdit(commentText: string, replyId: number) {
        let [ci, ri] = findCommentIndex(replyId);
        let copy = commentsCopy();
        if (ri === -1) {
            copy[ci].content = commentText;
        }
        else {
            copy[ci].replies[ri].content = commentText;
        }
        setComments(copy);

        let acc = activeCommentsCopy()
        let removeId = acc.findIndex(c => c.id === replyId);
        acc.splice(removeId, 1);

        setActiveComments(acc);

    }

    function handleCommentDelete(yes: boolean) {
        if (!yes) {
            setActiveDeleteId(-1);
            return;
        }
        let [ci, ri] = findCommentIndex(activeDeleteId);
        let copy = commentsCopy();

        if (ri === -1) {
            copy.splice(ci, 1);
        }
        else {
            copy[ci].replies.splice(ri, 1);
            setComments(copy);
        }
        setComments(copy);
        setActiveDeleteId(-1);
    }

    function handleActionPress(commentMessage: CommentMessage) {
        let { actionType, commentId } = commentMessage

        let [ci, ri] = findCommentIndex(commentId);
        let copy = commentsCopy();

        switch (actionType) {
            case "delete":
                setActiveDeleteId(commentMessage.commentId);
                break;
            case "edit":
                if (!activeComments.some(ac => ac.id === commentId)) {
                    setActiveComments(activeComments.concat({ id: commentId, type: "edit" }));
                }
                else {
                    let ri = activeComments.findIndex(v => v.id === commentId);
                    setActiveComments([...activeComments.slice(0, ri), ...activeComments.slice(ri + 1)])
                }
                break;
            case "reply":
                if (!activeComments.some(ac => ac.id === commentId)) {
                    setActiveComments(activeComments.concat({ id: commentId, type: "reply" }));
                }
                else { //hide edit box
                    let ri = activeComments.findIndex(v => v.id === commentId);
                    setActiveComments([...activeComments.slice(0, ri), ...activeComments.slice(ri + 1)])
                }
                break;
            case "plus":
                if (ri === -1) {
                    copy[ci].score = copy[ci].score + 1;
                    setComments(copy);
                }
                else {
                    copy[ci].replies[ri].score = copy[ci].replies[ri].score + 1;
                    setComments(copy);
                }
                break;
            case "minus":
                if (ri === -1) {
                    copy[ci].score = copy[ci].score - 1;
                    setComments(copy);
                }
                else {
                    copy[ci].replies[ri].score = copy[ci].replies[ri].score - 1;
                    setComments(copy);
                }
                break;
            default:
                console.error(actionType)
                break;
        }

    }

    let commentsElements = comments.map(c => {
        return (<div>
            <CommentAndReplies key={c.id}
                currentUserUsername={props.data.currentUser.username}
                currentUserImage={props.data.currentUser.image.png}
                username={c.user.username}
                content={c.content}
                score={c.score}
                image={c.user.image.png}
                createdAt={c.createdAt}
                replies={c.replies}
                handleActionPress={handleActionPress}
                commentId={c.id}
                activeComments={activeComments}
                handleCommentSend={handleCommentSend}
                handleCommentEdit={handleCommentEdit}
            />
        </div>);
    }
    );

    return (
        <div className="App">
            {activeDeleteId !== -1 && <ModalWindow handleClose={handleCommentDelete} />}
            <div>
                {commentsElements}
            </div>
            <TextInput
                showImage={true}
                buttonText='Send'
                image={props.data.currentUser.image.png}
                handleCommentSend={handleCommentSend}
                handleCommentEdit={handleCommentEdit}
                isReply={false}
                replyTarget={""}
                replyTargetId={null}
            />

        </div>
    );
}

export default App;
