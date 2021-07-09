import React, { useState, useEffect } from "react";
import Filters from "../../components/Filters/Filters";
import axios from "axios";
import ReportTable from "../../components/ReportTable/ReportTable";
export default function OrderList() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const filterColumns = data[0] && Object.keys(data[0]);
  const [searchColumn, setSearchColumn] = useState(["userId", "id"]);


  
  //get data from api



  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, []);




  const handleChange = (e) => {
    setQuery(e.target.value);
  };



  
  const search = (rows) => {
    return rows.filter((row) => {
      console.log({ row });
      return searchColumn.some((column) => {
        return (
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      });
    });
  };

  return (
    <div>
      <Filters
        value={query}
        onChange={handleChange}
        filterColumns={filterColumns}
        searchColumn={searchColumn}
        setSearchColumn={setSearchColumn}
      />
      <ReportTable data={search(data)} />
    </div>
  );
}
