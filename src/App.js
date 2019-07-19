import React from 'react';
import MillerColumns from './Components/MillerColumns/MillerColumns'

import './App.less';

const treeData = {
    items: [
        {
            id: 33,
            label: "0000 Item Label",
            items: [
                {
                    id: 1,
                    label: "0001 Level 2 Label 1",
                    items: [
                        {
                            id: 2,
                            label: "000101 Level 3 Label 1",
                            items: [
                                {
                                    id: 12,
                                    label: "Level 4 GOGO",
                                    items: [
                                        {
                                            id: 13,
                                            label: "Level 5 OMG",
                                            items: []
                                        }
                                    ]
                                }
                            ],
                        },
                        {
                            id: 3,
                            label: "000102 Level 3 Label 2",
                            items: [],
                        },
                        {
                            id: 4,
                            label: "000103 Level 3 Label 3",
                            items: [],
                        },
                    ],
                },
                {
                    id: 5,
                    label: "0002 Level 2 Label 2"
                },
                {
                    id: 6,
                    label: "0003 Level 2 Label 3"
                },
                {
                    id: 26,
                    label: "0004 Level 2 Label 4"
                }
            ]
        },
        {
            id: 7,
            label: "0001 Item Label",
            items: [
                {
                    id: 8,
                    label: "000100"
                },
                {
                    id: 9,
                    label: "000101"
                },
            ]
        }
    ]
};

function App() {
    return (
        <div className="App">
            <h2>Miller-Columns</h2>

            <MillerColumns
                defaultSelectionPath={[]}
                getColChildren={
                    (selectionPath, layer) => {
                        let tmp = treeData;

                        for (let i = 0; i < layer; i++) {
                            tmp = tmp.items[selectionPath[i]];
                        }

                        return tmp.items;
                    }}
                noEntriesLabel={"No content here"}
            >
            </MillerColumns>
        </div>
    );
}

export default App;
