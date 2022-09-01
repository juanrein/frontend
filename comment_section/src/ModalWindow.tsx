type ModalWindowProps = {
    handleClose: (yes: boolean) => void;
};

export function ModalWindow(props: ModalWindowProps) {
    return (
        <div className="modal-background">
            <div className="modal">
                <h1>Delete comment</h1>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <button className="no-button" onClick={e => props.handleClose(false)}>No, cancel</button>
                <button className="yes-button" onClick={e => props.handleClose(true)}>yes delete</button>
            </div>
        </div>
        
    );
}