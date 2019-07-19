import React from 'react';
import Measure from 'react-measure';

export default class Column extends React.Component {
    static defaultProps = {
        layer: 0,
        activeIndex: -1,
        items: [],
        onSelectItem: () => {
        },
        onResizeItem: () => {
        },
        noEntriesLabel: "No Entries"
    }

    state = {
        contentRect: {},
        bounds: {
            top: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
        }
    }

    render() {
        return <Measure
            bounds
            onResize={contentRect => {
                this.props.onResizeItem(contentRect, this.props.layer);
                this.setState({
                    bounds: contentRect.bounds
                });
            }}
        >
            {({measureRef}) => (
                <div ref={measureRef} className={"column"}>
                    {
                        this.props.items.length === 0 && this.props.noEntriesLabel
                    }
                    <ul>
                        {this.props.items.map((i, index) => {
                            return <li key={index}
                                       className={this.props.activeIndex === index ? 'active' : ''}
                                       onClick={() => this.props.onSelectItem(index, this.props.layer)}>{i.label} ({i.items ? i.items.length : 0})</li>
                        })}
                    </ul>
                </div>
            )}
        </Measure>
    }
}
