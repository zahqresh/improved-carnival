import React,{useEffect,useState} from 'react'
import {connectWallet,walletState} from './script';
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "react-loader-spinner";
export default function Main() {
    const [data, setData] = useState([]);
    const [loading, set_loading] = useState(false);
    const [address, setAddress] = useState("");
  
    // useEffect(() => {
    //    connectWallet()
    // }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(walletState().address);
      if (window !== "undefined") {
        connectWallet().then(() => {
          set_loading(true)
          axios
            .get(
              `https://api.opensea.io/api/v1/assets?owner=${
                walletState().address
              }&order_direction=desc&offset=0&limit=50`
            )
            .then((res) => {
              console.log(res.data.assets);
              setData(res.data.assets);
              set_loading(false)
            });
        });
      }
    };
  
    if (loading) {
      return (
        <Loader
          className='text-center mt-5'
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      );
    }
  
    if (data.length === 0) {
      return (
        <div className="text-center">
          <button className="btn-primary btn btn-md mt-5" onClick={handleSubmit}>
            Connect Wallet
          </button>
        </div>
      );
    }
  
    if (data.length !== 0) {
      return (
        <div className='container'>
          <div className="m-auto w-50 mt-5">
            {/* <h1>Enter Eth Address Below</h1> */}
            {/* <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="form-control"
              />
              <button className="btn btn-md btn-success mt-2" type="submit">
                Retreive NFTS
              </button>
            </form> */}
            <div className="row">
              {data.map((i) => {
                return (
                  <div key={i.id} className="col">
                    <Card
                      key={i.id}
                      style={{
                        width: "18rem",
                        margin: "auto",
                        marginTop: "2rem",
                      }}
                    >
                      <Card.Img variant="top" src={i.image_original_url} />
                      <Card.Body>
                        <Card.Title>{i.name}</Card.Title>
                        <Card.Text>
                          <a href={i.permalink} className="btn btn-primary w-100">
                            View on OpenSea
                          </a>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
}
