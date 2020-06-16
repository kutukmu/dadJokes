import React, { Component } from "react";
import Item from "./Item";
import axios from "axios";
import "./Jokes.css";
class Jokes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jokes: JSON.parse(localStorage.getItem("Storage") || "[]"),
      isLoaded: false
    };
    this.seen = new Set(this.state.jokes.map(n => n.joke));

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
  }

  upVote(id) {
    this.setState(
      prev => {
        return {
          jokes: prev.jokes.map((n, idx) => {
            if (idx === id) {
              return { ...n, total: n.total + 1 };
            } else {
              return n;
            }
          })
        };
      },
      () =>
        window.localStorage.setItem("Storage", JSON.stringify(this.state.jokes))
    );
  }
  downVote(id) {
    this.setState(
      prev => {
        console.log("setstate");
        return {
          jokes: prev.jokes.map((n, idx) => {
            if (idx === id) {
              return { ...n, total: n.total - 1 };
            } else {
              return n;
            }
          })
        };
      },
      () =>
        window.localStorage.setItem("Storage", JSON.stringify(this.state.jokes))
    );
  }

  componentDidMount() {
    if (!this.state.jokes.length) {
      this.createArr();
    }
    this.setState({
      isLoaded: true
    });
  }

  async createArr() {
    let arr = [];
    try {
      while (arr.length < 10) {
        const res = await axios.get("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json"
          }
        });

        const data = res.data;
        const jokeobj = { joke: data["joke"], total: 0 };
        if (!this.seen.has(data["joke"])) {
          arr.push(jokeobj);
        } else {
          console.log(data["joke"]);
        }
      }

      this.setState(
        prev => {
          return {
            jokes: [...arr, ...prev.jokes],
            isLoaded: true
          };
        },
        () => localStorage.setItem("Storage", JSON.stringify(this.state.jokes))
      );
    } catch (e) {}
  }

  clearStorage() {
    this.setState(
      {
        isLoaded: false
      },
      this.createArr
    );
  }

  render() {
    let sorted = this.state.jokes.sort((a, b) => b.total - a.total);
    return (
      <div className="container">
        <div className="left">
          <h1>
            Dad<span className="light">Jokes</span>
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="emoji"
          />
          <button className="btn" onClick={this.clearStorage}>
            New Jokes
          </button>
        </div>
        <div className="rigth">
          {this.state.isLoaded ? (
            sorted.map((n, idx) => {
              return (
                <Item
                  key={idx}
                  id={idx}
                  value={n.joke}
                  total={n.total}
                  upVote={this.upVote}
                  downVote={this.downVote}
                />
              );
            })
          ) : (
            <div className="loading-cont">
              <i className="far fa-8x fa-laugh fa-spin" />
              <h1 className="loading">Loading</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Jokes;
