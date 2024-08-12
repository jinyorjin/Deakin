import React, { useContext } from "react";
import Card from "./Card";
import "./Card.css";
import { StaffContext } from "./context/staff.context";

function CardList(props) {
  const { staff } = useContext(StaffContext);
  // const filteredStaff = staff.filter((staff)=>{
  //   return staff.name.toLowerCase().includes(props.searchStaff.toLowerCase())
  // })

  return (
    <div className="row">
      {Object.keys(staff).map((name) => (
        <Card
          key={staff[name].key}
          avatar={staff[name].avatar}
          name={staff[name].name}
          position={staff[name].position}
        />
      ))}
    </div>
  );
}

export default CardList;
