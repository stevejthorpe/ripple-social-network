import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        console.log("props | Uploader: ", props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submitImg = this.submitImg.bind(this);
        // this.toggleUploader = this.toggleUploader.bind(this);
        console.log("uploader props: ", props);
    }
    handleChange(e) {
        console.log(
            "handleChange running | e.target.files[0]: ",
            e.target.files[0]
        );
        this.setState({
            file: e.target.files[0]
        });
    }
    async submitImg() {
        console.log("submitImg running");
        let fd = new FormData();
        fd.append("file", this.state.file);
        try {
            const { data } = await axios.post("/upload", fd);
            console.log("ImageUrl: ", data.imageUrl);
            this.props.updateImg(data.imageUrl);
        } catch (err) {
            console.log("err in upload axios post: ", err);
            this.setState({
                error: true
            });
        }
    }
    render() {
        return (
            <div className="uploader" tabIndex="-1" role="dialog">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload your picture</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.toggleUploader}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={this.handleChange}
                                className="btn btn-secondary"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.submitImg}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
