import React from 'react';
import {SyncLoader} from "react-spinners";

const override =  {
    display: "block",
    margin: "40vh 45vw",
  };

export default function Loading(){
    return (

        <div className="sweet-loading">
          <SyncLoader
            color={"#f5ba13"}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
          />
        </div>
      );
}

