import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor(props) {
        console.log("props in bio-editor: ", props);
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit bio..."
        };
        this.submitBio = this.submitBio.bind(this);
        this.toggleEditingMode = this.toggleEditingMode.bind(this);
    }
    // static getDerivedStateFromProps(props) {
    //     if (!props.bio) {
    //         return {
    //             buttonText: "Add your bio"
    //         };
    //     } else {
    //         return {
    //             buttonText: "Edit your bio"
    //         };
    //     }
    // }
    componentDidMount() {
        console.log("componentDidMount bioEditor: ", this.props);
        if (!this.props.bio) {
            console.log("No bio!!!!!");
            this.setState(
                {
                    buttonText: "Add your bio"
                },
                () => console.log("this.state: ", this.state)
            ); //Callback to check setState
        }
        if (this.props.bio) {
            this.setState({
                editingMode: false,
                buttonText: "Edit"
            });
        }
    }
    submitBio() {
        console.log("submitBio is running!");

        axios
            .post("/updatebio", {
                bio: this.state.bio
            })
            .then(({ data }) => {
                console.log("In POST/updatebio");
                console.log("POST/updatebio data: ", data);
                this.setState({
                    editingMode: false,
                    buttonText: "Edit"
                });
            })
            .catch(err => {
                console.log("err in POST/updatebio: ", err);
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
            // bio: e.target.value
        });
    }
    toggleEditingMode() {
        console.log("toggleUploader running!");
        this.setState({
            editingMode: !this.state.editingMode,
            buttonText: "Save"
        });
    }
    render() {
        if (this.state.editingMode) {
            return (
                <div className="">
                    <h4 className="">
                        {this.props.firstname} {this.props.lastname}
                    </h4>
                    <h5>Biography</h5>
                    <p>Edit your bio</p>

                    <textarea
                        className="form-control"
                        defaultValue={this.props.bio}
                        name="bio"
                        onChange={e => this.handleChange(e.target)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            this.submitBio();
                        }}
                    >
                        {this.state.buttonText}
                    </button>
                </div>
            );
        } else {
            return (
                <div className="">
                    <h4 className="">
                        {this.props.firstname} {this.props.lastname}
                    </h4>
                    <h5 className="card-text">Biography</h5>
                    <span className="form-control">{this.props.bio}</span>
                    <div className="">
                        <button
                            className="btn btn-primary"
                            onClick={this.toggleEditingMode}
                        >
                            {this.state.buttonText}
                        </button>
                    </div>
                </div>
            );
        }
    }
}
