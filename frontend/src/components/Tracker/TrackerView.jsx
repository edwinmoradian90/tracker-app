import React from 'react';

const TrackerView = props => {
    const { selectedTracker, editMode, editModeToggle } = props;
    const data = [selectedTracker.limit, selectedTracker.fuel, selectedTracker.amount_driven];
    return (
        <div className="trackerView">
            <div className="editModeButtons">
                <button onClick={editModeToggle} className="editModeButton">
                    {
                        editMode
                            ?
                            "Go back"
                            :
                            "Edit"
                    }
                </button>
                {
                    editMode
                        ?
                        <button className="submitEditsButton">Submit changes</button>
                        :
                        null
                }
            </div>
            {
                data.map((stat, i) => {
                    const titles = ['Driving Limit', 'Fuel Used', 'Amount Driven'];
                    return (
                        <div key={`${stat}Container`} className={`${stat}Container`}>
                            <h3 className={`${stat}Text`}>{titles[i]}</h3>
                            {
                                editMode
                                    ?
                                    <input
                                        placeholder={`${titles[i]}`}
                                        type="text"
                                        className={`${stat}EditInput`}
                                    />
                                    :
                                    <p className={`${stat}Value`}>{stat}</p>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default TrackerView;