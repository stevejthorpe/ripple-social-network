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
            <div className="uploader">
                <div className="uploader-box">
                    <h4 className="close" onClick={this.props.toggleUploader}>
                        X
                    </h4>

                    <h4>Upload your picture</h4>
                    <div className="uploader-input"></div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.submitImg}>Upload</button>
                </div>
            </div>
        );
    }
}
