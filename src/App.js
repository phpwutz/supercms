import React from 'react';

import './App.css';

class Column extends React.Component {
    static defaultProps = {
        layer: 0,
        activeIndex: null,
        items: [],
        onSelectItem: () => {
        }
    }

    render() {
        return <div className={"column"}>
            {this.props.items.map &&
            <ul>
                {this.props.items.map((i, index) => {
                    return <li key={i.id}
                               className={this.props.activeIndex === index ? 'active' : ''}
                               onClick={() => this.props.onSelectItem(index, this.props.layer)}>{i.label} ({i.items ? i.items.length : 0})</li>
                })}
            </ul>
            }
        </div>
    }
}

class MillerColumns extends React.Component {

    static defaultProps = {
        treeData: {
            items: []
        }
    };

    state = {
        selectionPath: [],
        // selectionPath: [0,0,0,0],
        debug: {}
    }

    render() {
        const getColChildren = (selectionPath, layer) => {
            let tmp = this.props.treeData;
            for (let i = 0; i < selectionPath.length; i++) {
                if (i == layer) {
                    return tmp.items || [];
                }
                // if(!tmp.items){
                //     return [];
                // }
                tmp = tmp.items[selectionPath[i]];
            }
            return tmp.items || [];
        };

        const handleSelection = (index, layer) => {
            let selection = this.state.selectionPath;
            selection[layer] = index;

            for(let i = 0; i < selection.length; i++){
                if(i > layer){
                    delete selection[i];
                }
            }
            this.setState({
                selectionPath: selection, debug: {
                    index, layer
                }
            });
        };

        return <div className={"supercms-millercolumns"} style={{
            height: "300px",
            width: "800px",
            display: "flex",
            flexDirection: "row"
        }}>
            <Column layer={0}
                    items={this.props.treeData.items}
                    onSelectItem={handleSelection}
                    activeIndex={this.state.selectionPath[0]}
            />
            {this.state.selectionPath.map((v, i) => {
                const columnContent = getColChildren(this.state.selectionPath, i + 1);
                return <Column
                    key={i}
                    layer={i + 1}
                    items={columnContent}
                    activeIndex={this.state.selectionPath[i+1]}
                    onSelectItem={handleSelection}
                />;
            })}
        </div>
    }
}

const treeData = {
    items: [
        {
            id: 0,
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
                                    label: "Level 4 GOGO",
                                    items: [
                                        {
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
            <header className="App-header">
                <h2>Miller-Columns</h2>

                <MillerColumns treeData={treeData}>
                </MillerColumns>
            </header>
        </div>
    );
}

export default App;
