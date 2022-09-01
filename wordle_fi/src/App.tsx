import './App.css';
import Word from './Word';
import replay_logo from "./replay.png";
import help from "./help.png";
import React from 'react';

type AppProps = {
  words: string[];
  firstWordI: number;
};

type AppState = {
  currentWordI: number;
  quesses: string[];
  currentQuess: string;
  status: string;
  showHelp: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      currentWordI: props.firstWordI,
      quesses: [] as string[],
      currentQuess: "",
      status: "playing",
      showHelp: false
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    //one letter
    const alp = /^[a-zåäö]$/;
    if (alp.test(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      if (this.state.currentQuess.length < 5) {
        this.setState(state => ({currentQuess: state.currentQuess + e.key}))
      }
    }
    else if (e.key === "Enter") {
      let isWord = false;
      for (let i =0; i<this.props.words.length; i++) {
        if (this.props.words[i] === this.state.currentQuess) {
          isWord = true;
          break;
        }
      }
      if (this.state.currentQuess.length === 5 && isWord) {
        if (this.state.currentQuess === this.props.words[this.state.currentWordI]) {
          this.setState({status: "won"})
        }
        else if (this.state.quesses.length >= 5) {
          this.setState({status: "lost"})
        }
        else {
          this.setState(state => ({
            quesses: state.quesses.concat(state.currentQuess),
            currentQuess: ""
          }));
        }
      }
    }
    else if (e.key === "Backspace") {
      if (this.state.currentQuess.length > 0) {
        if (e.ctrlKey) {
          this.setState({
            currentQuess: ""
          });
        }
        else {
          this.setState(state => ({
            currentQuess: state.currentQuess.slice(0, state.currentQuess.length-1)
          }));
        }

      }
    }

  }


  handleNewGame = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({
      currentWordI: Math.floor(Math.random() * this.props.words.length),
      quesses: [],
      currentQuess: "",
      status: "playing"
    });
  }

  handleHelp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState(state => ({showHelp: !state.showHelp}));
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  render() {
    let currentWord = this.props.words[this.state.currentWordI];
    return (
      <div>
        <div className='info'>
          <p className='status'>{this.state.status.toUpperCase()}</p>
          <button onClick={this.handleNewGame}>
            <img src={replay_logo} width="20px" height="20px" className='replayButton' alt="replay" />
          </button>
          <div className='correctWord'>
            {this.state.status === "lost" && this.props.words[this.state.currentWordI]}
          </div>
          {!this.state.showHelp && <button onClick={this.handleHelp}>
                <img src={help} width="20px" height="20px" alt="help" />
              </button>}
          {this.state.showHelp && <div>
              <button onClick={this.handleHelp}>
                <img src={help} width="20px" height="20px" alt="help" />
              </button>
              <div>Quess the five letter word with 6 tries</div>
              <div>Correct letter <div className='color correct'></div></div>
              <div>Letter in word but in wrong spot <div className='color wrongSpot'></div></div>
              <div>Letter not in word <div className='color empty'></div></div>
              <div>Press <b>Enter</b> to enter the quess. Only real words are allowed</div>
              <div><b>Backspace</b> removes one letter from quess. </div>
              <div><b>Ctrl + Backspace</b> removes all letters from quess</div>
          </div>}
        </div>
        <table>
          <tbody>
          {this.state.quesses.map((q,i) => (<Word key={i} quess={q} target={currentWord} hideColors={false} />))}
          {<Word 
            key={this.state.quesses.length} 
            quess={this.state.currentQuess} 
            target={currentWord} hideColors={true} 
          />}
          </tbody>
        </table>
      </div>
    );
  }


}

export default App;
