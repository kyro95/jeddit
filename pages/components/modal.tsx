interface IModalProps {
    modalId: string;
    child: JSX.Element | JSX.Element[];
}

const Modal = ({
    modalId,
    child
}: IModalProps) => {
    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative space-y-6 flex items-center flex-col">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">
                        <i className="ri-close-line"/>
                    </label>

                    {child}
                </div>
            </div>
        </>
    );
}

export {
    Modal
};