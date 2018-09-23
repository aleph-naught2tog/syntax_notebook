import * as React from 'react';
import { renderMany } from './RenderMany';

const style = `
  textarea[readonly] {
    border: 2px solid blue;
  }
`;

class ReadWriteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "read"
    };
  }

  makeReadable = event => {
    this.props.updateData(event.target.value);

    this.setState({
      status: 'read'
    });

  };

  handleKeyup = event => {
    switch (event.key) {
      case "Enter":
        this.makeReadable(event);
        break;
      default:
        break;
    }
  };

  makeWritable = () => {
    this.setState({
      status: 'write'
    });
  };

  view = ({status}) => {
    if (status === "read") {
      return (
        <span onClick={this.makeWritable}>
          {this.props.datum}
        </span>
      );
    } else {
      return (
        <input type="text"
               onBlur={this.makeReadable}
               onKeyUp={this.handleKeyup}
               defaultValue={this.props.datum}
        />
      );
    }
  };

  render() {
    if (this.props.wrapper) {
      return (
        <this.props.wrapper>
          {this.view(this.state)}
        </this.props.wrapper>
      );
    } else {
      return this.view(this.state);
    }
  }
}
const Div = props => {
  console.log(props);
  return (
    <props.assigns.wrapper>
      <div>
        {props.children}
      </div>
    </props.assigns.wrapper>
  );
};
const Headers = ({data, _updateData}) => {
  return (
    <thead>
    <tr>{renderMany(Div, ['yellow'], {wrapper: 'th', defaultState: 'read'})}</tr>
    <tr>{renderMany(Div, ['beige', 'teal'], {wrapper: 'th', defaultState: 'read'})}</tr>
    <tr>{renderMany(ReadWriteInput, data, {wrapper: 'th', defaultState: 'read'})}</tr>
      {/*<tr>*/}
        {/*{data.map((datum, _index) => {*/}
          {/*return (*/}
            {/*<ReadWriteInput*/}
              {/*wrapper={'th'}*/}
              {/*datum={datum}*/}
              {/*defaultState="read"*/}
            {/*/>*/}
          {/*)*/}
        {/*})}*/}
      {/*</tr>*/}
    </thead>
  );
};

const Rows = ({data}) => {
  return data.map((cells) => {
    return (
      <tbody>
      <tr>
        {cells.map((datum) => {
          return (
            <td>
              <ReadWriteInput
                datum={datum}
                defaultState="read"
              />
            </td>
          );
        })}
      </tr>
      </tbody>
    );
  });
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      rows: []
    };
  }

  render() {
    const {data, stripes} = this.props;
    const [headers, ...rows] = data;
    return (
      <table className={`table${stripes && ' table-striped'}`}>
        <Headers
          data={headers}
        />
        <Rows
          data={rows}
        />
      </table>
    );
  }
}

class PageApp extends React.Component {
  constructor(props) {
    super(props);
    const defaultData = [
      ["apple", "orange"]
    ];
    this.state = {
      input: defaultData.map(row => row.join(",")).join("\n"),
      data: defaultData
    };
  }

  handleKeyUp = event => {
    const newInput = event.target.value;
    const [headers, ...rows] = newInput.split("\n");
    this.setState({
      input: newInput,
      data: [
        headers.split(","),
        ...rows.map(row => row.split(","))
      ]
    });
  };

  updateData = (row, cell) => event => {
    const data = [...this.state.data];
    data[row][cell] = event.target.value;
    this.setState({
      data: data
    });
  };

  makeWritable = event => {
    event.target.readOnly = false;
  };

  makeReadable = event => {
    event.target.readOnly = true;
  };

  render() {
    return (
      <section>
        <style>{style}</style>
        <div>
          <Table
            data={this.state.data}
            updateData={this.updateData}
          />
        </div>
        <div>
            <textarea
              className="form-control"
              onKeyUp={this.handleKeyUp}
              onFocus={this.makeWritable}
              onBlur={this.makeReadable}
              defaultValue={this.state.input}
            />
        </div>
      </section>
    );
  }
}

export default PageApp;