import React, { useEffect, useState, useCallback } from "react";
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import List from "./List";
import mainimage from "../assets/laptop-with-notebook-and-glasses-on-table.jpg";
//import icon from '../assets/tw.png'
import cryptoRandomString, { async } from "crypto-random-string";
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import Card from "react-bootstrap/cjs/Card";
import { Link, animateScroll as scroll } from "react-scroll";
import { io } from "socket.io-client";
import mps from "../assets/mps";
import Pagination from './Pagination';

const MainForm = ({
  dataUser,
  setDataUser,
  mp,
  setMp,
  setEmailData,
  emailData,
  clientId,
}) => {
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showFindForm, setShowFindForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(true);
  const [mainData, setMainData] = useState({});
  const [allDataIn,setAllDataIn]= useState([])
  
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    console.log(dataUser);
  };
  const { zipCode, emailUser } = dataUser;

  const click = async (e) => {
    e.preventDefault();
    // load spin
    setShowLoadSpin(true);
    //validation form -->
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (
      //firstName.trim() === '' || lastName.trim() === '' || //
      zipCode.trim() === "" ||
      emailUser.trim() === ""
    ) {
      setError(true);
      return;
    }

    setError(false);
    //---> ends validation form
    const randomId = cryptoRandomString({
      type: "distinguishable",
      length: 10,
    });
    dataUser.id = randomId;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://localhost:8080/all-representatives/?clientId=${clientId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMp(result.data);
        setShowLoadSpin(false);
        setShowList(false);
      })
      .catch((error) => console.log("error", error));
    scroll.scrollToBottom();
  };
  const fetchData = async () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    const data = await fetch(
      `https://payload-demo-tpm.herokuapp.com/main-content/?clientId=${clientId}`,
      requestOptions
    );
    const datos = await data.json();
    console.log(datos.data, "datos.data");
    setMainData(datos);
    console.log(mainData);
  };

  useEffect(() => {
    fetchData().catch((error) => console.error(error));

    console.log(mainData);
  }, []);
  console.log(dataUser);
  console.log(mp, "log de estado mp");
  console.log(mainData, "mainData fuera antes del return");
  if (!mainData) return "loading datos";
  if (!mp) return "loading datos";
  return (
    <div className={"container main-form-flex-container"}>
      <div>
        {/*<img style={{margin: '20px', maxHeight: '50px', maxWidth: '50px', height: '100%', width: '100px'}}*/}
        {/*     src={icon}/>*/}
      </div>
      <Card className="bg-dark card-img text-white main-image-container">
        <Card.Header
          className="card-img"
          style={{
            backgroundImage: `url(${
              mainData.data?.docs[0].backgroundImage?.sizes.card.url
                ? mainData.data?.docs[0].backgroundImage.sizes.card.url
                : mainimage
            })`,
            backgroundPosition: "center",
          }}
          alt={"header"}
        />
        <Card.ImgOverlay className={"card-img-overlay"}>
          <Card.Body>
            <Card.Text className={"text"}>
              {mainData.data?.docs[0].mainTitle}
            </Card.Text>
            <Card.Text className={"text2"}>
              {mainData.data?.docs[0].mainSubtitle}
            </Card.Text>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
      <div className={"container instructions"}>
        {mainData.data?.docs[0].instructions}
      </div>
      <div className={"form-container"}>
        <div hidden={showFindForm} className={"container container-content"}>
          {error ? (
            <Alert variant={"danger"}>
              Todos lo campos son necesarios, por favor introduzca los
              faltantes.
            </Alert>
          ) : null}
          <Link
            activeClass="active"
            to="section1"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          ></Link>
          <Form onSubmit={click} noValidate validated={validated}>
            <h3 className="find-her-mp-text">
              Contacte aquí a su representante local:
            </h3>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Introduzca su correo electrónico"
                name="emailUser"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Digite su código postal y presione ENTER"
                name="zipCode"
                onChange={handleChange}
                required
                maxLength="4"
              />
            </Form.Group>
            <Form.Group>
              <Button
                type={"submit"}
                variant={"dark"}
                size={"lg"}
                onClick={click}
                className={"u-full-width capitalize-style find-btn-main-form"}
              >
                {mainData.data?.docs[0]["Find Button"]
                  ? mainData.data?.docs[0]["Find Button"]
                  : "Find your representative"}
              </Button>
            </Form.Group>
            {showLoadSpin ? (
              <Loader
                visible={showLoadSpin}
                type="Puff"
                color="#000000"
                height={100}
                width={100}
                timeout={10000} //10 secs
              />
            ) : null}
          </Form>

          <div className={"container senators-container"} hidden={showList}>
            <div className="note-container">
              <p>
                NOTA: Escoja solamente a un representante a la vez. Si ustede
                desea contactar a otro representante, o enviar más emails al
                mismo, deberá seleccionar la opción de 'repetir' después de
                enviar el correo
              </p>
            </div>
            <h2>Representantes</h2>
            <div className="representatives-container">
              {mp.length > 0 ? (
               
                  <List
                   setShowEmailForm={setShowEmailForm}
                    setShowFindForm={setShowFindForm}
                    showFindForm={showFindForm}
                    emailData={emailData}
                    setEmailData={setEmailData}
                    dataUser={dataUser}
                    mp={mp}
                    clientId={clientId}
                   setAllDataIn={setAllDataIn}
                   allDataIn={allDataIn}
                  />
                
              ) : (
                <Alert variant="danger">
                  No se han encontrado representantes con el código postal que
                  nos ha proveído
                </Alert>
              )}

            </div>
          </div>
        </div>
      </div>
      <EmailForm
        setShowThankYou={setShowThankYou}
        setShowFindForm={setShowFindForm}
        setShowEmailForm={setShowEmailForm}
        showEmailForm={showEmailForm}
        dataUser={dataUser}
        emailData={emailData}
        setEmailData={setEmailData}
        setDataUser={setDataUser}
        allDataIn={allDataIn}
      />
      <ThankYou
        emailData={emailData}
        setDataUser={setDataUser}
        setEmailData={setEmailData}
        setShowFindForm={setShowFindForm}
        setShowThankYou={setShowThankYou}
        clientId={clientId}
        showThankYou={showThankYou}
      />
    </div>
  );
};
export default MainForm;
