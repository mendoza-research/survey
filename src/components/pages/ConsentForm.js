import React, { Component } from "react";
import PageNavigation from "../common/PageNavigation";
import SurveyContext from "../../context/SurveyContext";

class ConsentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startTime: null,
            endTime: null,
            duration: null
        };

        this.saveResults = this.saveResults.bind(this);
    }

    componentDidMount() {
        this.setState({
            startTime: new Date()
        });
    }

    async saveResults() {
        const endTime = new Date();
        const duration = (endTime - this.state.startTime) / 1000;

        return new Promise((resolve, reject) => {
            this.setState(
                {
                    startTime: this.state.startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    duration
                },
                async () => {
                    await this.context.addUserResponse(
                        "consent-form",
                        this.state
                    );
                    resolve();
                }
            );
        });
    }

    render() {
        return (
            <div id="consent-form-page">
                <h2>Exempt Information Sheet</h2>
                <h3 className="align-center">Decision-Making Study</h3>
                <p>
                    You are being asked to participate in a research study being
                    done by Daniel Zhou at the University of Illinois at
                    Urbana-Champaign. Your participation in this research is
                    voluntary. If you decide to participate, you are free to
                    withdraw at any time.
                </p>

                <p>
                    The purpose of this study is to study how people make
                    judgment and decisions when provided with different types of
                    guidance. Participating in this research study will include
                    completing two short tasks that involve making decisions
                    related to a hypothetical school task and an alphabet
                    counting task. You will also answer several questions about
                    the tasks. The study will take about 20 – 30 minutes to
                    complete.
                </p>

                <p>
                    Faculty, students, and staff who may see your information
                    will maintain confidentiality to the extent of federal and
                    state laws and university policies. Personal identifiers
                    will not be published or presented.
                </p>

                <p>
                    If you have any questions about the research study, please
                    contact Daniel Zhou at{" "}
                    <a href="mailto:Zhou121@illinois.edu">
                        Zhou121@illinois.edu
                    </a>
                    . If you have questions or concerns about your rights as a
                    participant please contact the University of Illinois at
                    Urbana-Champaign Office for the Protection of Research
                    Subjects at 217-333-2670 or via email at{" "}
                    <a href="mailto:irb@illinois.edu">irb@illinois.edu</a>.
                </p>

                <PageNavigation
                    beforeNavigate={this.saveResults}
                    to="/task/1/instructions"
                />
            </div>
        );
    }
}

ConsentForm.contextType = SurveyContext;

export default ConsentForm;
