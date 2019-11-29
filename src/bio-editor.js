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
                <div>
                    <h1>I am in editing mode</h1>
                    <textarea
                        defaultValue={this.props.bio}
                        name="bio"
                        onChange={e => this.handleChange(e.target)}
                    />
                    <button
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
                <div>
                    <h1>I am the BioEditor component</h1>
                    <p>{this.props.bio}</p>
                    <button onClick={this.toggleEditingMode}>
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}
