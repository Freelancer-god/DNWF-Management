import React, { useState } from "react";
import { Scart, Schat, Sgroup, Shome, Slogo, Sstar } from "./Svg";

function Nav() {
  const [isList, setIsList] = useState(3);
  return (
    <nav>
      <Slogo clas="logo" />
      <div className="menu">
        <Shome
          onClick={() => setIsList(1)}
          clas={`icon_list ${isList === 1 && "active"}`}
        />
        <Sgroup
          onClick={() => setIsList(2)}
          clas={`icon_list ${isList === 2 && "active"}`}
        />
        <Schat
          onClick={() => setIsList(3)}
          clas={`icon_list ${isList === 3 && "active"}`}
        />
        <Scart
          onClick={() => setIsList(4)}
          clas={`icon_list ${isList === 4 && "active"}`}
        />
        <Sstar
          onClick={() => setIsList(5)}
          clas={`icon_list ${isList === 5 && "active"}`}
        />
      </div>
    </nav>
  );
}

export default Nav;
