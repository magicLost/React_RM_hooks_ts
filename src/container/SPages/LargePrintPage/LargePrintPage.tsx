import React from "react";
import classes from "./LargePrintPage.module.scss";
import Table from "../../../component/Table/Table";
import { tableMain, tableSecond } from "./../../../data/large_print_data";

interface LargePrintPageProps {}

const LargePrintPage = ({}: LargePrintPageProps) => {
  return (
    <div className={classes.LargePrintPage}>
      <Table table={tableMain} />
      <Table table={tableSecond} />
    </div>
  );
};

export default LargePrintPage;
