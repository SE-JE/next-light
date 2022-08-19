const IcomoonComponent = ({ icon, color, size, className }) => {

    return (
        <div className={className}>
            <i className={`icon-moon icon-${icon} ${size ? "text-" + size : "text-2xl"}`}>
                <span className={`path1 ${color ? "text__" + color : ""}`}></span>
                <span className={`path2 ${color ? "text__" + color : ""}`}></span>
                <span className={`path3 ${color ? "text__" + color : ""}`}></span>
                <span className={`path4 ${color ? "text__" + color : ""}`}></span>
                <span className={`path5 ${color ? "text__" + color : ""}`}></span>
                <span className={`path6 ${color ? "text__" + color : ""}`}></span>
                <span className={`path7 ${color ? "text__" + color : ""}`}></span>
                <span className={`path8 ${color ? "text__" + color : ""}`}></span>
            </i>
        </div>
    )


};

export default IcomoonComponent;