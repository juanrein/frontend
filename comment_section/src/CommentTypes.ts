type Image = {
    png: string;
    webp: string;
}

type User = {
    image: Image;
    username: string
}

export type ReplyType = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: User;
}

export type CommentType = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies: ReplyType[];
}


export type PersonData = {
    currentUser: User;
    comments: CommentType[];
}

export type ActiveComment = {
    id: number;
    type: "edit" | "reply"
}

export type CommentMessage = {
    actionType: string;
    commentId: number;
}