import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
import { paymentColumns } from "./paymentColumns";
import { useTableSearch } from "./useTableSearch";

const { Search } = Input;

const fetchUsers = async () => {
  const data = await axios.get(
    "http://localhost:8080/payment"
  );

  console.log(data.data)
  return data.data;
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  return (
    <>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <br /> <br />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={paymentColumns}
        loading={loading}
        pagination={false}
      />
    </>
  );
}
