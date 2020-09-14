import React from 'react';

const TrackerView = props => {
    const {
        onChange,
        submitEdits,
        selectedTracker,
        editMode,
        editModeToggle,
        updateTrackers,
    } = props;
    const data = [selectedTracker.limit, selectedTracker.fuel, selectedTracker.amount_driven];
    const trackerName = ['limit', 'fuel', 'amount_driven'];
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
                        <button
                            onClick={e => submitEdits(e)}
                            className="submitEditsButton">
                            Submit changes
                        </button>
                        :
                        null
                }
            </div>
            {
                data.map((stat, i) => {
                    const titles = ['Driving Limit', 'Fuel Used', 'Amount Driven'];
                    return (
                        <div key={`${trackerName[i]}Container`} className={`${trackerName[i]}Container`}>
                            <h3 key={`${trackerName[i]}Title`} className={`${stat}Text`}>{titles[i]}</h3>
                            {
                                editMode
                                    ?
                                    <input
                                        name={trackerName[i]}
                                        onChange={e => onChange(e)}
                                        placeholder={`${titles[i]}`}
                                        type="text"
                                        className={`${titles[i]}EditInput`}
                                        value={updateTrackers[trackerName[i]]}
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