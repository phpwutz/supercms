import React from 'react';
import Column from './Column';

export default class MillerColumns extends React.Component {

    static defaultProps = {
        treeData: {
            items: []
        },
        getColChildren: (selectionPath, layer) => {
        },
        onSelectItem: () => {
        },
        defaultSelectionPath: [],
        noEntriesLabel: ""
    };

    state = {
        selectionPath: this.props.defaultSelectionPath,
        debug: {},
        scrollIndex: 0,
        columnWidths: [],
        currentScrollIndex: 0
    }

    scrollPrev() {
        this.setState({currentScrollIndex: Math.max(0, this.state.currentScrollIndex - 1)});
    }

    scrollNext() {
        this.setState({currentScrollIndex: Math.min((this.state.selectionPath.length + 1), this.state.currentScrollIndex + 1)});
    }

    render() {
        const handleSelection = (index, layer) => {
            let selection = this.state.selectionPath.slice(0, layer);
            if (this.props.getColChildren(selection, layer).length > 0) {
                selection[layer] = index;
                this.setState({selectionPath: selection, currentScrollIndex: layer + 1});
                this.props.onSelectItem(index, layer);
            }
        };

        const colIndices = this.state.selectionPath.concat([-1]);

        let offset = this.state.columnWidths.slice(0, this.state.currentScrollIndex).map(bounds => {
            return bounds.width;
        }).reduce((prev, cur, curIndex) => {
            return prev + cur;
        }, 0);

        if (offset > 0) {
            offset = offset - 50;
        }


        return <div className={"supercms-millercolumns"} style={{}}>
            {/*{JSON.stringify(this.state.currentScrollIndex)}*/}
            <div className={'controls'}>
                <a href="//" style={{cursor: 'pointer'}} onClick={(e) => {
                    e.preventDefault();
                    this.scrollPrev();
                }}>⇽</a>
                <a href="//" onClick={() => {
                    this.scrollNext();
                }} style={{float: 'right', cursor: 'pointer'}}>⇾</a>

            </div>
            <div className={'scrollwrapper'} style={{
                transform: "translateX(" + -offset + "px)"
            }}>
                {colIndices.map((v, i) => {
                    const columnContent = this.props.getColChildren(this.state.selectionPath, i);
                    return <Column
                        key={i}
                        layer={i}
                        items={columnContent}
                        activeIndex={this.state.selectionPath[i]}
                        onSelectItem={handleSelection}
                        noEntriesLabel={this.props.noEntriesLabel}
                        onResizeItem={(contentRect, layer) => {
                            let newColWidths = this.state.columnWidths;
                            newColWidths[layer] = contentRect.bounds;
                            this.setState({columnWidths: newColWidths})
                        }}
                    />
                })}
            </div>
        </div>
    }
}
