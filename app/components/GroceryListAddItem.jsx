var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    getInitialState: function() {
        return {input:""};  
    },
    handleInputName: function(e) {
        this.setState({input: e.target.value});
    },
    addItem: function(e) {
        e.preventDefault();
        console.log("Adding item!", this.state.input);
    },
    render: function() {
        return (
            <div className='grocery-addItem'>
                <form onSubmit={this.addItem}>
                    <input value={this.state.input} onChange={this.handleInputName} />
                    <button> Add Item </button>
                </form>
            </div>
        )
    }
})