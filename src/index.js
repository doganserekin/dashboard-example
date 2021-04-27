import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import Card from "./Card";
// import Data from "./data";
import "./styles.css";
import "sanitize.css";

import axios from 'axios'

class ListExample extends Component {
  state = {
    type: "grid",
    sort: "asc",
    filteredIds: [],
    stagger: "forward",
    spring: "noWobble",
    // masalar: [
    //   { id: 23, title: "Fatura Masa 01", info: "Kalan malzeme: 23"},
    //   { id: 12, title: "Fatura Masa 02", info: "Kalan malzeme: 12"},
    //   { id: 15, title: "Fatura Masa 03", info: "Kalan malzeme: 15"},
    //   { id: 5, title: "Fatura Masa 04", info: "Kalan malzeme: 5"},
    //   { id: 6, title: "Fatura Masa 05", info: "Kalan malzeme: 6"},
    // ],
  };

  constructor(props) {
    super(props);
    this.masalar = [
      {
        TPNUM: "210410803012",
        USERNAME: "ELIF AYDEMIR",
        INVOICE_STATION: "MEZ4Z020",
        COUNT: 20.0,
      },
      {
        TPNUM: "210410803031",
        USERNAME: "MIZGIN GÖNENLI",
        INVOICE_STATION: "MEZ4Z023",
        COUNT: 20.0,
      },
      {
        TPNUM: "210410802985",
        USERNAME: "BIRGÜL AYDıN",
        INVOICE_STATION: "MEZ4Z012",
        COUNT: 18.0,
      },
      {
        TPNUM: "210410802911",
        USERNAME: "EL ZARA POLAT",
        INVOICE_STATION: "MEZ4Z003",
        COUNT: 6.0,
      },
      {
        TPNUM: "210410803023",
        USERNAME: "EBRU ALKAN",
        INVOICE_STATION: "MEZ4Z015",
        COUNT: 4.0,
      },
      {
        TPNUM: "210410802879",
        USERNAME: "SEVDDA SÖGÜT",
        INVOICE_STATION: "MEZ4Z011",
        COUNT: 3.0,
      },
    ];
 }

  loop = () => {

      axios.get(`http://sap-pas-01.bizimdomain.dmz:8000/sap(bD10ciZjPTIwMA==)/bc/bsp/sap/zwm_bsp_021/request.html`)
      .then(res => {
        const data = res.data;
        this.masalar = data;
        this.addToFilteredIds();
      })

  }

  componentDidMount() {

    setInterval(() => this.loop(), 10000);

  }

  addToFilteredIds = id => {
    this.setState(prevState => {
      return {
        filteredIds: prevState.filteredIds.concat(id)
      };
    });
  };

  render() {
    return (
      <div className="fm-example" style={{backgroundColor: 'white'}}>
        <Flipper
          flipKey={`${this.state.type}-${this.state.sort}-${JSON.stringify(
            this.state.filteredIds
          )}-${JSON.stringify(this.state.stagger)}`}
          spring={this.state.spring}
          staggerConfig={{
            default: {
              reverse: this.state.stagger !== "forward",
              speed: 1
            }
          }}
          decisionData={this.state}
        >
          <div className="fm-flex-container" style={{justifyContent: 'center'}}>

          </div>

          <Flipped flipId="list">
            <div className={this.state.type === "grid" ? "fm-grid" : "fm-list"} style={{backgroundColor: 'white'}}>
              <Flipped inverseFlipId="list">
                <ul className="list-contents">
                  {[...this.masalar]
                    .filter(d => !this.state.filteredIds.includes(d.COUNT))
                    .sort((a, b) => {
                      if (this.state.sort === "asc") {
                        return a.COUNT - b.COUNT;
                      } else {
                        return b.COUNT - a.COUNT;
                      }
                    })
                    .map(({ USERNAME, INVOICE_STATION, COUNT }) => (
                      <Card
                        id={COUNT}
                        title={USERNAME}
                        info={INVOICE_STATION}
                        stagger={["forward", "reverse"].includes(
                          this.state.stagger
                        )}
                        type={this.state.type}
                        key={COUNT}
                        addToFilteredIds={this.addToFilteredIds}
                      />
                    ))}
                </ul>
              </Flipped>
            </div>
          </Flipped>

        </Flipper>
        {/* <button onClick={() => {
          this.masalar = [
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
          ];

        // this.setState({sort: 'asc'})

        this.addToFilteredIds();

        }}>Change data in background +1</button>
        <button onClick={() => {
          this.masalar = [
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
          ];

        // this.setState({sort: 'asc'})

        this.addToFilteredIds();

        }}>Change data in background +1</button>
        <button onClick={() => {
          this.masalar = [
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
            { COUNT: 999, USERNAME: "UNKNOWN", INVOICE_STATION: "UNKNOWN"},
          ];

        // this.setState({sort: 'asc'})

        this.addToFilteredIds();

        }}>Change data in background -2</button> */}
      </div>
    );
  }
}

ReactDOM.render(<ListExample />, document.getElementById("root"));
