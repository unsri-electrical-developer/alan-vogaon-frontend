import React, { useEffect, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Card } from "@material-ui/core";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RichTextEditor from "../../../../matx/components/RichTextEditor";
import {
  addGeneralInfo,
  getGeneralInfo,
} from "../../../redux/actions/Settings";

const GeneralInfo = () => {
  const dispatch = useDispatch();
  const { dataGeneralInfo } = useSelector((state) => state.generalInfo);
  console.log(dataGeneralInfo);

  const [state, setState] = useState({
    about: "",
    contact_whatsapp: "",
    contact_telegram: "",
    contact_email: "",
    contact_message: "",
    social_contact_instagram: "",
    social_contact_facebook: "",
    social_contact_tiktok: "",
  });

  const getData = () => {
    dispatch(getGeneralInfo());
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataGeneralInfo.hasOwnProperty("about")) {
      const { about, contact, social_contact } = dataGeneralInfo;

      const contactValue = (params) => {
        const value = contact.filter(
          (data) => data?.contact_code === params
        )[0];
        console.log(value);
        return value?.contact_url;
      };

      const socialContactValue = (params) => {
        const value = social_contact.filter(
          (data) => data?.social_contact_code === params
        )[0];
        console.log(value);
        return value?.social_contact_url;
      };

      setState((prev) => ({
        ...prev,
        about,
        contact_whatsapp: contactValue("whatsapp"),
        contact_telegram: contactValue("telegram"),
        contact_email: contactValue("email"),
        contact_message: contactValue("message"),
        social_contact_instagram: socialContactValue("instagram"),
        social_contact_facebook: socialContactValue("facebook"),
        social_contact_tiktok: socialContactValue("tiktok"),
      }));
    }
  }, [dataGeneralInfo]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeContent = (e) => {
    setState((prev) => ({
      ...prev,
      about: e,
    }));
  };

  const history = useHistory();

  const handleSubmit = () => {
    try {
      const obj = {
        about: state.about,
        contact: [
          {
            contact_code: "whatsapp",
            contact_url: state.contact_whatsapp,
          },
          {
            contact_code: "telegram",
            contact_url: state.contact_telegram,
          },
          {
            contact_code: "email",
            contact_url: state.contact_email,
          },
          {
            contact_code: "message",
            contact_url: state.contact_message,
          },
        ],
        social_contact: [
          {
            social_contact_code: "facebook",
            social_contact_url: state.social_contact_facebook,
          },
          {
            social_contact_code: "tiktok",
            social_contact_url: state.social_contact_tiktok,
          },
          {
            social_contact_code: "instagram",
            social_contact_url: state.social_contact_instagram,
          },
        ],
      };

      addGeneralInfo(obj).then((res) => {
        console.log(res);
        Swal.fire("Success!", "Data General Info berhasil disimpan", "success");
        getData();
      });
    } catch (e) {
      Swal.fire("Oopss!", "Data General Info gagal disimpan", "error");
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #e6e9ed",
      },
    },
    input: {
      transform: "scaleY(0.88)",
      marginBlock: "auto",
    },
  }));
  const classes = useStyles();
  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={3}
        className="my-8 mx-auto px-2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm>
          <h1 className="fw-600 text-25 text-black">General Information</h1>
        </Grid>
        <Grid item xs={12} sm className="d-flex mr-4 justify-end">
          <Button
            variant="contained"
            color="primary"
            className="px-15 py-3 text-white fw-500 border-radius-4"
            onClick={handleSubmit}
          >
            <span className="">Save</span>
          </Button>
        </Grid>
      </Grid>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">
                  Tentang Vogaon
                </h3>
                <RichTextEditor
                  content={
                    state.about.hasOwnProperty("body")
                      ? state.about.body
                      : state.about
                  }
                  placeholder=""
                  handleContentChange={handleChangeContent}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Contact</h3>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Whatsapp</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: "scaleY(1.25)",
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.contact_whatsapp}
                  name="contact_whatsapp"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Whatsapp"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Telegram</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: "scaleY(1.25)",
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.contact_telegram}
                  name="contact_telegram"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Telegram"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Email</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: "scaleY(1.25)",
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.contact_email}
                  name="contact_email"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Email"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Telepon</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: "scaleY(1.25)",
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.contact_message}
                  name="contact_message"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Telepon"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Social Media</h3>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Instagram</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: "scaleY(1.25)",
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.social_contact_instagram}
                  name="social_contact_instagram"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Instagram"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Facebook</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: "scaleY(1.25)",
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.social_contact_facebook}
                  name="social_contact_facebook"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="Facebook"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">TikTok</h3>
                <TextField
                  required={true}
                  size="small"
                  style={{
                    transform: "scaleY(1.25)",
                  }}
                  inputProps={{
                    className: classes.input,
                  }}
                  value={state.social_contact_tiktok}
                  name="social_contact_tiktok"
                  className={`${classes.outlined} border-radius-4 w-full`}
                  placeholder="TikTok"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeneralInfo;
