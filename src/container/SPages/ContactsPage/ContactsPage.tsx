import React from "react";
import classes from "./ContactsPage.module.scss";
import ListSvg from "../../../component/UI/ListSvg/ListSvg";
import ListSvgWithText from "../../../component/UI/ListSvgWithText/ListSvgWithText";
import { social, contacts } from "../../../data/contacts_data";

interface ContactsPageProps {}

const ContactsPage = ({}: ContactsPageProps) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Map}>
        <a href={"#"}> Санкт-Петербург, ул. Сабировская, 37</a>
      </div>

      <div className={classes.Contacts}>
        <ListSvgWithText title={"Наши контакты"} items={contacts} />
      </div>

      <div className={classes.Social}>
        <ListSvg
          title={"Мы в социальных сетях"}
          items={social}
          typeSvg={"SOCIAL"}
        />
      </div>
    </div>
  );
};

export default ContactsPage;
