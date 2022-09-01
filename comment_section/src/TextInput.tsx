import { FormEvent, useState } from "react";

type TextInputProps = {
    handleCommentSend: (s: string, id: number | null) => void;
    handleCommentEdit: (s: string, id: number) => void;
    image: string;
    buttonText: string;
    isReply: boolean;
    replyTarget: string;
    replyTargetId: number | null;
    showImage: boolean;
    children?: string;
}

export default function TextInput(props: TextInputProps) {
    let isEdit = false;
    let areaDefValue = "";
    if (props.children) {
        areaDefValue = props.children;
        isEdit = true;
    } 
    else if (props.isReply) {
        areaDefValue = "@" + props.replyTarget + " ";
    } 
    else {
        areaDefValue = "";
    }

    let [commentText, setCommentText] = useState(areaDefValue);

    function handleCommentTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCommentText(e.target.value);
    }
    
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setCommentText("");
        if (isEdit) {
            props.handleCommentEdit(commentText, props.replyTargetId || 0);
        }
        else if (commentText.startsWith(areaDefValue) && !isEdit) {
            props.handleCommentSend(commentText.slice(areaDefValue.length), props.replyTargetId);
        }
        else {
            props.handleCommentSend(commentText, props.replyTargetId);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {props.showImage && <img src={props.image} alt="" />}
            <textarea
                value={commentText}
                rows={3}
                onChange={handleCommentTextChange}
                placeholder="Add a comment..."></textarea>
            <input type="submit" value={props.buttonText} />
        </form>
    );
}
